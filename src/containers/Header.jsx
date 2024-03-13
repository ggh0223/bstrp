import {themeChange} from 'theme-change'
import React, {useEffect, useState} from 'react'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import {openRightDrawer} from '../features/common/rightDrawerSlice';

import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";


function Header() {
    const {pageTitle} = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
    const {me} = useSelector(state => state.user);

    useEffect(() => {
        themeChange(false)
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setCurrentTheme("dark")
            } else {
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
    }, [])

    function logoutUser() {
        localStorage.clear();
        window.location.href = '/'
    }

    return (
        <>
            <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>


                <div className="order-last">

                    <div className="">{me?.company_nm}</div>
                    <div className="divider">|</div>
                    <div className="">{me?.account}</div>
                    {/* Profile icon, opening menu on click */}
                    <div className="divider">|</div>
                    <Link to={"/app/account"} state={{id: me?.id}}>
                        프로필
                    </Link>
                    <div className="divider">|</div>
                    <button onClick={logoutUser}>로그아웃</button>
                    <div className="divider">|</div>
                    {/* Light and dark theme selection toogle **/}
                    <label className="swap ">
                        <input type="checkbox"/>
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS"
                                 className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS"
                                  className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")}/>
                    </label>
                </div>
            </div>

        </>
    )
}

export default Header
