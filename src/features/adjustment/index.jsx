import Table from "../../components/Table";
import Constant from "../adjustment/constant";
import React, {useEffect, useState} from "react";
import SelectBox  from "../../components/Input/SelectBox";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import {useDispatch} from "react-redux";
import {openModal} from "../common/modalSlice";
import Datepicker from "react-tailwindcss-datepicker";

function Adjustment({query}) {
    const dispatch = useDispatch()

    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ]             = useState([]);

    const { data, error, isLoading, mutate } = useSWR(`/cash/adjustment?limit=10&page=${currentPage}${query}`);

    function modal(title, size, type, data, index) {
        return () => {
            dispatch(openModal({
                title: title,
                bodyType: MODAL_BODY_TYPES.ADJUSTMENT,
                size: size,
                extraObject: {
                    type: type,
                    index: index,
                    option:{
                        mutate: mutate
                    },
                    data: data,
                }
            }))
        }
    }

    const tableData = data?.list.map((item) => {
        const result = {
            ...item,
            button: {
                deposit: modal("입금처리 하시겠습니까?", "","deposit", {
                    deposit_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    deposit_status: "충전완료",
                }, item.id),
                deposit_cancel: modal("취소 하시겠습니까?", "","deposit_cancel", {
                    deposit_dt: null,
                    deposit_status: "충전대기"
                }, item.id),
                invoice: modal("세금계산서 발행여부", "lg","invoice", {
                    tax_invoice_dt: ""
                }, item.id),
                invoice_cancel: modal("취소 하시겠습니까?", "","invoice_cancel", {
                    tax_invoice_dt: null
                }, item.id),
                cancel: modal("취소 하시겠습니까?", "","cancel", {
                    cancel_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    deposit_status: "취소"
                }, item.id),
                delete: async () => {
                    if (confirm("정말 삭제하시겠습니까?")) {
                        const res = await axios.delete("/cash/" + item.id);
                        alert(res.data.message)
                        location.href = "/app/adjustment"
                    }
                },
            },
        }
        if (item.deposit_dt) {
            result.button.deposit = null;
        } else {
            result.button.deposit_cancel = null;
        }
        if (item.tax_invoice_dt) {
            result.button.invoice = null;
        } else {
            result.button.invoice_cancel = null;
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
    if (error) return <div>failed to load</div>
    return (<div>
            <Table
                title="정산관리"
                columns={Constant.TableColumns}
                data={tableData}
            />
            <div style={ { display: "flex", justifyContent: "center" } }>
                <div className="join"
                     key={ "page-" + currentPage }
                     style={ { display: "flex", justifyContent: "space-around", padding: 10 } }>
                    { pages }
                </div>
            </div>
        </div>)
}

export default Adjustment