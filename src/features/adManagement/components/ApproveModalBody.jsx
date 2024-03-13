import React, {useEffect, useState} from "react";
import axios from "axios";
import RadioInput from "../../../components/Input/RadioInput";
import useSWR from "swr";
import CheckboxInput from "../../../components/Input/CheckboxInput";

function ApproveModalBody({extraObject, closeModal}) {
	const {message, type, data, option} = extraObject

	const [dataValue, setDataValue] = useState(data);
	const [mediaList, setMediaList] = useState(data.media ? data.media.split(",") : []);
	const {data: media_option, error, isLoading, mutate} = useSWR(`/account/media_option`);

	const addMedia = (media) => {
		setMediaList([...mediaList, media]);
	}
	const removeMedia = (media) => {
		setMediaList(mediaList.filter((item) => item !== media));
	}
	const updateFormValue = ({updateType, value}) => {
		setDataValue({...dataValue, [updateType]: value});
	}
	useEffect(() => {
		const media = mediaList.join(",");
		updateFormValue({updateType: "media", value: media});
	}, [mediaList])
	const SubmitBtn = async () => {
		console.log("submit")
		if (!dataValue.media) {
			alert("매체를 선택해주세요.");
			return ;
		}

		try {
			const res = await axios.patch("/ad/" + data.id, {
				aprv_status: true,
				media: dataValue.media,
				process_status: "IN_PROGRESS",
			});
			console.log(res)
		} catch (e) {
			alert("승인에 실패하였습니다.");
		} finally {
			console.log("mutate")
			option.mutate();
			closeModal();
		}
	}

	if (isLoading) return <div>loading...</div>
	if (error) return <div>failed to load</div>

	return (
		<>
			{/*<p className=' text-xl mt-8 text-center'>*/}
			{/*	{message}*/}
			{/*</p>*/}
			{type === "pending"
				? <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					{
						media_option?.map((item, index) => {
							return (
								<CheckboxInput key={index} value={item.account} updateType={"media"}
								               checked={mediaList.includes(item.account)}
								               addCheckboxValue={addMedia}
								               removeCheckboxValue={removeMedia}
								/>
							)
						})
					}
				</div>
				: <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					{mediaList.map((item, index) => {
						return (
							<CheckboxInput key={index} value={item} updateType={"media"} checked={true} disabled={true}/>
						)
					})}
				</div> }

			{type === "pending"
				? <div className="modal-action mt-12">
					<button className="btn btn-primary w-36" onClick={() => SubmitBtn()}>승인</button>
					<button className="btn btn-outline   " onClick={() => closeModal()}>취소</button>
				</div>
				: <div className="modal-action mt-12">
					<button className="btn btn-outline   " onClick={() => closeModal()}>확인</button>
				</div> }
		</>
	)
}
export default ApproveModalBody;
