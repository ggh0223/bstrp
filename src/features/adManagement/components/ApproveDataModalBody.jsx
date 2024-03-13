import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment/moment";
import InputFile from "../../../components/Input/InputFile";

function ApproveDataModalBody({extraObject, closeModal}) {
	const {message, type, data, status, index, option} = extraObject

	const [dataValue, setDataValue] = useState(data);
	const updateFormValue = ({updateType, value}) => {
		setDataValue({...dataValue, [updateType]: value});
	}
	console.log(dataValue)
	const SubmitBtn = async () => {
		console.log("submit")
		if ((dataValue.key === "ad_unit_price" || dataValue.key === "platform_price")
			&& !Number(dataValue[dataValue.key])
		) {
			return alert("숫자만 입력 가능합니다.");
		}
		await axios.patch("/ad/" + dataValue.id, {
			[dataValue.key]: dataValue[dataValue.key],
		});
		option.mutate();
		closeModal();
	}

	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>

			{type === "save"
				? (<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					<InputText type={"text"} defaultValue={dataValue[dataValue.key]} placeholder={""}
					           value={dataValue[dataValue.key]} updateType={dataValue.key} updateFormValue={updateFormValue}
					/>
				</div>)
				: (<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					<InputFile type={"image"} containerStyle={"flex flex-row pt-1"}
					           accept={"image/jpg,image/png,image/jpeg"} description={"JPG,JPEG,PNG"}
					           updateType={'thumbnail_url'} defaultValue={dataValue.thumbnail_url} updateFormValue={updateFormValue}/>
					</div>)
			}
			<div className="modal-action mt-12">
				<button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>확인</button>
				<button className="btn btn-outline   " onClick={() => closeModal()}>취소</button>
			</div>
		</>
	)
}
export default ApproveDataModalBody
