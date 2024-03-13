import React, {useEffect} from "react";
import { useState } from 'react'
import InputText from "../../components/Input/InputText";
import {openModal} from "../common/modalSlice";
import {useDispatch} from "react-redux";
import axios from "axios";
import Table from "../../components/Table";
import Constant from "./constant";
import useSWR from "swr";

function chargeCash(cash, setCash) {
    const dispatch = useDispatch()


    const updateFormValue = ({updateType, value}) => {
        console.log("update")
        if (updateType === "amount") {
            const vat = value * 0.1
            const total_deposit_amount = Number(value) + vat
            setCash({...cash,
                [updateType]: value,
                ["vat"]: vat,
                ["total_deposit_amount"]: total_deposit_amount
            })
        } else {
            setCash({...cash, [updateType]: value})
        }
    }

    const SubmitBtn = async () => {
        if (cash.amount === "") {
            alert("충전캐시를 입력해주세요.")
            return
        }
        if (cash.depositor_nm === "") {
            alert("입금자명을 입력해주세요.")
            return
        }
        if (confirm("입력하신 입금자명과 실제입금자명이 다를 경우 충전이 지연될 수 있습니다. 계속 진행하시겠습니까?")) {
            const res = await axios.post("/cash", cash);
            console.log(res)
            if (res.status === 200) {
                dispatch(openModal({
                    title: "결제정보",
                    bodyType: MODAL_BODY_TYPES.PAYMENT_INFO,
                    extraObject: {
                        data: cash,
                    }
                }))
            } else {
                alert("서버 오류")
            }
        }
    }


    return (
        <div className="" >
            <div className="w-4/12">
                <div className="flex justify-center">
                    <div className="border-2 border-solid rounded w-fit py-2 px-16">
                        <span className="">결제정보</span>
                    </div>
                </div>

                <div className="py-2"></div>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="충전캐시"
                           defaultValue={cash.amount} placeholder={cash.amount} updateType={'amount'} updateFormValue={updateFormValue}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="VAT" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={cash.vat} placeholder={""}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="총 결제금액" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={cash.total_deposit_amount} placeholder={""}/>
                <div className="py-2"></div>
                <div className="flex justify-center">
                    <div className="border-2 border-solid rounded w-fit py-2 px-16">
                        <span>결제정보</span>
                    </div>
                </div>

                <div className="py-2"></div>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="입금금액" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={cash.total_deposit_amount} placeholder={""}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="입금자명"
                           defaultValue={cash.depositor_nm} placeholder={cash.depositor_nm} updateType={'depositor_nm'} updateFormValue={updateFormValue}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="결제방법" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={"무통장입금"} placeholder={""}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="예금주" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={"주식회사 셀렉티드"} placeholder={""}/>
                <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="계좌번호" readonly={true}
                           inputStyle={"bg-neutral-200"} defaultValue={"국민은행 762337-04-005752"} placeholder={""}/>

                <div className="flex justify-center">
                    <div className="w-fit py-5 px-16">
                        <button className="btn btn-primary w-36" onClick={SubmitBtn}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>)
    ;
}

function cashList(data, error, isLoading, pagination) {
    const dispatch = useDispatch()
    const { pages, currentPage } = pagination

    const tableData = data?.list.map((item) => {
        return {
            ...item,
            button: {
                detail: () => {
                    dispatch(openModal({
                        title: "",
                        bodyType: MODAL_BODY_TYPES.PAYMENT_INFO_DETAIL,
                        extraObject: {
                            data: {
                                deposit_dt: item.deposit_dt,
                                cancel_dt: item.cancel_dt,
                                apply_dt: item.apply_dt,
                                tax_invoice_dt: item.tax_invoice_dt,
                            },
                        }
                    }))
                }},
        }
    });

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    return (
        <div>
            <Table
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
        </div>);
}
function Cash() {
    const [tab, setTab] = useState(0);
    const [cash, setCash] = useState({
        amount: "",
        vat: "",
        total_deposit_amount: "",
        depositor_nm: "",
        // payment_method: "",
    });
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ]             = useState([]);

    const { data, error, isLoading } = useSWR(`/cash/list?page=${currentPage}`);

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

    return <>
        <ul role="tablist" className="tabs tabs-boxed">
            <li role="tab" onClick={() => setTab(0)} className={tab === 0 ? "tab w-60 tab-active" : "tab w-60"}>충전하기</li>
            <li role="tab" onClick={() => setTab(1)} className={tab === 1 ? "tab w-60 tab-active" : "tab w-60"}>충전내역</li>
        </ul>
        <div className="divider"></div>
        <div>
            {tab === 0 && chargeCash(cash, setCash)}
            {tab === 1 && cashList(data, error, isLoading, { pages, currentPage})}
        </div>
    </>;
}

export default Cash