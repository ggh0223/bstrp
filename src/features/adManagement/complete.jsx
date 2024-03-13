import Constant from "./constant";
import React, {useState} from "react";
import useSWR from "swr";
import axios from "axios";
import ApproveTable from "../../components/Table/ApproveTable";
import {useDispatch} from "react-redux";
import {openModal} from "../common/modalSlice";
import Search from "../common/components/Search";
function Complete({query, status}) {
	const dispatch = useDispatch();
	const { data, error, isLoading } = useSWR(`/ad/aprv/list/v2?aprv_status=1&process_status=IN_PROGRESS${query}`);
	console.log(data)
	const tableData = data?.map((item) => {
		return {
			...item,
			button: {
				modify: async () => {
					if (confirm("'승인대기'로 상태가 변경됩니다. 일시중지 하시겠습니까?")) {
						const res = await axios.patch("/ad/" + item.id, {
							aprv_status: false,
							process_status: "PAUSED",
						});
						if (res && res.status >= 200 && res.status < 300) {
							location.href = "/app/ad-pending";
						}
					}
				},
				media: () => {
					dispatch(openModal({
						title: "현재 노출 매체",
						bodyType: MODAL_BODY_TYPES.APPROVE,
						extraObject: {
							type: "complete",
							data: item
						}
					}))
				},
				copy: async () => {
					try {
						await axios.post("/ad/copy/" + item.id);
					} catch (e) {
						console.log(e)
					}
				},
				view: () => {
					dispatch(openModal({
						title: "썸네일",
						type: "view",
						bodyType: MODAL_BODY_TYPES.IMAGE_VIEW,
						extraObject: {
							data: {
								image_url: item.thumbnail_url,
							},
						}
					}))
				},
				statistic: () => {
					dispatch(openModal({
						title: "통계",
						bodyType: MODAL_BODY_TYPES.STATISTIC,
						size: "max-w-7xl h-[80rem]",
						extraObject: {
							id: item.id,
							strt_dt: item.strt_dt,
							end_dt: item.end_dt,
						}
					}))
				}
			},

		}
	}).filter((item) => {
		if (status === "전체") return true;
		return item.status === status;
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

export default Complete;