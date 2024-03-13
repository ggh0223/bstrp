import Constant from "./constant";
import React, {useState} from "react";
import useSWR from "swr";
import axios from "axios";
import ApproveTable from "../../components/Table/ApproveTable";
import {openModal} from "../common/modalSlice";
import {useDispatch} from "react-redux";
import Search from "../common/components/Search";

function Pending({query, status}) {
	const dispatch = useDispatch()
	// const [ query, setQuery ] = useState("");
	const { data, error, isLoading, mutate } = useSWR(`/ad/aprv/list/v2?aprv_status=0&process_status=PENDING,PAUSED${query}`);

	const tableData = data?.map((item) => {
		const result = {
			...item,
			button: {
				copy: async () => {
					try {
						await axios.post("/ad/copy/" + item.id);
						mutate();
					} catch (e) {
						console.log(e)
					}
				},
				complete: async () => {
					if (!confirm("종료하시겠습니까?")) return ;
					const res = await axios.patch("/ad/" + item.id, {
						aprv_status: true,
						process_status: "COMPLETED",
					});
					console.log(res)
					mutate();
				},
				charge: () => {
					location.href = "/app/cash-charge";
				},
				modify: () => {
					location.href = "/app/ad-registration/" + item.id;
				},
				upload: () => {
					dispatch(openModal({
						title: "썸네일",
						bodyType: MODAL_BODY_TYPES.APPROVE_DATA,
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
						bodyType: MODAL_BODY_TYPES.APPROVE_DATA,
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
				},
				approve : async () => {
					// 승인상태 변경
					const check = checkValues(item);
					if (check.length > 0) {
						alert(check.join(", ") + " 상태 미충족");
						return ;
					}

					dispatch(openModal({
						title: "노출 매체를 선택해주세요.",
						bodyType: MODAL_BODY_TYPES.APPROVE,
						extraObject: {
							message: "광고 ID : " + item.id,
							type: "pending",
							data: item,
							option: {
								mutate: mutate,
							}
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

		return result
	}).filter((item) => {
		if (status === "전체") return true;
		return item.status === status;
	});

	const checkValues = (item) => {
		const col_name = {
			ad_url: "광고 URL",
			gotobuy_url: "사러가기 URL",
			ad_unit_price: "광고단가",
			platform_price: "매체단가",
			// 02.19 [수정] 캐시충전상태 관련 승인조건에서 제거
			// charge_status: "캐시충전",
			thumbnail_url: "썸네일",
		}
		const result = [];
		for (let key in col_name) {
			if (item[key]) {
				// 02.19 [수정] 캐시충전상태 관련 승인조건에서 제거
				// if (key === "charge_status" && item[key] !== "충전됨") {
				// 	result.push(col_name[key]);
				// }
			} else {
				if (!(key === "gotobuy_url" && item.prd_type !== "NS_Traffic")) {
					result.push(col_name[key]);
				}
			}
		}

		return result;
	}

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

export default Pending;