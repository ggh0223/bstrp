function CheckboxInput({labelStyle, checked, containerStyle, value, addCheckboxValue, removeCheckboxValue, disabled}){

    // const [value, setValue] = useState(defaultValue)

    const updateCheckboxValue = (e) => {
        if (e.target.checked) {
            addCheckboxValue(value)
        } else {
            removeCheckboxValue(value)
        }

    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="flex flex-row justify-left ml-44">
                <input type="checkbox" checked={checked} className="checkbox checkbox-primary"
                       onChange={(e) => updateCheckboxValue(e)} disabled={disabled}/>
                <span className={"text-base-content ml-4 " + labelStyle}>{value}</span>
            </label>
        </div>
    )
}

export default CheckboxInput