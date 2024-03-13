import {useRef, useState} from "react"
import axios from "axios";


function InputFile({id, labelTitle, labelStyle, containerStyle, accept, type,
                       description, defaultValue, updateType, updateFormValue}) {

    const fileInput = useRef();
    const [value, setValue] = useState(defaultValue);
    const fileExt = accept.split(",");
    const updateInputValue = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type && !fileExt.includes(file.type)) {
                alert("업로드 가능한 파일 형식이 아닙니다.");
                fileInput.current.value = "";
                return;
            }
            const form = new FormData();
            form.append(type, file);
            try {
                const res = await axios.post("/file/upload", form);
                console.log("res", res);
                setValue(res.data.originalname)
                updateFormValue({updateType, value: res.data.url})
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <div>
                <div className="label">
                    <span className="label-text">형식 제한 : {description}</span>
                    <span className="label-text ml-2">파일 : {value ? value : "등록된 파일 없음"}</span>
                </div>
                <input type={"file"} onChange={(e) => updateInputValue(e)} ref={fileInput}
                       accept={accept} className={"file-input file-input-bordered w-full max-w-xs"} id={id}/>
            </div>

        </div>
    )
}


export default InputFile