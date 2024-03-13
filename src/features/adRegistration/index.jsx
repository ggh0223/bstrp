import React from "react";
import { useEffect, useState } from 'react'
import InputText from "../../components/Input/InputText";
import {useLocation} from "react-router-dom";
import useSWR from "swr";
import SelectBox from "../../components/Input/SelectBox";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import InputFile from "../../components/Input/InputFile";

function create(prdType, updatePrdType, ad, updateFormValue, SubmitBtn, startDateValue, setStartDateValue, endDateValue, setEndDateValue, handleStartDatePickerValueChange, handleEndDatePickerValueChange) {
    return (<div>
        <div className="w-4/12">
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>상품유형</span>
                </label>
                <ul role="tablist" className="tabs tabs-boxed w-full">
                    <li role="tab" className={prdType === "NP_Traffic" ? "tab w-1/3 tab-active" : "tab w-1/3"}
                        onClick={() => window.location.href = "/app/ad-registration/NP_Traffic"}>NP 트래픽</li>
                    <li role="tab" className={prdType === "NP_Save" ? "tab w-1/3 tab-active" : "tab w-1/3"}
                        onClick={() => window.location.href = "/app/ad-registration/NP_Save"}>NP 저장하기</li>
                    <li role="tab" className={prdType === "NS_Traffic" ? "tab w-1/3 tab-active" : "tab w-1/3"}
                        onClick={() => window.location.href = "/app/ad-registration/NS_Traffic"}>NS 트래픽</li>
                </ul>
            </div>

            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="플레이스/상품명"
                       defaultValue={ad.company_nm} placeholder={""} updateType={'company_nm'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1 " + ((prdType !== "NS_Traffic") ? "diasble" : "")} labelStyle={"w-40"}
                       labelTitle="키워드" defaultValue={ad.keyword} placeholder={""} updateType={'keyword'} updateFormValue={updateFormValue}
                       disabled={(prdType === "NS_Traffic") ? "disabled" : ""}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 URL"
                       defaultValue={ad.ad_url} placeholder={""} updateType={'ad_url'} updateFormValue={updateFormValue}/>

            {/*{prdType === "NS_Traffic" &&*/}
            {/*    <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="사러가기 URL"*/}
            {/*               defaultValue={ad.gotobuy_url} placeholder={""} updateType={'gotobuy_url'} updateFormValue={updateFormValue}/>}*/}

            <InputText type={"text"} containerStyle={prdType !== "NS_Traffic" ? "flex flex-row pt-1" : "hidden"} labelStyle={"w-40"} labelTitle="PID 번호"
                       defaultValue={ad.pid} placeholder={""} updateType={'pid'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={prdType === "NS_Traffic" ? "flex flex-row pt-1" : "hidden"} labelStyle={"w-40"} labelTitle="MID 번호"
                       defaultValue={ad.mid} placeholder={""} updateType={'mid'} updateFormValue={updateFormValue}/>

            {/*<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 단가"*/}
            {/*           defaultValue={ad.ad_unit_price} placeholder={""} updateType={'ad_unit_price'} updateFormValue={updateFormValue}/>*/}
            {/*<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="매체 단가"*/}
            {/*           defaultValue={ad.platform_price} placeholder={""} updateType={'platform_price'} updateFormValue={updateFormValue}/>*/}

            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="1일 참여 제한"
                       defaultValue={ad.limit_per_day} placeholder={""} updateType={'limit_per_day'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="전체 참여 제한"
                       defaultValue={ad.limit_total} placeholder={""} updateType={'limit_total'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 기간" readonly={ true }
                       defaultValue={ad.ad_period_type} placeholder={ad.ad_period_type} updateType={'ad_period_type'} updateFormValue={updateFormValue}/>

            {/*<SelectBox labelTitle="광고 기간"*/}
            {/*           labelStyle={"w-40 mr-14"}*/}
            {/*           defaultValue={ ad.ad_period_type }*/}
            {/*           updateType="ad_period_type"*/}
            {/*           containerStyle={"w-full flex flex-row pt-1"}*/}
            {/*           updateFormValue={ updateFormValue }*/}
            {/*           options={ [ { name: '직접입력', value: '직접입력' },*/}
            {/*               { name: '10일', value: '10일' },*/}
            {/*               { name: '30일', value: '30일' },] }*/}
            {/*/>*/}
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>광고 시작일</span>
                </label>
                <Datepicker
                    containerClassName="w-full relative"
                    value={ startDateValue }
                    theme={ "light" }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "startDate" }
                    placeholder={startDateValue.startDate ?? "YYYY-MM-DD"}
                    // minDate={  }
                    onChange={ handleStartDatePickerValueChange }
                    showShortcuts={ false }
                    asSingle={ true }
                    useRange={ false }
                    locale="ko"
                    primaryColor={ "white" }
                />
            </div>
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>광고 종료일</span>
                </label>
                <Datepicker
                    containerClassName="w-full relative"
                    value={ endDateValue }
                    theme={ "light" }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "endDate" }
                    placeholder={endDateValue.startDate ?? "YYYY-MM-DD"}
                    disabled={ true }
                    onChange={ handleEndDatePickerValueChange }
                    showShortcuts={ false }
                    asSingle={ true }
                    useRange={ false }
                    locale="ko"
                    primaryColor={ "white" }

                />
            </div>
            {/*<InputFile type={"file"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="썸네일"*/}
            {/*           updateType={'thumbnail_url'} defaultValue={ad.thumbnail_url} updateFormValue={updateFormValue}/>*/}
        </div>
        <div className="pt-5 ml-72 justify-center">
            {prdType === "NS_Traffic"
                ? <>
                    <button className="btn btn-ghost w-36">
                        등록
                    </button>
                    <div className="ml-7 text-red-500">준비 중입니다.</div>
                </>
                : <button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>
                    등록
                </button>}
        </div>
    </div>)
}
function modify(prdType, updatePrdType, ad, updateFormValue, SubmitBtn, startDateValue, setStartDateValue,
                endDateValue, setEndDateValue, handleStartDatePickerValueChange, handleEndDatePickerValueChange) {
    console.log("mod", ad.company_nm)
    return (<div>
        <div className="w-4/12">
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>상품유형</span>
                </label>
                <ul role="tablist" className="tabs tabs-boxed w-full">
                    <li role="tab" onClick={() => updatePrdType("NP_Traffic")} className={prdType === "NP_Traffic" ? "tab w-1/3 tab-active" : "tab w-1/3"}>NP 트래픽</li>
                    <li role="tab" onClick={() => updatePrdType("NP_Save")} className={prdType === "NP_Save" ? "tab w-1/3 tab-active" : "tab w-1/3"}>NP 저장하기</li>
                    <li role="tab" onClick={() => updatePrdType("NS_Traffic")} className={prdType === "NS_Traffic" ? "tab w-1/3 tab-active" : "tab w-1/3"}>NS 트래픽</li>
                </ul>
            </div>

            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="플레이스/상품명"
                       defaultValue={ad.company_nm} placeholder={""} updateType={'company_nm'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1 " + ((prdType !== "NS_Traffic") ? "diasble" : "")} labelStyle={"w-40"}
                       labelTitle="키워드" defaultValue={ad.keyword} placeholder={""} updateType={'keyword'} updateFormValue={updateFormValue}
                       disabled={(prdType === "NS_Traffic") ? "disabled" : ""}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 URL"
                       defaultValue={ad.ad_url} placeholder={""} updateType={'ad_url'} updateFormValue={updateFormValue}/>

            {/*{prdType === "NS_Traffic" &&*/}
            {/*    <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="사러가기 URL"*/}
            {/*               defaultValue={ad.gotobuy_url} placeholder={""} updateType={'gotobuy_url'} updateFormValue={updateFormValue}/>}*/}

            <InputText type={"text"} containerStyle={prdType !== "NS_Traffic" ? "flex flex-row pt-1" : "hidden"} labelStyle={"w-40"} labelTitle="PID 번호"
                       defaultValue={ad.pid} placeholder={""} updateType={'pid'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={prdType === "NS_Traffic" ? "flex flex-row pt-1" : "hidden"} labelStyle={"w-40"} labelTitle="MID 번호"
                       defaultValue={ad.mid} placeholder={""} updateType={'mid'} updateFormValue={updateFormValue}/>

            {/*<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 단가"*/}
            {/*           defaultValue={ad.ad_unit_price} placeholder={""} updateType={'ad_unit_price'} updateFormValue={updateFormValue}/>*/}
            {/*<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="매체 단가"*/}
            {/*           defaultValue={ad.platform_price} placeholder={""} updateType={'platform_price'} updateFormValue={updateFormValue}/>*/}

            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="1일 참여 제한"
                       defaultValue={ad.limit_per_day} placeholder={""} updateType={'limit_per_day'} updateFormValue={updateFormValue}/>
            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="전체 참여 제한" // readonly={ true }
                       defaultValue={ad.limit_total} placeholder={""} updateType={'limit_total'} updateFormValue={updateFormValue}/>

            <InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="광고 기간" readonly={ true }
                       defaultValue={ad.ad_period_type} placeholder={ad.ad_period_type} updateType={'ad_period_type'} updateFormValue={updateFormValue}/>

            {/*<SelectBox labelTitle="광고 기간"*/}
            {/*           labelStyle={"w-40 mr-14"}*/}
            {/*           defaultValue={ ad.ad_period_type }*/}
            {/*           updateType="ad_period_type"*/}
            {/*           containerStyle={"w-full flex flex-row pt-1"}*/}
            {/*           updateFormValue={ updateFormValue }*/}
            {/*           options={ [ { name: '직접입력', value: '직접입력' },*/}
            {/*               { name: '10일', value: '10일' },*/}
            {/*               { name: '30일', value: '30일' },] }*/}
            {/*/>*/}
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>광고 시작일</span>
                </label>
                <Datepicker
                    containerClassName="w-full relative"
                    value={ startDateValue }
                    theme={ "light" }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "startDate" }
                    placeholder={startDateValue.startDate ?? "YYYY-MM-DD"}
                    // minDate={  }
                    onChange={ handleStartDatePickerValueChange }
                    showShortcuts={ false }
                    asSingle={ true }
                    useRange={ false }
                    locale="ko"
                    primaryColor={ "white" }
                />
            </div>
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>광고 종료일</span>
                </label>
                <Datepicker
                    containerClassName="w-full relative"
                    value={ endDateValue }
                    theme={ "light" }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "endDate" }
                    placeholder={endDateValue.startDate ?? "YYYY-MM-DD"}
                    disabled={ true }
                    onChange={ handleEndDatePickerValueChange }
                    showShortcuts={ false }
                    asSingle={ true }
                    useRange={ false }
                    locale="ko"
                    primaryColor={ "white" }
                />
            </div>
            {/*<InputFile type={"file"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="썸네일"*/}
            {/*           updateType={'thumbnail_url'} defaultValue={ad.thumbnail_url} updateFormValue={updateFormValue}/>*/}
        </div>
        <div className="pt-5 ml-72 justify-center">
            <button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>
                수정
            </button>
        </div>
    </div>)
}
function adRegistration() {
    const location = useLocation();
    const adId = location.pathname.split("/").pop();

    const { data, error, isLoading } = useSWR(`/ad/${adId}`);

    const [ad, setAd] = useState({
        billing_type: "CPA",
        prd_type: adId ?? "NP_Traffic",
        company_nm: "",
        keyword: "",
        ad_url: "",
        pid: "",
        mid: "",
        limit_per_day: "",
        limit_total: "",
        ad_period_type: "",
        strt_dt: "",
        end_dt: "",
    })
    const [limit, setLimit] = useState({
        limit_per_day: "",
        limit_total: ""
    });
    const [ startDateValue, setStartDateValue ] = useState({
        startDate: data?.strt_dt ?? "", endDate: ""
    });
    const [ endDateValue, setEndDateValue ] = useState({
        startDate: data?.end_dt ?? "", endDate: ""
    });
    const [prdType, setPrdType] = useState(data?.prd_type ?? !Number(adId) ? adId : "");

    useEffect(() => {
        if (!Number(adId)) {
            setPrdType(adId);
        }
    },[adId])

    useEffect(() => {
        console.log("data")
        if (data) {
            setAd(data)
            setPrdType(data.prd_type)
            setLimit({limit_per_day: data.limit_per_day, limit_total: data.limit_total})
            setStartDateValue({startDate: data.strt_dt, endDate: ""})
            setEndDateValue({startDate: data.end_dt, endDate: ""})
        } else {
            console.log("render", ad, data)
            setAd({
                prd_type: adId ??  "NP_Traffic",
                company_nm: "",
                keyword: "",
                ad_url: "",
                pid: "",
                mid: "",
                limit_per_day: "",
                limit_total: "",
                ad_period_type: "",
                strt_dt: "",
                end_dt: "",
            })
            setStartDateValue({startDate: "", endDate: ""})
            setEndDateValue({startDate: "", endDate: ""})
        }
    }, [data]);

    // 금액 변경 시 광고기간 자동 설정
    useEffect(() => {
        console.log("111")
        const total = typeof limit.limit_total === 'string' ? limit.limit_total.replaceAll(',', '') : limit.limit_total
        const period = Number(total) / Number(limit.limit_per_day)
        if (period >= 1 && period % 1 === 0) {
            console.log("기간 : ", period + "일")
            updateFormValue({updateType: "ad_period_type", value: period + "일"})
        }

    }, [ad.limit_total, ad.limit_per_day])
    useEffect(() => {
        console.log(ad.ad_period_type)
    }, [ad.ad_period_type])
    const handleStartDatePickerValueChange = (newValue) => {
        console.log(newValue, ad.ad_period_type)
        setStartDateValue(newValue);
        if (ad.ad_period_type !== "직접입력") {
            const endDay =  moment(newValue.startDate).add(ad.ad_period_type.replace("일", "") - 1, 'days').format("YYYY-MM-DD")
            handleEndDatePickerValueChange({
                startDate: endDay,
                endDate: endDay
            })
            setAd({
                ...ad,
                strt_dt: newValue.startDate + " 00:00",
                end_dt: endDay + " 23:59"
            })
        } else {
            setAd({
                ...ad,
                strt_dt: newValue.startDate + " 00:00"
            })
        }
    }
    const handleEndDatePickerValueChange = (newValue) => {
        setEndDateValue(newValue);
        if (ad.ad_period_type === "직접입력") {
            setAd({
                ...ad,
                end_dt: moment(newValue.startDate).format("YYYY-MM-DD") + " 23:59"
            })
        }
    }

    const updateFormValue = ({updateType, value}) => {
        console.log("update", updateType, value)
        if (updateType === "ad_period_type" && value !== "직접입력") {
            const strtDay = moment().format("YYYY-MM-DD")
            const endDay = moment().add(value.replace("일", "") - 1, 'days').format("YYYY-MM-DD")
            console.log(strtDay, endDay)
            setStartDateValue({startDate: strtDay, endDate: strtDay})
            setEndDateValue({startDate: endDay, endDate: endDay})
            setAd({
                ...ad,
                [updateType]: value,
                strt_dt: strtDay + " 00:00",
                end_dt: endDay + " 23:59"
            })
        } else if (updateType === "limit_total" || updateType === "limit_per_day") {
            setLimit({...limit, [updateType]: value})
            setAd({...ad, [updateType]: value})
        } else {
            setAd({...ad, [updateType]: value})
        }
    }
    const updatePrdType = (value) => {
        console.log("update")
        setPrdType(value)
        setAd({...ad, ["prd_type"]: value})
    };
    const SubmitBtn = async () => {
        console.log("submit")
        console.log(ad)
        try {
            if (!!Number(adId)) {
                console.log("수정")
                const res = await axios.put("/ad/" + adId, ad);
                alert(res.data.message)
                window.location.href = "/app/ad-pending"
                // window.location.reload();
            } else {
                console.log("저장")

                const res = await axios.post("/ad", ad);
                if (res && res.status >= 200 && res.status < 300) {
                    alert(res.data.message)
                    window.location.reload();
                }
            }
        } catch (e) {
            console.log(e)
            alert("서버 오류")
        }
    }

    if (isLoading) return <div>loading...</div>
    if (error || (!!Number(adId) && !data && !isLoading)) return <div>failed to load</div>

    return <>
        {adId && data
            ? modify(prdType, updatePrdType, ad, updateFormValue, SubmitBtn, startDateValue, setStartDateValue, endDateValue, setEndDateValue, handleStartDatePickerValueChange, handleEndDatePickerValueChange, limit)
            : create(prdType, updatePrdType, ad, updateFormValue, SubmitBtn, startDateValue, setStartDateValue, endDateValue, setEndDateValue, handleStartDatePickerValueChange, handleEndDatePickerValueChange)
        }
    </>;
}

export default adRegistration