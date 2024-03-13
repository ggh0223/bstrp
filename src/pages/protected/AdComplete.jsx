import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdComplete from '../../features/adManagement/complete'
import Search from "../../features/common/components/Search";
import SelectBox from "../../components/Input/SelectBox";

function InternalPage(){
    const dispatch = useDispatch()
    const [ query, setQuery ] = useState("");
    useEffect(() => {
        dispatch(setPageTitle({ title : "광고관리"}))
      }, [])
    const options = [
        { name: '상태', value: '전체' },
        { name: '진행전', value: '진행전' },
        { name: '진행중', value: '진행중' },
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
            <AdComplete query={query} status={status}/>
        </>
    )
}

export default InternalPage