import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Charge from '../../features/cash/charge'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "캐시충전"}))
      }, [])


    return(
        <Charge />
    )
}

export default InternalPage