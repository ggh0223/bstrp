import React, { useEffect, useState } from "react";

function ImageViewModalBody({extraObject, closeModal}) {
	const {message, type, data, status, index, option} = extraObject
	return (
		<>
			<p className=' text-xl mt-8 text-center'>
				{message}
			</p>
			{data.image_url
				? <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
					<img src={data.image_url} alt="이미지" className="w-full"/>
				</div>
			: <>이미지가 없습니다.</> }

		</>
	)
}
export default ImageViewModalBody
