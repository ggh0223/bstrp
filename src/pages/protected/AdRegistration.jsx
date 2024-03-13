import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdRegistration from '../../features/adRegistration'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "광고등록"}))
      }, [])


    return(
        <AdRegistration />
    )
}

export default InternalPage