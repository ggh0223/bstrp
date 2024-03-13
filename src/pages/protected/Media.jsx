import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../features/common/headerSlice'
import Media from "../../features/media";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({title: "Media"}))
    }, [])


    return (
        <Media/>
    )
}

export default InternalPage