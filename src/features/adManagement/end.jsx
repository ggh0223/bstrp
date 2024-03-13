import Constant from "./constant";
import React, {useState} from "react";
import useSWR from "swr";
import axios from "axios";
import ApproveTable from "../../components/Table/ApproveTable";
import {useDispatch} from "react-redux";
import {openModal} from "../common/modalSlice";
import Search from "../common/components/Search";
function Complete({query}) {
	const dispatch = useDispatch();
	const { data, error, isLoading, mutate } = useSWR(`/ad/aprv/list/v2?aprv_status=1&process_status=COMPLETED,CANCELED${query}`);
	const tableData = data?.map((item) => {
		return {
			...item,
			button: {
				copy: async () => {
					try {
						await axios.post("/ad/copy/" + item.id);
					} catch (e) {
						console.log(e)
					}
				},
				delete: async () => {
					if (!confirm("삭제하시겠습니까?")) return ;
					await axios.delete("/ad/" + item.id);
					mutate();
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
			},
		}
	});

	if (isLoading) return <div>loading...</div>
	if (error) return <div>failed to load</div>
	return (
		<div>
			<ApproveTable
				columns={Constant.TableColumns.end}
				data={tableData}
			/>
		</div>)
}

export default Complete;