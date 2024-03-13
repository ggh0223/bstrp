import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../features/common/headerSlice'
import Dashboard from "../../features/dashboard";
import Search from "../../features/common/components/Search";

function InternalPage() {
    const dispatch = useDispatch()
    const [query, setQuery] = React.useState('');
    useEffect(() => {
        dispatch(setPageTitle({title: "대시보드"}))
    }, [])


    return (
        <>
            <Search
                options={ [
                    { name: '전체', value: 'all' },
                    { name: '상품유형', value: 'prd_type' },
                    // { name: '상호명', value: 'company_nm' },
                    { name: '플레이스/상품명', value: 'ad_company_nm' },
                    // { name: 'PID', value: 'pid' },
                    // { name: 'MID', value: 'mid' },
                    // { name: '권한', value: 'auth' },
                    // { name: '입금자명', value: 'depositor_nm' },
                ] }
                setQuery={ setQuery }
            />
            <div className="divider"></div>
            <Dashboard query={query} />
        </>

    )
}

export default InternalPage
