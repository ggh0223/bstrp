import useSWR from "swr";
import React, {useEffect, useState} from "react";
import Constant from "../constant";
import Table from "../../../components/Table";
import Search from "../../common/components/Search";
import {openModal} from "../../common/modalSlice";
import axios from "axios";
import {useDispatch} from "react-redux";
import SelectBox from "../../../components/Input/SelectBox";

function TableList({ query, status }) {
    const dispatch = useDispatch()

    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ]             = useState([]);
    const { data, error, isLoading, mutate } = useSWR(`/cash/useList?limit=10&page=${currentPage}${query}`);

    console.log(data)
    const tableData = data?.list.map((item) => {
        // TODO 소진내역 관련 데이터
        const result = {
            ...item,
            button : {
                detail: () => {
                    if (item.Cash) {
                        dispatch(openModal({
                            title: "",
                            bodyType: MODAL_BODY_TYPES.PAYMENT_INFO_DETAIL,
                            extraObject: {
                                data: {
                                    deposit_dt: item.Cash.deposit_dt,
                                    cancel_dt: item.Cash.cancel_dt,
                                    apply_dt: item.Cash.apply_dt,
                                    tax_invoice_dt: item.Cash.tax_invoice_dt,
                                },
                            }
                        }))
                    }
                },
            }
        }

        return result;
    });

    const makePages = (totalRows) => {
        let pageRows    = 10;
        let pages       = []
        const totalPage = Math.ceil(totalRows / pageRows);

        let start = Math.floor(currentPage / 10) * 10;
        let prev  = start - 10 > 0 ? start - 10 : 0;
        let end   = (Math.floor(currentPage / 10) + 1) * 10;
        let next  = end > totalPage ? totalPage : end + 1;
        if (end > totalPage) end = totalPage;

        const pageClass = "join-item btn btn-sm"

        for (let i = start; i < end; i++) {
            pages.push(<button key={ `page-${ i }` }
                               className={ `${ pageClass } ${ currentPage === i ? 'btn-active' : '' }` }
                               onClick={ () => setCurrentPage(i) }
            >{ i + 1 }</button>)
        }

        pages.unshift(<button key={ `prev-${ prev }` } className={ pageClass }
                              onClick={ () => setCurrentPage(prev) }>«</button>)
        pages.push(<button key={ `next-${ next }` } className={ pageClass }
                           onClick={ () => setCurrentPage(next - 1) }>»</button>)
        pages.unshift(<button key={ 0 } className={ pageClass } onClick={ () => setCurrentPage(0) }>첫 페이지</button>)
        pages.push(<button key={ totalPage } className={ pageClass }
                           onClick={ () => setCurrentPage(totalPage - 1) }>마지막 페이지</button>)

        setPages(pages)
    }
    useEffect(() => {
        if (!isLoading) {
            makePages(data.totalCount);
        }
    }, [ data ])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>error...</div>

    return (<>
        <Table
            title="충전내역"
            columns={Constant.CashListColumns}
            data={tableData}
        />
        <div style={ { display: "flex", justifyContent: "center" } }>
            <div className="join"
                 key={ "page-" + currentPage }
                 style={ { display: "flex", justifyContent: "space-around", padding: 10 } }>
                { pages }
            </div>
        </div>
    </>)
}
function UseCashList({extraObject, closeModal}){
    const [ query, setQuery ] = useState("");
    const options = [
        { name: '상태', value: '전체' },
        { name: '충전대기', value: '충전대기' },
        { name: '충전완료', value: '충전완료' },
        { name: '충전취소', value: '충전취소' },
        { name: '진행전', value: '진행전' },
        { name: '진행중', value: '진행중' },
        { name: '일시정지', value: '일시정지' },
        { name: '진행완료', value: '진행완료' },
    ];
    const [ status, setStatus ] = useState(options[0].value)
    const updateFormValue = ({updateType, value}) => {
        setStatus(value);
    }
    async function download() {
        try {
            const excelQuery = query.startsWith("?") ? `${query}&status=${status}` : `?status=${status}`
            const res = await axios.get(`/cash/excel/data${excelQuery}`,
                { responseType: 'blob' }
            );
            const url = window.URL.createObjectURL(
                new Blob([res.data],
                    { type: res.headers["content-type"] })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `캐시소진내역.xlsx`
            );
            document.body.appendChild(link);
            link.click();
        } catch (e) {
            console.log(e);
            alert("다운로드에 실패하였습니다.")
        }
    }

    return(
        <>
            <div className="flex justify-between">
                <SelectBox defaultValue={ options[0].name }
                           updateType="key"
                           containerStyle={"flex flex-row pt-1 w-48"}
                           updateFormValue={ updateFormValue }
                           options={ options }
                />
                <Search
                    options={ [
                        { name: '전체', value: 'all' },
                        { name: '아이디', value: 'account' },
                        { name: '상품유형', value: 'prd_type' },
                        { name: '상호명', value: 'company_nm' },
                        { name: '플레이스/상품명', value: 'ad_company_nm' },
                        { name: 'PID', value: 'pid' },
                        { name: 'MID', value: 'mid' },
                        // { name: '상태', value: 'status' },
                        // { name: '권한', value: 'auth' },
                        // { name: '입금자명', value: 'depositor_nm' },
                    ] }
                    setQuery={ setQuery }
                />
                <button className="btn btn-outline mx-1 mt-1" onClick={download}>엑셀다운로드</button>
            </div>
            <div className="divider"></div>
            <TableList query={ query } status={status}/>
        </>
    )
}

export default UseCashList