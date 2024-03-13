import PageContent from "./PageContent"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from './RightSidebar'
import {useEffect} from "react"
import {removeNotificationMessage} from "../features/common/headerSlice"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ModalLayout from "./ModalLayout"
import {useDispatch, useSelector} from "react-redux";
import useSWR from "swr";
import {setUser} from "../features/common/userSlice";


function Layout() {
    const dispatch = useDispatch()
    const {newNotificationMessage, newNotificationStatus} = useSelector(state => state.header)
    const {data, error, isLoading, mutate} = useSWR('/account/me')

    if (error) {
        localStorage.removeItem("token");
        location.href = "/login";
    }
    useEffect(() => {
        if (newNotificationMessage !== "") {
            if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success')
            if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error')
            dispatch(removeNotificationMessage())
        }
    }, [newNotificationMessage]);
    useEffect(() => {
        dispatch(setUser(data))
    }, [data]);
    return (
        <>
            { /* Left drawer - containing page content and side bar (always open) */}
            {/*{isLoading && <div className="loader"/>}*/}
            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle"/>
                <LeftSidebar/>
                <PageContent/>

            </div>

            { /* Right drawer - containing secondary content like notifications list etc.. */}
            {/*<RightSidebar/>*/}


            {/** Notification layout container */}
            <NotificationContainer/>

            {/* Modal layout container */}
            <ModalLayout/>
        </>
    )
}

export default Layout