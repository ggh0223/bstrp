import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdPending from '../../features/adManagement/pending'
import Search from "../../features/common/components/Search";
import SelectBox from "../../components/Input/SelectBox";

function InternalPage(){
    const dispatch = useDispatch()
    const [ query, setQuery ] = useState("");
    useEffect(() => {
        dispatch(setPageTitle({ title : "승인대기"}))
      }, [])
    const options = [
        { name: '상태', value: '전체' },
        { name: '승인대기중', value: '승인대기중' },
        { name: '캐시부족', value: '캐시부족' },
        { name: '일시중지', value: '일시중지' },
    ];
    const [ status, setStatus ] = useState(options[0].value)
    const updateFormValue = ({updateType, value}) => {
        setStatus(value);
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
                        // { name: '상호명', value: 'company_nm' },
                        { name: '플레이스/상품명', value: 'ad_company_nm' },
                        { name: '키워드', value: 'keyword' },
                        { name: 'PID', value: 'pid' },
                        { name: 'MID', value: 'mid' },
                        // { name: '권한', value: 'auth' },
                        // { name: '입금자명', value: 'depositor_nm' },
                    ] }
                    setQuery={ setQuery }
                />
            </div>
            <div className="divider"></div>
            <AdPending query={query} status={status}/>
        </>
    )
}

export default InternalPage