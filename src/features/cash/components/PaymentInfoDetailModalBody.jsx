import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";

function PaymentInfoDetailModalBody({extraObject, closeModal}) {
	const {message, type, data, status, index} = extraObject

	const confirmInfo = () => {
		closeModal();
		// window.location.href = "/app/cash-charge"
	}

	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="세금계산서 발행" defaultValue={data.tax_invoice_dt} placeholder={""} disabled={true}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="입금완료" defaultValue={data.deposit_dt} placeholder={""} disabled={true}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="취소" defaultValue={data.cancel_dt} placeholder={""} disabled={true}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="접수" defaultValue={data.apply_dt} placeholder={""} disabled={true}/>
			</div>
			<div className="modal-action mt-12">
				<button className="btn btn-primary w-36" onClick={confirmInfo}>확인</button>
			</div>
		</>
	)
}
export default PaymentInfoDetailModalBody
