import routes from '../routes/sidebar'
import {Link, NavLink, useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../features/common/modalSlice";

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch()
    const {me} = useSelector(state => state.user)
    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click();
    }
    const openUseCashList = () => {
        console.log("openUseCashList")
        if (me) {
            window.location.href = "/app/charge-history"
            // dispatch(openModal({
            //     title: "캐시 소진내역",
            //     bodyType: MODAL_BODY_TYPES.CASH_LIST,
            //     size: "max-w-7xl h-[80rem]",
            //     extraObject: {
            //         data: {
            //             account: me?.account,
            //         },
            //     }
            // }))
        }
    }

    return (
        <div className="drawer-side z-20">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-50 bg-base-100 text-base-content web"
                style={{height: '-webkit-fill-available'}}
            >
                <button
                    className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
                    onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5"/>
                </button>

                <li className="mb-2 font-semibold text-xl">

                    <Link to={'/app/ad-complete'}>
                        {/*<img className="mask mask-squircle w-10" src="/logo.png" alt="INNERVIEW Logo"/>*/}
                        BOOSTREP
                    </Link>
                </li>
                {
                    me?.owner === "admin" && me?.auth !== "매체사"
                        ? <li className="mb-2 font-semibold outline-black" onClick={openUseCashList}>
                            <div className="outline outline-1 hover:bg-primary hover:text-white">
                                <a className="block">보유캐시 : {Number(me?.cash).toLocaleString()}</a>
                            </div>
                        </li>
                        : null
                }

                {
                    routes.map((route, k) => {
                        let result;
                        if (route.auth.includes(me?.auth)) {
                            result = (
                                <li className="" key={k}>
                                    {
                                        route.submenu ?
                                            <SidebarSubmenu {...route}/> :
                                            (<NavLink
                                                end
                                                to={route.path}
                                                className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`}
                                                onClick={() => close()}
                                            >
                                                {route.icon} {route.name}
                                                {
                                                    location.pathname === route.path ? (<span
                                                        className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                        aria-hidden="true"></span>) : null
                                                }
                                            </NavLink>)
                                    }

                                </li>
                            )
                        }
                        if (route.owner.length > 0 && !route.owner.includes(me?.owner)) {
                            result = null
                        }
                        return result
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar