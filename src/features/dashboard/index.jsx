import Constant from "./constant";
import Table from "../../components/Table";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import SelectBox from "../../components/Input/SelectBox";
import Search from "../common/components/Search";


function Dashboard({query}) {

    const { data, error, isLoading } = useSWR(`/ad/dashboard/list?${query}`);

    const tableData = data?.map((item) => {
        return {
            ...item,
            button: {
                statistics: () => {
                    location.href = "/app/ad-statistics";
                },
                detail: () => {
                    location.href = "/app/ad-registration/" + item.id;
                }
            },
        }
    });

    // const updateFormValue = ({updateType, value}) => {
    //     console.log(updateType, value)
    //     if (value === '전체') {
    //         setQuery('')
    //     } else {
    //         setQuery(`?prd_type=${value}`)
    //     }
    // }

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    return (<>
        {/*<div className="flex justify-end">*/}

        {/*    <SelectBox labelTitle="보기"*/}
        {/*               labelStyle="w-20"*/}
        {/*               defaultValue={ '전체' }*/}
        {/*               updateType="condition"*/}
        {/*               containerStyle={"flex flex-row pt-1"}*/}
        {/*               updateFormValue={ updateFormValue }*/}
        {/*               options={ [ { name: '전체', value: '전체' },*/}
        {/*                   { name: 'NP 트래픽', value: 'NP_Traffic' },*/}
        {/*                   { name: 'NP 저장하기', value: 'NP_Save' },*/}
        {/*                   { name: 'NS 트래픽', value: 'NS_Traffic' },*/}
        {/*               ] }*/}
        {/*    />*/}
        {/*</div>*/}

        <Table
            columns={Constant.TableColumns}
            data={tableData}
        />

    </>)
}

export default Dashboard