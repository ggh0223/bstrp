import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../features/common/headerSlice'
import AdStatistics from "../../features/adStatistics";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({title: "광고통계"}))
    }, [])


    return (
        <AdStatistics/>
    )
}

export default InternalPage