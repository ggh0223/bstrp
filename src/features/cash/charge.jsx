import React, {useState} from "react";
import InputText from "../../components/Input/InputText";
import {openModal} from "../common/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
function Charge() {
	const dispatch = useDispatch()
	const {me} = useSelector(state => state.user)
	const [cash, setCash] = useState({
		amount: "",
		vat: "",
		total_deposit_amount: "",
		depositor_nm: "",
		// payment_method: "",
	});

	const updateFormValue = ({updateType, value}) => {
		console.log("update")
		if (updateType === "amount") {
			console.log(value, typeof value)
			const vat = value * 0.1
			const total_deposit_amount = Number(value) + vat
			setCash({...cash,
				[updateType]: value,
				["vat"]: vat,
				["total_deposit_amount"]: total_deposit_amount})
		} else {
			setCash({...cash, [updateType]: value})
		}
	}

	const SubmitBtn = async () => {
		if (cash.amount === "") {
			alert("충전캐시를 입력해주세요.")
			return
		}
		if (cash.depositor_nm === "") {
			alert("입금자명을 입력해주세요.")
			return
		}
		if (confirm("입력하신 입금자명과 실제입금자명이 다를 경우 충전이 지연될 수 있습니다. 계속 진행하시겠습니까?")) {
			const res = await axios.post("/cash", cash);
			console.log(res)
			if (res.status === 200) {
				dispatch(openModal({
					title: "결제정보",
					bodyType: MODAL_BODY_TYPES.PAYMENT_INFO,
					extraObject: {
						data: cash,
					}
				}))
			} else {
				alert("서버 오류")
			}
		}
	}


	return <>
		<div className="" >
			<div className="w-4/12">
				<div className="flex justify-center">
					<div className="border-2 border-solid rounded w-fit py-2 px-16">
						<span className="">결제정보</span>
					</div>
				</div>

				<div className="py-2"></div>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="충전캐시"
				           defaultValue={cash.amount} placeholder={cash.amount} updateType={'amount'} updateFormValue={updateFormValue}/>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="VAT" readonly={true}
				           inputStyle={"bg-neutral-200"} defaultValue={cash.vat} placeholder={cash.vat}/>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="총 결제금액" readonly={true}
				           inputStyle={"bg-neutral-200"} defaultValue={cash.total_deposit_amount} placeholder={cash.total_deposit_amount}/>
				<div className="py-2"></div>
				<div className="flex justify-center">
					<div className="border-2 border-solid rounded w-fit py-2 px-16">
						<span>결제정보</span>
					</div>
				</div>

				<div className="py-2"></div>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="입금금액" readonly={true}
				           inputStyle={"bg-neutral-200"} defaultValue={cash.total_deposit_amount} placeholder={cash.total_deposit_amount}/>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="입금자명"
				           defaultValue={cash.depositor_nm} placeholder={cash.depositor_nm} updateType={'depositor_nm'} updateFormValue={updateFormValue}/>
				<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="결제방법" readonly={true}
				           inputStyle={"bg-neutral-200"} defaultValue={"무통장입금"} placeholder={"무통장입금"}/>
				{me.auth === "관리자" || me.auth === "0차총판"
					? <>
						<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="예금주" readonly={true}
						           inputStyle={"bg-neutral-200"} defaultValue={"주식회사 셀렉티드"} placeholder={"주식회사 셀렉티드"}/>
						<InputText type={"text"} containerStyle={"flex flex-row pt-1"} labelStyle={"w-40"} labelTitle="계좌번호" readonly={true}
						           inputStyle={"bg-neutral-200"} defaultValue={"국민은행 762337-04-005752"} placeholder={"국민은행 762337-04-005752"}/>
					</>
					: <></>
				}

				<div className="flex justify-center">
					<div className="w-fit py-5 px-16">
						<button className="btn btn-primary w-36" onClick={SubmitBtn}>결제하기</button>
					</div>
				</div>
			</div>
		</div>
		</>;
}

export default Charge;