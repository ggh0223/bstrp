import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdBulkRegistration from '../../features/adRegistration/bulk'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "일괄등록"}))
      }, [])


    return(
        <AdBulkRegistration />
    )
}

export default InternalPage