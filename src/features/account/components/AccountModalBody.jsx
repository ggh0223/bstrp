import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import axios from "axios";
import {useSelector} from "react-redux";
import InputFile from "../../../components/Input/InputFile";

function AccountModalBody({extraObject, closeModal}) {
	const {me} = useSelector(state => state.user)
	const {message, type, data, status, index, option} = extraObject

	const [accountObj, setAccountObj] = useState(data ? data : {
		account: "",
		password: "",
		chk_password: "",
		company_nm: "",
		auth: "",
		biz_reg: "",
		store_key: "",
		per_point: 0,
		save_per_point: 0,
		callback_url: "",
		owner: me.account,
	})
	const updateFormValue = ({updateType, value}) => {
		console.log("update")
		setAccountObj({...accountObj, [updateType]: value})
	}
	const optionalValues = ["biz_reg", "per_point", "save_per_point", "callback_url",]
	const SubmitBtn = async () => {
		console.log("submit")
		console.log(accountObj)
		const submitResult = {...accountObj}
		delete submitResult.store_key
		// 계정 저장 시 데이터 체크 후 저장
		for (let key of Object.keys(submitResult)) {
			if (!optionalValues.includes(key) && submitResult[key] === "") {
				alert("빈 값이 있습니다.")
				return false
			}
		}
		if (submitResult.password !== submitResult.chk_password) {
			alert("비밀번호가 일치하지 않습니다.")
			return false
		}
		let res = null;
		if (type === "create") {
			res = await axios.post("/account", submitResult);
		} else {
			res = await axios.put("/account/" + submitResult.id, submitResult);
		}
		if (res && res.status >= 200 && res.status < 300) {
			alert(res.data.message)
			closeModal();
			location.href = "/app/account"
		} else {
			alert("서버 오류")
		}
	}

	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="아이디" defaultValue={accountObj.account} placeholder={""} updateType={'account'} updateFormValue={updateFormValue}
				           disabled={type === "modify"}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputText type={"text"} labelTitle="비밀번호" defaultValue={accountObj.password} placeholder={""} updateType={'password'} updateFormValue={updateFormValue}/>
				<InputText type={"text"} labelTitle="비밀번호 확인" defaultValue={accountObj.password} placeholder={""} updateType={'chk_password'} updateFormValue={updateFormValue}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputText type={"text"} labelTitle="상호명" defaultValue={accountObj.company_nm} placeholder={""} updateType={'company_nm'} updateFormValue={updateFormValue}/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<SelectBox labelTitle="권한"
				           defaultValue={ accountObj.auth }
				           updateType="auth"
				           containerStyle="mt-4 w-full"
				           updateFormValue={ updateFormValue }
				           options={ [ { name: '선택', value: '' },
					                { name: '관리자', value: '관리자', auth: ['관리자'] },
						            { name: '0차총판', value: '0차총판', auth: ['관리자'] },
						            { name: '총판', value: '총판', auth: ['관리자', '0차총판'] },
						            { name: '대행사', value: '대행사', auth: ['관리자', '0차총판', '총판'] },
						            { name: '매체사', value: '매체사', auth: ['관리자'] },] }
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<SelectBox labelTitle="소유자"
				           defaultValue={ accountObj.owner }
				           updateType="owner"
				           containerStyle="mt-4 w-full"
				           updateFormValue={ updateFormValue }
				           options={ me?.owner_option.map(o => {
							  return {name: o, value: o}
				           }) }
				/>
			</div>
			{accountObj.auth === "매체사" &&
				<>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="APP KEY" defaultValue={accountObj.store_key}
						           placeholder={"자동 생성"} updateType={'store_key'} updateFormValue={updateFormValue}
									disabled={true}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="리워드 전환 비율 (일반)" defaultValue={accountObj.per_point} placeholder={""} updateType={'per_point'} updateFormValue={updateFormValue}/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="리워드 전환 비율 (NP_Save)" defaultValue={accountObj.save_per_point} placeholder={""} updateType={'save_per_point'} updateFormValue={updateFormValue}/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						<InputText type={"text"} labelTitle="콜백 URL" defaultValue={accountObj.callback_url} placeholder={""} updateType={'callback_url'} updateFormValue={updateFormValue}/>
					</div>
				</>
			}
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<InputFile type={"image"} containerStyle={"flex flex-row pt-1"} updateType={'biz_reg'}
				           accept={"image/jpg,image/png,image/jpeg"} description={"JPG,JPEG,PNG"}
				           labelTitle={"사업자 등록증"} defaultValue={accountObj.biz_reg}
				           updateFormValue={updateFormValue}/>
			</div>
			<div className="modal-action mt-12">

				<button className="btn btn-outline   " onClick={() => closeModal()}>Cancel</button>

				<button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>Yes</button>

			</div>
		</>
	)
}
export default AccountModalBody
