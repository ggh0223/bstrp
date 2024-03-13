function RadioInput({value, labelStyle, containerStyle, updateFormValue, updateType, checked}){

    const updateRadioValue = () => {
        updateFormValue({updateType, value : value})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="flex flex-row justify-left ml-44">
                <input type="radio" className="radio" name={updateType} checked={checked} onChange={() => updateRadioValue()}/>
                <span className={"text-base-content ml-4 " + labelStyle}>{value}</span>
            </label>
        </div>
    );
}

export default RadioInput;