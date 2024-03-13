import React from "react";
import { useEffect, useState } from 'react'
import InputText from "../../components/Input/InputText";
import {useLocation} from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import TextAreaInput from "../../components/Input/TextAreaInput";

function adFilter() {
    const { data, error, isLoading } = useSWR(`/filter`);
    const [filter, setFilter] = useState(data ?? {
        stay_time : 0,
        adInfoId : "",
        ip : "",
        account : "",
        rooting : false,
        simcard : false,
        sensor : false,
    });
    useEffect(() => {
        if (data) {
            setFilter(data)
        }
    }, [data])

    const updateFormValue = ({updateType, value}) => {
        setFilter({...filter, [updateType]: value})
    }
    const updateCheckboxValue = (e) => {
        setFilter({...filter, [e.target.name]: e.target.checked})
    }

    const SubmitBtn = async () => {
        console.log("submit")
        try {
            const res = await axios.post("/filter", filter);
            console.log(res)
        } catch (e) {
            console.log(e)
            alert("서버 오류")
        }
    }

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    return (<div>
        <div className="w-2/3">
            <InputText type={"number"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="체류시간"
                       defaultValue={data.stay_time} placeholder={""} updateType={'stay_time'} updateFormValue={updateFormValue}/>
            <TextAreaInput type={"text"} containerStyle={"flex flex-row pt-1 h-36"} labelStyle={"w-40"} labelTitle="ADID"
                       defaultValue={data.adInfoId} placeholder={""} updateType={'adInfoId'} updateFormValue={updateFormValue}/>
            <TextAreaInput type={"text"} containerStyle={"flex flex-row pt-1 h-36"} labelStyle={"w-40"} labelTitle="IP"
                       defaultValue={data.ip} placeholder={""} updateType={'ip'} updateFormValue={updateFormValue}/>
            <TextAreaInput type={"text"} containerStyle={"flex flex-row pt-1 h-36"} labelStyle={"w-40"} labelTitle="계정"
                       defaultValue={data.account} placeholder={""} updateType={'account'} updateFormValue={updateFormValue}/>
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>{"루팅"}</span>
                </label>
                <input type="checkbox" checked={data.rooting} name={"rooting"}
                       className="checkbox checkbox-primary"
                       onChange={(e) => updateCheckboxValue(e)}/>
            </div>
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>{"유심"}</span>
                </label>
                <input type="checkbox" checked={data.simcard} name={"simcard"}
                       className="checkbox checkbox-primary"
                       onChange={(e) => updateCheckboxValue(e)}/>
            </div>
            <div className={`form-control w-full flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-40"}>{"센서"}</span>
                </label>
                <input type="checkbox" checked={data.sensor} name={"sensor"}
                       className="checkbox checkbox-primary"
                       onChange={(e) => updateCheckboxValue(e)}/>
            </div>
        </div>
        <div className="pt-5 ml-72 justify-center">
            <button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>
                등록
            </button>
        </div>
    </div>)
}

export default adFilter