import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import History from '../../features/cash/history'
import Search from "../../features/common/components/Search";
import SelectBox from "../../components/Input/SelectBox";
import axios from "axios";

function InternalPage(){
    const dispatch = useDispatch()
    const [query, setQuery] = React.useState('');
    useEffect(() => {
        dispatch(setPageTitle({ title : "캐시소진내역"}))
      }, [])
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
            <History query={query} status={status}/>
        </>

    )
}

export default InternalPage