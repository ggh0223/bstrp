import { useState } from "react"
import Datepicker from "react-tailwindcss-datepicker";


const periodOptions = [ { name: "Today", value: "TODAY" }, {
    name: "Yesterday", value: "YESTERDAY"
}, { name: "This Week", value: "THIS_WEEK" }, { name: "Last Week", value: "LAST_WEEK" }, {
    name: "This Month", value: "THIS_MONTH"
}, { name: "Last Month", value: "LAST_MONTH" }, ]

function ListTopBar({ updateDashboardPeriod, searchDate = undefined, setSearchDate = undefined }) {

    const [ dateValue, setDateValue ] = useState({
        startDate: new Date(), endDate: new Date()
    });

    const handleDatePickerValueChange = (newValue) => {
        console.log("newValue:", newValue);
        searchDate ? setSearchDate(newValue) : setDateValue(newValue);
        updateDashboardPeriod(newValue)
    }

    const goAnnual = () => {
        window.location.href = '/app/annual';
    }

    return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
                <Datepicker
                    containerClassName="w-72 "
                    value={ searchDate?.startDate ? searchDate : dateValue }
                    theme={ "light" }
                    // 딱 맞게
                    inputClassName="input input-bordered w-56"
                    popoverDirection={ "down" }
                    toggleClassName="invisible"
                    onChange={ handleDatePickerValueChange }
                    showShortcuts={ true }
                    asSingle={ true }
                    useRange={ false }
                    primaryColor={ "white" }
                />
                {/* <SelectBox
                options={periodOptions}
                labelTitle="Period"
                placeholder="Select date range"
                containerStyle="w-72"
                labelStyle="hidden"
                defaultValue="TODAY"
                updateFormValue={updateSelectBoxValue}
            /> */ }
            </div>
        </div>)
}

export default ListTopBar