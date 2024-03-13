import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdManagement from '../../features/adManagement'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "승인관리"}))
      }, [])


    return(
        <AdManagement />
    )
}

export default InternalPage