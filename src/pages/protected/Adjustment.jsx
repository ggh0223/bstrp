import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../features/common/headerSlice'
import Adjustment from "../../features/adjustment";
import Search from "../../features/common/components/Search";

function InternalPage() {
    const dispatch = useDispatch()
    const [query, setQuery] = React.useState('');
    useEffect(() => {
        dispatch(setPageTitle({title: "정산관리"}))
    }, [])


    return (
        <>
            <Search
                options={ [
                    { name: '전체', value: 'all' },
                    { name: '소유자', value: 'owner' },
                    { name: '아이디', value: 'account' },
                    // { name: '상품유형', value: 'prd_type' },
                    { name: '상호명', value: 'company_nm' },
                    // { name: '플레이스/상품명', value: 'ad_company_nm' },
                    // { name: 'PID', value: 'pid' },
                    // { name: 'MID', value: 'mid' },
                    // { name: '권한', value: 'auth' },
                    { name: '입금자명', value: 'depositor_nm' },
                ] }
                setQuery={ setQuery }
            />
            <div className="divider"></div>
            <Adjustment query={query}/>
        </>
    )
}

export default InternalPage
