import React, { useState } from "react";
import axios from "axios";
import RadioInput from "../../../components/Input/RadioInput";
import useSWR from "swr";
import SelectBox from "../../../components/Input/SelectBox";
import Datepicker from "react-tailwindcss-datepicker";
import Table from "../../../components/Table";
import Constant from "../../adStatistics/constant";
import moment from "moment/moment";

function StatisticModalBody({extraObject, closeModal}) {
	const { id, strt_dt, end_dt } = extraObject
	const [ startDateValue, setStartDateValue ] = useState({
		startDate: moment().subtract(6, 'days').format("YYYY-MM-DD"), endDate: ""
	});
	const [ endDateValue, setEndDateValue ] = useState({
		startDate: moment().format("YYYY-MM-DD"), endDate: ""
	});
	const [ condition, setCondition ] = useState({
		type: "상세",
		prd_type: "전체",
		period: "직접입력",
		startDate: moment(strt_dt).format("YYYY-MM-DD"),
		endDate: moment(end_dt).format("YYYY-MM-DD"),
		company_nm: id,
		media: "전체",
		keyword: "전체"
	});
	const [ query, setQuery ] = useState(`?startDate=${condition.startDate}&endDate=${condition.endDate}&company_nm=${id}&type=상세`);
	const createQuery = (condition) => {
		let query = "?";
		if (condition.type !== "") {
			query += `type=${condition.type}&`
		}
		if (condition.prd_type !== "") {
			query += `prd_type=${condition.prd_type}&`
		}
		if (condition.startDate !== "") {
			query += `startDate=${condition.startDate}&`
		}
		if (condition.endDate !== "") {
			query += `endDate=${condition.endDate}&`
		}
		if (condition.company_nm !== "") {
			query += `company_nm=${condition.company_nm}&`
		}
		if (condition.media !== "") {
			query += `media=${condition.media}&`
		}
		if (condition.keyword !== "") {
			query += `keyword=${condition.keyword}&`
		}
		return query;
	}
	const updateFormValue = ({updateType, value}) => {
		console.log(updateType, value)
		if (updateType === "period" && value !== "직접입력") {
			let startDate = "";
			let endDate = "";
			switch (value) {
				case "7일":
					startDate = moment().subtract(6, 'days').format("YYYY-MM-DD");
					endDate = moment().format("YYYY-MM-DD")
					break;
				case "이번달":
					startDate = moment().startOf('month').format("YYYY-MM-DD");
					endDate = moment().endOf('month').format("YYYY-MM-DD")
					break;
				case "지난달":
					startDate = moment().subtract(1, 'months').startOf('month').
					format("YYYY-MM-DD");
					endDate = moment().subtract(1, 'months').endOf('month')
						.format("YYYY-MM-DD")
					break;
			}
			handleStartDatePickerValueChange({startDate: startDate, endDate: ""})
			handleEndDatePickerValueChange({startDate: endDate, endDate: ""})
			setCondition({...condition,
				[updateType]: value,
				startDate: startDate,
				endDate: endDate
			});
		} else if (updateType === "type" && value === "월별") {
			let startDate = moment(moment().year() + "-01-01" ).format("YYYY-MM-DD");
			let endDate = moment(moment().year() + "-12-31").format("YYYY-MM-DD")
			handleStartDatePickerValueChange({startDate: startDate, endDate: ""})
			handleEndDatePickerValueChange({startDate: endDate, endDate: ""})
			setCondition({...condition,
				[updateType]: value,
				period: "직접입력",
				startDate: startDate,
				endDate: endDate
			});
		} else {
			if (updateType === "type") {
				setCondition({...condition,
					[updateType]: value,
					company_nm: "전체",
					media: "전체",
					keyword: "전체"
				});
			} else {
				setCondition({...condition, [updateType]: value});
			}
		}
	}
	const handleStartDatePickerValueChange = (newValue) => {
		setCondition({...condition,
			startDate: moment(newValue.startDate).format("YYYY-MM-DD"),
		});
		setStartDateValue(newValue);
	}
	const handleEndDatePickerValueChange = (newValue) => {
		setCondition({...condition,
			endDate: moment(newValue.startDate).format("YYYY-MM-DD")
		});
		setEndDateValue(newValue);
	}
	function searchingData() {
		setQuery(createQuery(condition));
	}

	const { data, error, isLoading } = useSWR(`/ad/statistics${query}`);
	console.log(data)
	const tableData = data?.list

	async function download() {
		try {
			const res = await axios.get(`/ad/excel/data${query}`,
				{ responseType: 'blob' }
			);
			const url = window.URL.createObjectURL(
				new Blob([res.data],
					{ type: res.headers["content-type"] })
			);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				`통계.xlsx`
			);
			document.body.appendChild(link);
			link.click();
		} catch (e) {
			console.log(e);
			alert("다운로드에 실패하였습니다.")
		}
	}

	if (isLoading) return <div>loading...</div>
	if (error) return <div>failed to load</div>

	return (
		<>
			<div className="flex justify-start">
				<SelectBox labelTitle="상품유형"
				           labelStyle="w-40"
				           defaultValue={ condition.prd_type }
				           updateType="prd_type"
				           containerStyle={"flex flex-row pt-1"}
				           updateFormValue={ updateFormValue }
				           options={ [ { name: '전체', value: '전체' },
					           { name: 'NP_Traffic', value: 'NP_Traffic' },
					           { name: 'NP_Save', value: 'NP_Save' },
					           { name: 'NS_Traffic', value: 'NS_Traffic' },
				           ] }
				/>
				<SelectBox labelTitle="기간"
				           labelStyle="w-40"
				           defaultValue={ condition.period }
				           updateType="period"
				           containerStyle={"flex flex-row pt-1"}
				           updateFormValue={ updateFormValue }
				           options={ [ { name: '최근 7일', value: '7일' },
					           { name: '직접입력', value: '직접입력' },
					           { name: '이번달', value: '이번달' },
					           { name: '지난달', value: '지난달' },
				           ] }
				/>
				<div className={`form-control flex flex-row pt-1`}>
					<label className="label">
						<span className={"label-text text-base-content w-20"}></span>
					</label>
					<Datepicker
						containerClassName="w-full relative"
						theme={ "light" }
						value={ startDateValue }
						inputClassName="input input-bordered w-full"
						popoverDirection={ "down" }
						readOnly={ true }
						inputId={ "startDate" }
						placeholder={startDateValue.startDate ?? "YYYY-MM-DD"}
						onChange={ handleStartDatePickerValueChange }
						showShortcuts={ false }
						asSingle={ true }
						useRange={ false }
						locale="ko"
						primaryColor={ "white" }
					/>
					<Datepicker
						containerClassName="w-full relative"
						theme={ "light" }
						value={ endDateValue }
						inputClassName="input input-bordered w-full"
						popoverDirection={ "down" }
						readOnly={ true }
						inputId={ "endDate" }
						placeholder={endDateValue.startDate ?? "YYYY-MM-DD"}
						onChange={ handleEndDatePickerValueChange }
						showShortcuts={ false }
						asSingle={ true }
						useRange={ false }
						locale="ko"
						primaryColor={ "white" }
					/>
				</div>
				<button className="btn btn-outline mx-1 mt-1" onClick={searchingData}>검색</button>
				{condition.type === "상세" && Array.isArray(tableData)
					? <button className="btn btn-outline mx-1 mt-1" onClick={download}>엑셀다운로드</button>
					: <></>}
			</div>
			<div className="divider"></div>
			<Table
				columns={Constant.TableColumns.detail}
				data={tableData}
			/>
		</>
	)
}
export default StatisticModalBody;
