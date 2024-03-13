import {useEffect, useState} from "react"


function InputText({
                        id,
                       labelTitle,
                       labelStyle,
                       type,
                       containerStyle,
                       inputStyle,
                       defaultValue,
                       placeholder,
                       updateFormValue,
                       updateType,
                       readonly,
                       disabled
                   }) {

    const [value, setValue] = useState(defaultValue)
    const updateInputValue = (e) => {
        let value = e.target.value
        if (updateType === "account") {
            value = value.replace(/[^a-zA-Z0-9]/gi, '')
        }
        setValue(value)
        updateFormValue({updateType, value: value})
    }
    useEffect(() => {
        if (typeof defaultValue === "number") {
            setValue(defaultValue.toLocaleString())
        } else {
            setValue(defaultValue)
        }
    }, [defaultValue])

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"} value={value ?? ""} placeholder={placeholder || ""} readOnly={readonly || ""} disabled={disabled || ""}
                   onChange={(e) => updateInputValue(e)} className={"input input-bordered w-full " + inputStyle} id={id}/>
        </div>
    )
}


export default InputText