import Table from "../../components/Table";
import Constant from "./constant";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import axios from "axios";
import {openModal} from "../common/modalSlice";
import {useLocation} from "react-router-dom";
import Search from "../common/components/Search";
const roles = ['관리자', '0차총판', '총판'];

function Account({query}) {
    const dispatch = useDispatch()
    const {me} = useSelector(state => state.user)

    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ]             = useState([]);
    const [ tab, setTab ]                 = useState("전체");
    const { data, error, isLoading, mutate } = useSWR(`/account/list?tab=${tab}&limit=10&page=${ currentPage }${query}`);

    const tableData = data?.list.map((item) => {
        const result = {
            ...item,
            button: {
                view: () => {
                    dispatch(openModal({
                        title: "사업자 등록증",
                        bodyType: MODAL_BODY_TYPES.IMAGE_VIEW,
                        extraObject: {
                            data: {
                                image_url: item.biz_reg,
                            },
                        }
                    }))
                },
                modify: () => {
                    console.log(item)
                    dispatch(openModal({
                        title: "계정수정",
                        bodyType: MODAL_BODY_TYPES.CREATE,
                        extraObject: {
                            type: "modify",
                            data: {
                                id: item.id,
                                account: item.account,
                                password: item.password,
                                chk_password: item.password,
                                company_nm: item.company_nm,
                                auth:item.auth,
                                owner: item.owner,
                                biz_reg: item.biz_reg,
                                store_key: item.store_key,
                                per_point: item.per_point,
                                save_per_point: item.save_per_point,
                                callback_url: item.callback_url,
                            },
                            option: [{ name: item.owner, value: item.owner }],
                        }
                    }))
                },
                delete: async () => {
                    console.log(item)
                    if (item.ad_cnt > 0) {
                        alert("등록된 광고가 있습니다.");
                    } else if (confirm("정말 삭제하시겠습니까?")) {
                        console.log("delete")
                        const res = await axios.delete("/account/" + item.id);
                        alert(res.data.message)
                        window.location.reload();
                    }
                }
            },
        }
        if (me?.account !== "admin") {
            delete result.button.delete
        }
        if (!item.biz_reg) {
            delete result.button.view
        }
        return result
    });

    const location = useLocation();
    useEffect(() => {
        if (location.state?.id) {
            const account = data?.list.filter((item) => item.id === location.state.id)[0]
            if (account) {
                dispatch(openModal({
                    title: "계정수정",
                    bodyType: MODAL_BODY_TYPES.CREATE,
                    extraObject: {
                        type: "modify",
                        data: {
                            id: account.id,
                            account: account.account,
                            password: account.password,
                            chk_password: account.password,
                            company_nm: account.company_nm,
                            auth:account.auth,
                            owner: account.owner,
                            biz_reg: account.biz_reg,
                        },
                        option: [{ name: account.owner, value: account.owner }],
                    }
                }))
                location.state = null;
            }
        }
    },[]);

    const registerAccount = () => {
        dispatch(openModal({
            title: "계정등록",
            bodyType: MODAL_BODY_TYPES.CREATE,
            extraObject: {
                type: "create",
                data: null,
                option: [{ name: me.account, value: me.account }],
            }
        }))
    }

    const makePages = (totalRows) => {
        let pageRows    = 10;
        let pages       = []
        const totalPage = Math.ceil(totalRows / pageRows);

        let start = Math.floor(currentPage / 10) * 10;
        let prev  = start - 10 > 0 ? start - 10 : 0;
        let end   = (Math.floor(currentPage / 10) + 1) * 10;
        let next  = end > totalPage ? totalPage : end + 1;
        if (end > totalPage) end = totalPage;

        const pageClass = "join-item btn btn-sm"

        for (let i = start; i < end; i++) {
            pages.push(<button key={ `page-${ i }` }
                               className={ `${ pageClass } ${ currentPage === i ? 'btn-active' : '' }` }
                               onClick={ () => setCurrentPage(i) }
            >{ i + 1 }</button>)
        }

        pages.unshift(<button key={ `prev-${ prev }` } className={ pageClass }
                              onClick={ () => setCurrentPage(prev) }>«</button>)
        pages.push(<button key={ `next-${ next }` } className={ pageClass }
                           onClick={ () => setCurrentPage(next - 1) }>»</button>)
        pages.unshift(<button key={ 0 } className={ pageClass } onClick={ () => setCurrentPage(0) }>첫 페이지</button>)
        pages.push(<button key={ totalPage } className={ pageClass }
                           onClick={ () => setCurrentPage(totalPage - 1) }>마지막 페이지</button>)

        setPages(pages)
    }
    useEffect(() => {
        if (!isLoading) {
            makePages(data.totalCount);
        }
    }, [ data ])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>
    return <>
        <div className="flex justify-end mb-4">
            <ul role="tablist" className="tabs tabs-boxed w-full ">
                <li role="tab" onClick={() => setTab("전체")} className={tab === "전체" ? "tab w-1/10 tab-active" : "tab w-1/10"}>전체</li>
                <li role="tab" onClick={() => setTab("0차총판")} className={tab === "0차총판" ? "tab w-1/10 tab-active" : "tab w-1/10"}>0차총판</li>
                <li role="tab" onClick={() => setTab("총판")} className={tab === "총판" ? "tab w-1/10 tab-active" : "tab w-1/10"}>총판</li>
                <li role="tab" onClick={() => setTab("대행사")} className={tab === "대행사" ? "tab w-1/10 tab-active" : "tab w-1/10"}>대행사</li>
                <li role="tab" onClick={() => setTab("매체사")} className={tab === "매체사" ? "tab w-1/10 tab-active" : "tab w-1/10"}>매체사</li>
            </ul>

            {roles.includes(me?.auth) && (
            <button
                className="btn btn-ghost btn-sm normal-case bg-base-100 text-base-content"
                onClick={registerAccount}>
                계정등록
            </button>)}
        </div>
        <Table
            title="계정관리"
            columns={Constant.TableColumns}
            data={tableData}
        />
        <div style={ { display: "flex", justifyContent: "center" } }>
            <div className="join"
                 key={ "page-" + currentPage }
                 style={ { display: "flex", justifyContent: "space-around", padding: 10 } }>
                { pages }
            </div>
        </div>
    </>;
}

export default Account