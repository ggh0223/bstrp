import Constant from "./constant";
import Table from "../../components/Table";
import StatisticTable from "../../components/Table/StatisticTable";
import React, {useEffect, useState} from "react";
import SelectBox from "../../components/Input/SelectBox";
import Datepicker from "react-tailwindcss-datepicker";
import useSWR from "swr";
import moment from "moment";
import {useSelector} from "react-redux";
import axios from "axios";

function Statistics() {
    const [ condition, setCondition ] = useState({
        type: "일별",
        prd_type: "전체",
        period: "7일",
        startDate: moment().subtract(6, 'days').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        company_nm: "전체",
        media: "전체",
        keyword: "전체"
    });

    const {me} = useSelector(state => state.user)
    const media_option = useSWR(`/account/media_option`);
    const media_option_data = media_option.data?.map((item) => {
        return {name: item.account, value: item.account}
    });
    const company_option = useSWR(`/ad/company_option`);
    const company_option_data = company_option.data?.map((item) => {
        return {name: item.company_nm + " - " + item.keyword, value: item.id}
    });
    const company_option2 = useSWR(`/ad/company_option?media=${condition.media}`);
    const company_option2_data = company_option2.data?.map((item) => {
        return {name: item.company_nm + " - " + item.keyword, value: item.id}
    });
    // const keyword_option = useSWR(`/ad/keyword_option?company_nm=${condition.company_nm}`);
    // const keyword_option_data = keyword_option.data?.map((item) => {
    //     return {name: item.keyword, value: item.keyword}
    // });

    const [ query, setQuery ] = useState("?");

    const createQuery = (condition) => {
        let query = "?";
        if (condition.type !== "") {
            query += `type=${condition.type}&`
        }
        if (condition.prd_type !== "") {
            query += `prd_type=${condition.prd_type}&`
        }
        if (condition.startDate !== "") {
            query += `startDate=${condition.startDate}&`
        }
        if (condition.endDate !== "") {
            query += `endDate=${condition.endDate}&`
        }
        if (condition.company_nm !== "") {
            query += `company_nm=${condition.company_nm}&`
        }
        if (condition.media !== "") {
            query += `media=${condition.media}&`
        }
        if (condition.keyword !== "") {
            query += `keyword=${condition.keyword}&`
        }
        return query;
    }
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pages, setPages ]             = useState([]);
    const { data, error, isLoading } = useSWR(`/ad/statistics/v2${query}limit=100&offset=${currentPage*100}`);

    const tableData = data?.list
    const columnData = data?.columns

    useEffect(() => {
        searchingData();
    }, []);

    const [ startDateValue, setStartDateValue ] = useState({
        startDate: moment().subtract(6, 'days').format("YYYY-MM-DD"), endDate: ""
    });
    const [ endDateValue, setEndDateValue ] = useState({
        startDate: moment().format("YYYY-MM-DD"), endDate: ""
    });
    const [ type, setType ] = useState("일별");
    const updateFormValue = ({updateType, value}) => {
        if (updateType === "type" ) {
            setType(value)
        }
        if (updateType === "period" && value !== "직접입력") {
            let startDate = "";
            let endDate = "";
            switch (value) {
                case "7일":
                    startDate = moment().subtract(6, 'days').format("YYYY-MM-DD");
                    endDate = moment().format("YYYY-MM-DD")
                    break;
                case "이번달":
                    startDate = moment().startOf('month').format("YYYY-MM-DD");
                    endDate = moment().endOf('month').format("YYYY-MM-DD")
                    break;
                case "지난달":
                    startDate = moment().subtract(1, 'months').startOf('month').
                    format("YYYY-MM-DD");
                    endDate = moment().subtract(1, 'months').endOf('month')
                        .format("YYYY-MM-DD")
                    break;
            }
            handleStartDatePickerValueChange({startDate: startDate, endDate: ""})
            handleEndDatePickerValueChange({startDate: endDate, endDate: ""})
            setCondition({...condition,
                [updateType]: value,
                startDate: startDate,
                endDate: endDate
            });
        } else if (updateType === "type" && value === "월별") {
            let startDate = moment(moment().year() + "-01-01" ).format("YYYY-MM-DD");
            let endDate = moment(moment().year() + "-12-31").format("YYYY-MM-DD")
            handleStartDatePickerValueChange({startDate: startDate, endDate: ""})
            handleEndDatePickerValueChange({startDate: endDate, endDate: ""})
            setCondition({...condition,
                [updateType]: value,
                period: "직접입력",
                startDate: startDate,
                endDate: endDate
            });
        } else {
            if (updateType === "type") {
                setCondition({...condition,
                    [updateType]: value,
                    company_nm: "전체",
                    media: "전체",
                    keyword: "전체"
                });
            } else {
                setCondition({...condition, [updateType]: value});
            }
        }
    }
    const handleStartDatePickerValueChange = (newValue) => {
        setCondition({...condition,
            startDate: moment(newValue.startDate).format("YYYY-MM-DD"),
        });
        setStartDateValue(newValue);
    }
    const handleEndDatePickerValueChange = (newValue) => {
        setCondition({...condition,
            endDate: moment(newValue.startDate).format("YYYY-MM-DD")
        });
        setEndDateValue(newValue);
    }
    function searchingData() {
        setQuery(createQuery(condition));
    }

    async function download(param) {
        try {
            const res = await axios.get(`/ad/excel/${param}${query}`,
                { responseType: 'blob' }
            );
            const url = window.URL.createObjectURL(
                new Blob([res.data],
                    { type: res.headers["content-type"] })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `통계.xlsx`
            );
            document.body.appendChild(link);
            link.click();
        } catch (e) {
            console.log(e);
            alert("다운로드에 실패하였습니다.")
        }
    }



    const makePages = (totalRows) => {
        let pageRows    = 10;
        let pages       = []
        const totalPage = Math.ceil(totalRows / pageRows);

        let start = Math.floor(currentPage / 10) * 10;
        let prev  = start - 10 > 0 ? start - 10 : 0;
        let end   = (Math.floor(currentPage / 10) + 1) * 10;
        let next  = end > totalPage ? totalPage : end + 1;
        if (end > totalPage) end = totalPage;

        const pageClass = "join-item btn btn-sm"

        for (let i = start; i < end; i++) {
            pages.push(<button key={ `page-${ i }` }
                               className={ `${ pageClass } ${ currentPage === i ? 'btn-active' : '' }` }
                               onClick={ () => setCurrentPage(i) }
            >{ i + 1 }</button>)
        }

        pages.unshift(<button key={ `prev-${ prev }` } className={ pageClass }
                              onClick={ () => setCurrentPage(prev) }>«</button>)
        pages.push(<button key={ `next-${ next }` } className={ pageClass }
                           onClick={ () => setCurrentPage(next - 1) }>»</button>)
        pages.unshift(<button key={ 0 } className={ pageClass } onClick={ () => setCurrentPage(0) }>첫 페이지</button>)
        pages.push(<button key={ totalPage } className={ pageClass }
                           onClick={ () => setCurrentPage(totalPage - 1) }>마지막 페이지</button>)

        setPages(pages)
    }
    useEffect(() => {
        if (!isLoading && data?.totalCount) {
            makePages(data.totalCount);
        }
    }, [ data ])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    return <>
        <div className="flex justify-start">
            <SelectBox labelTitle="구분"
                       labelStyle="w-40"
                       defaultValue={ condition.type }
                       updateType="type"
                       containerStyle={"flex flex-row pt-1"}
                       updateFormValue={ updateFormValue }
                       options={ [{ name: '일별', value: '일별' },
                           { name: '월별', value: '월별' },
                           { name: '플레이스/상품명', value: '플레이스/상품명' },
                           { name: '매체별', value: '매체별', auth: ["관리자"] },
                           { name: '상세', value: '상세' },
                       ] }
            />
            {condition.type === "플레이스/상품명"
                ? <SelectBox labelTitle="플레이스/상품명"
                             labelStyle="w-40"
                             defaultValue={ condition.company_nm }
                             updateType="company_nm"
                             containerStyle={"flex flex-row pt-1"}
                             updateFormValue={ updateFormValue }
                             options={ [ { name: '전체', value: '전체' }, ...company_option_data ] }/>
                : <></>}
            {/*{condition.type === "업체별" && condition.company_nm !== "전체" && keyword_option.data*/}
            {/*    ? <SelectBox labelTitle="키워드"*/}
            {/*                 labelStyle="w-40"*/}
            {/*                 defaultValue={ condition.keyword }*/}
            {/*                 updateType="keyword"*/}
            {/*                 containerStyle={"flex flex-row pt-1"}*/}
            {/*                 updateFormValue={ updateFormValue }*/}
            {/*                 options={ [ { name: '전체', value: '전체' }, ...keyword_option_data ] }/>*/}
            {/*    : <></>}*/}

            {me?.auth === "관리자" && condition.type === "매체별"
                ? <SelectBox labelTitle="매체명"
                             labelStyle="w-40"
                             defaultValue={ condition.media }
                             updateType="media"
                             containerStyle={"flex flex-row pt-1"}
                             updateFormValue={ updateFormValue }
                             options={ [ { name: '전체', value: '전체' }, ...media_option_data ] }/>
                : <></>}
            {me?.auth === "관리자" && condition.type === "매체별" && condition.media !== "전체" && company_option2.data
                ? <SelectBox labelTitle="플레이스/상품명"
                             labelStyle="w-40"
                             defaultValue={ condition.company_nm }
                             updateType="company_nm"
                             containerStyle={"flex flex-row pt-1"}
                             updateFormValue={ updateFormValue }
                             options={ [ { name: '전체', value: '전체' }, ...company_option2_data ] }/>
                : <></>}
            {/*{me?.auth === "관리자" && condition.type === "매체별" && condition.media !== "전체"*/}
            {/*&& condition.company_nm !== "전체" && keyword_option.data*/}
            {/*    ? <SelectBox labelTitle="키워드"*/}
            {/*                 labelStyle="w-40"*/}
            {/*                 defaultValue={ condition.keyword }*/}
            {/*                 updateType="keyword"*/}
            {/*                 containerStyle={"flex flex-row pt-1"}*/}
            {/*                 updateFormValue={ updateFormValue }*/}
            {/*                 options={ [ { name: '전체', value: '전체' }, ...keyword_option_data ] }/>*/}
            {/*    : <></>}*/}
        </div>
        <div className="flex justify-start">
            <SelectBox labelTitle="상품유형"
                       labelStyle="w-40"
                       defaultValue={ condition.prd_type }
                       updateType="prd_type"
                       containerStyle={"flex flex-row pt-1"}
                       updateFormValue={ updateFormValue }
                       options={ [ { name: '전체', value: '전체' },
                           { name: 'NP_Traffic', value: 'NP_Traffic' },
                           { name: 'NP_Save', value: 'NP_Save' },
                           { name: 'NS_Traffic', value: 'NS_Traffic' },
                       ] }
            />
            <SelectBox labelTitle="기간"
                       labelStyle="w-40"
                       defaultValue={ type === "월별" ? "직접입력" : condition.period }
                       updateType="period"
                       containerStyle={"flex flex-row pt-1"}
                       updateFormValue={ updateFormValue }
                       options={ [ { name: '최근 7일', value: '7일' },
                           { name: '직접입력', value: '직접입력' },
                           { name: '이번달', value: '이번달' },
                           { name: '지난달', value: '지난달' },
                       ] }
            />
            <div className={`form-control flex flex-row pt-1`}>
                <label className="label">
                    <span className={"label-text text-base-content w-20"}></span>
                </label>
                <Datepicker
                    containerClassName="w-full relative"
                    theme={ "light" }
                    value={ startDateValue }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "startDate" }
                    placeholder={startDateValue.startDate ?? "YYYY-MM-DD"}
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
                    value={ endDateValue }
                    inputClassName="input input-bordered w-full"
                    popoverDirection={ "down" }
                    readOnly={ true }
                    inputId={ "endDate" }
                    placeholder={endDateValue.startDate ?? "YYYY-MM-DD"}
                    onChange={ handleEndDatePickerValueChange }
                    showShortcuts={ false }
                    asSingle={ true }
                    useRange={ false }
                    locale="ko"
                    primaryColor={ "white" }
                />
            </div>
            <button className="btn btn-outline mx-1 mt-1" onClick={searchingData}>검색</button>
            {condition.type === "상세" && Array.isArray(tableData)
                ? <button className="btn btn-outline mx-1 mt-1" onClick={() => download("statistics")}>엑셀다운로드</button>
                : <button className="btn btn-outline mx-1 mt-1" onClick={() => download("statistics")}>엑셀다운로드</button>}
        </div>
        <div className="divider" ></div>
        {condition.type === "상세" && Array.isArray(tableData)
            ? <>
                <Table
                    columns={Constant.TableColumns.detail}
                    data={tableData}
                />
                <div style={ { display: "flex", justifyContent: "center" } }>
                    <div className="join"
                         key={ "page-" + currentPage }
                         style={ { display: "flex", justifyContent: "space-around", padding: 10 } }>
                        { pages }
                    </div>
                </div>
            </>
            : <></>
        }
        {condition.type !== "상세" && columnData && columnData.length > 0
            ? <StatisticTable
                columns={Constant.TableColumns.statistics}
                data={tableData}
                columnData={columnData}
            />
            : <></>
        }
    </>;
}

export default Statistics