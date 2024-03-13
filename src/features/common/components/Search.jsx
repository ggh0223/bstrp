import SelectBox from "../../../components/Input/SelectBox";
import Datepicker from "react-tailwindcss-datepicker";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import InputText from "../../../components/Input/InputText";

function Search({options, setQuery}) {

	const [key, setKey] = useState(options[0].value);
	const [value, setValue] = useState("");
	const [search, setSearch] = React.useState({startDate: "", endDate: ""});

	const handleStartDatePickerValueChange = (newValue) => {
		setSearch({...search, startDate: moment(newValue.startDate).format("YYYY-MM-DD")})
	}
	const handleEndDatePickerValueChange = (newValue) => {
		setSearch({...search, endDate: moment(newValue.startDate).format("YYYY-MM-DD")})
	}
	const updateFormValue = ({updateType, value}) => {
		setValue(value)
	}
	const updateKey = ({updateType, value}) => {
		setKey(value)
	}
	function searchingData() {
		let query = ""
		Object.entries({...search, [key]: value}).forEach(([key,value]) => {
			if (value) {
				query += `&${key}=${value}`
			}
		});
		setQuery(query)
	}

	return (
		<div className="flex justify-between">
			<div className={`form-control flex flex-row`}>
				<SelectBox defaultValue={ options[0].name }
				           updateType="key"
				           containerStyle={"flex flex-row pt-1 w-80"}
				           updateFormValue={ updateKey }
				           options={ options }
				/>
				<InputText containerStyle={"flex flex-row pt-1"}
				           updateType={ key }
				           updateFormValue={ updateFormValue }
				           placeholder={"검색어를 입력해주세요."}
				/>
			</div>
			<div className={`form-control flex flex-row pt-1`}>
				<Datepicker
					containerClassName="w-full relative"
					theme={ "light" }
					value={ search.startDate }
					inputClassName="input input-bordered w-full"
					popoverDirection={ "down" }
					readOnly={ true }
					inputId={ "startDate" }
					placeholder={search.startDate ?? "YYYY-MM-DD"}
					onChange={ handleStartDatePickerValueChange }
					showShortcuts={ false }
					asSingle={ true }
					useRange={ false }
					locale="ko"
					primaryColor={ "white" }
				/>
				<Datepicker
					containerClassName="w-full relative"
					theme={ "light" }
					value={ search.endDate }
					inputClassName="input input-bordered w-full"
					popoverDirection={ "down" }
					readOnly={ true }
					inputId={ "startDate" }
					placeholder={search.endDate ?? "YYYY-MM-DD"}
					onChange={ handleEndDatePickerValueChange }
					showShortcuts={ false }
					asSingle={ true }
					useRange={ false }
					locale="ko"
					primaryColor={ "white" }
				/>
			</div>
			<button className="btn btn-outline mx-1 mt-1" onClick={searchingData}>검색</button>
		</div>
	)
}
export default Search