import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment/moment";

function AdjustmentModalBody({extraObject, closeModal}) {
	const {message, type, data, status, index, option} = extraObject
	console.log(data)
	const [dataValue, setDataValue] = useState(data ?? {
		deposit_dt: "",
		deposit_status: "",
		tax_invoice_dt: "",
		cancel_dt: ""
	});
	console.log(dataValue)
	const [ dateValue, setDateValue ] = useState({
		startDate: data?.startDate ?? "", endDate: ""
	});
	const handleDatePickerValueChange = (newValue) => {
		setDateValue(newValue);
		setDataValue({tax_invoice_dt: newValue.startDate});
	}

	const SubmitBtn = async () => {
		console.log("submit")
		console.log(dataValue)
		if (type === "invoice") {
			const reg = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
			const date = reg.test(dataValue.tax_invoice_dt);
			console.log(date)
			if (!date) {
				alert("유효한 발급일자를 입력해주세요.")
				return;
			}
		}

		await axios.patch("/cash/" + index, dataValue);
		option.mutate();
		closeModal();
	}

	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>

			{type === "invoice" && (
				<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					{/*<InputText type={"text"} labelTitle="발급일자" defaultValue={dataValue.tax_invoice_dt} placeholder={"YYYY-MM-DD"}*/}
					{/*           value={dataValue.tax_invoice_dt} updateType={'tax_invoice_dt'} updateFormValue={updateFormValue}*/}
					{/*/>*/}
					<label className="label">
						<span className={"label-text text-base-content w-40"}>발급일자</span>
					</label>
					<Datepicker
						containerClassName="w-full relative"
						value={ dateValue }
						theme={ "light" }
						inputClassName="input input-bordered w-full"
						popoverDirection={ "down" }
						readOnly={ true }
						inputId={ "tax_invoice_dt" }
						placeholder={dateValue.startDate ?? "YYYY-MM-DD"}
						// minDate={  }
						onChange={ handleDatePickerValueChange }
						showShortcuts={ false }
						asSingle={ true }
						useRange={ false }
						locale="ko"
						primaryColor={ "white" }
					/>
				</div>)
			}
			<div className="modal-action mt-12">
				<button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>확인</button>
				<button className="btn btn-outline   " onClick={() => closeModal()}>취소</button>
			</div>
		</>
	)
}
export default AdjustmentModalBody
