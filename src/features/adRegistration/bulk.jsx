import React, {useRef} from "react";
import { useEffect, useState } from 'react'
import axios from "axios";
import Constant from "./constant";
import Table from "../../components/Table";

function adBulkRegistration() {
    const [data, setData] = useState([])
    const fileInput = useRef();
    const fileExt = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/docxconverter",
        "application/haansoftxlsx",
        "application/kset",
        "application/vnd.ms-excel.12",
        "x-softmaker-pm"];
    async function updateFormValue(e) {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type && !fileExt.includes(file.type)) {
                alert("업로드 가능한 파일 형식이 아닙니다.");
                fileInput.current.value = "";
                return;
            }
            const form = new FormData();
            form.append("file", file);
            try {
                // const res = await axios.post("/ad/excel", form);
                const res = await axios.post("/ad/excel/preview", form);
                console.log("res", res);
                setData(res.data.map((item) => {
                    return {
                        ...item,
                        "pid/mid": item.pid ?? item.mid,
                        strt_dt: item.strt_dt ? item.strt_dt.split(" ")[0] : "",
                        end_dt: item.end_dt ? item.end_dt.split(" ")[0] : "",
                    }
                }))
            } catch (e) {
                console.log(e);
                alert(e.response.data.message)
                fileInput.current.value = "";
                setData([])
            }
        }
    }

    async function download() {
        try {
            const res = await axios.get("/ad/excel/template", {responseType: 'blob'});
            console.log("res", res);
            const url = window.URL.createObjectURL(
                new Blob([res.data],
                    { type: res.headers["content-type"] })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `광고등록템플릿.xlsx`
            );
            document.body.appendChild(link);
            link.click();
        } catch (e) {
            console.log(e);
            alert("다운로드에 실패하였습니다.")
        }
    }

    async function upload() {
        const file = fileInput.current.files?.[0];
        if (file) {
            if (file.type && !fileExt.includes(file.type)) {
                alert("업로드 가능한 파일 형식이 아닙니다.");
                fileInput.current.value = "";
                setData([])
                return;
            }
            const form = new FormData();
            form.append("file", file);
            try {
                const res = await axios.post("/ad/excel", form);
                console.log("res", res);
                setData(res.data.map((item) => {
                    return {
                        ...item,
                        "pid/mid": item.pid ?? item.mid,
                        strt_dt: item.strt_dt ? item.strt_dt.split(" ")[0] : "",
                        end_dt: item.end_dt ? item.end_dt.split(" ")[0] : "",
                    }
                }))
            } catch (e) {
                console.log(e);
                alert(e.response.data.message)
                fileInput.current.value = "";
                setData([])
            }
        }
    }

    function uploadCancel() {
        fileInput.current.value = "";
        setData([])
    }

    return <>
        <div className={`form-control w-full flex flex-row pt-1`}>
            <label className="label">
                <span className={"label-text text-base-content w-40"}>양식 다운로드</span>
            </label>
            <button className="btn btn-primary" onClick={download}>다운로드</button>
        </div>
        <div className={`form-control w-full flex flex-row pt-1`}>
            <label className="label">
                <span className={"label-text text-base-content w-40"}>파일 업로드</span>
            </label>
            <div>
                <div className="label">
                    <span className="label-text">형식 제한 : xlsx 파일만 업로드 가능합니다.</span>
                </div>
                <input type={"file"} onChange={(e) => updateFormValue(e)} ref={fileInput}
                       accept={fileExt.join(",")}
                       className={"file-input file-input-bordered w-full max-w-xs"}/>
            </div>
        </div>
        <div className="divider"></div>
        {data.length > 0 &&
            <Table
                title="등록 데이터"
                columns={Constant.TableColumns}
                data={data}
            />
        }
        <div>
            <div className="divider"></div>
            <div className="flex flex-row justify-center">
                <button className="btn btn-primary w-40" onClick={upload}>등록</button>
                <button className="btn btn-neutral w-40" onClick={uploadCancel}>취소</button>
            </div>
        </div>
    </>;
}

export default adBulkRegistration