import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AdFilter from '../../features/adFilter'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "광고필터"}))
      }, [])


    return(
        <AdFilter />
    )
}

export default InternalPage