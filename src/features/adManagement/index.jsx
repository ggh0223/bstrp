import Constant from "./constant";
import React from "react";
import { useEffect, useState } from 'react'
import useSWR from "swr";
import axios from "axios";
import ApproveTable from "../../components/Table/ApproveTable";
import {openModal} from "../common/modalSlice";
import {useDispatch} from "react-redux";

function waitForApprove() {
    const dispatch = useDispatch()
    const { data, error, isLoading, mutate } = useSWR(`/ad/aprv/list?aprv_status=0`);

    const tableData = data?.map((item) => {
        console.log(item.charge_status)
        const result = {
            ...item,
            button: {
                modify: () => {
                    location.href = "/app/ad-registration/" + item.id;
                },
                upload: () => {
                    dispatch(openModal({
                        title: "썸네일",
                        bodyType: MODAL_BODY_TYPES.APPROVE,
                        extraObject: {
                            type: "upload",
                            data: {
                                id: item.id,
                                key: "thumbnail_url",
                                thumbnail_url: item.thumbnail_url,
                            },
                            option: {
                                mutate: mutate,
                            }
                        }
                    }))
                },
                save: (key) => {
                    console.log(key)
                    let title = "";
                    switch (key) {
                        case "ad_unit_price": title = "광고단가"; break;
                        case "platform_price": title = "매체단가"; break;
                        case "gotobuy_url": title = "사러가기 URL"; break;
                    }
                    dispatch(openModal({
                        title: title,
                        bodyType: MODAL_BODY_TYPES.APPROVE,
                        extraObject: {
                            type: "save",
                            data: {
                                id: item.id,
                                key: key,
                                [key]: item[key],
                            },
                            option: {
                                mutate: mutate,
                            }
                        }
                    }))
                }
            },
        }

        if (item.charge_status === "충전완료") {
            result.button.approve = async () => {
                // 승인상태 변경
                const res = await axios.patch("/ad/" + item.id, {aprv_status: true});
                console.log(res)
                mutate();
            }
        }
        return result
    });

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>
    return (
        <div>
            <ApproveTable
                columns={Constant.TableColumns.wait}
                data={tableData}
            />
    </div>)
}

function completeApprove() {
    const { data, error, isLoading } = useSWR(`/ad/aprv/list?aprv_status=1`);

    const tableData = data?.map((item) => {
        return {
            ...item,
            button: {
                modify: async () => {
                    if (confirm("수정 시 '승인대기'로 상태가 변경됩니다. 수정하시겠습니까?")) {
                        const res = await axios.patch("/ad/" + item.id, {aprv_status: false});
                        if (res && res.status >= 200 && res.status < 300) {
                            location.href = "/app/ad-registration/" + item.id;
                        }
                    }
                },
                mission: () => {
                    // 미션 보기?
                }},
        }
    });

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>
    return (
        <div>
            <ApproveTable
                columns={Constant.TableColumns.complete}
                data={tableData}
            />
        </div>)
}

function AdManagement() {
    const [tab, setTab] = useState(0);

    return <>
        <ul role="tablist" className="tabs tabs-boxed">
            <li role="tab" onClick={() => setTab(0)} className={tab === 0 ? "tab w-60 tab-active" : "tab w-60"}>승인대기</li>
            <li role="tab" onClick={() => setTab(1)} className={tab === 1 ? "tab w-60 tab-active" : "tab w-60"}>승인완료</li>
        </ul>
        <div className="divider"></div>
        <div>
            {tab === 0 && waitForApprove()}
            {tab === 1 && completeApprove()}
        </div>

    </>;
}

export default AdManagement