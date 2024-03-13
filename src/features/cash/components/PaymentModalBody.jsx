import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import {useSelector} from "react-redux";

function PaymentModalBody({extraObject, closeModal}) {
	const {message, type, data, status, index} = extraObject
	const {me} = useSelector(state => state.user)
	const confirmInfo = () => {
		closeModal()
		window.location.href = "/app/cash-charge"
	}

	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="입금금액" defaultValue={Number(data.total_deposit_amount).toLocaleString()} placeholder={""} disabled={true}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="입금자명" defaultValue={data.depositor_nm} placeholder={""} disabled={true}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="결제방법" defaultValue={"무통장입금"} placeholder={""} disabled={true}/>
			</div>
			{me.auth === "관리자" || me.auth === "0차총판"
				? <>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="예금주" defaultValue={"주식회사 셀렉티드"} placeholder={""} disabled={true}/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="계좌번호" defaultValue={"국민은행 762337-04-005752"} placeholder={""} disabled={true}/>
					</div>
				</>
				: <></>}
			<div className="modal-action mt-12">
				<button className="btn btn-primary w-36" onClick={confirmInfo}>확인</button>
			</div>
		</>
	)
}
export default PaymentModalBody
