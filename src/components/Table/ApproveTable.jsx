import React, { useState } from "react";
import {useSelector} from "react-redux";
function DataTable({ columns, data, title }) {
    const {me} = useSelector(state => state.user)
    const createRows = (column, row) => {
        const tdClasses   = `px-1 py-4`
        let textClasses = `text-sm text-gray-900`
        return <tr key={ 1 }>
            {column.filter((col) => {
                if (col.auth) {
                    return col.auth.includes(me?.auth)
                } else {
                    return true
                }
            }).map((col, k) => {
                const isButton = !!col.button
                const isImage = !!col.image
                let cell = row[col.key] !== null || row[col.key] !== undefined  ? row[col.key] : "-";
                if (isButton) {
                    cell = Object.entries(col.button).map(([key, value], k) => {
                        let btnClass = "btn btn-sm btn-primary mt-1"
                        if (value.auth && !value.auth.includes(me?.auth)) {
                            return <></>
                        }
                        if (row.button[key]) {
                            if (key === "charge") {
                                value.title = row.charge_status;
                                console.log(cell)
                                cell = Number(cell).toLocaleString()

                                switch (row.charge_status) {
                                    case "부족함":
                                        btnClass += " btn-error"
                                        break;
                                    case "충전됨":
                                        btnClass += " btn-success"
                                        row.button[key] = () => {};
                                        break;
                                    case "대기중":
                                        // row.button[key] = () => {};
                                        return <div>{ cell }</div>;
                                        // break;
                                }
                            }
                            if (col.button[key].style) {
                                btnClass += " " + col.button[key].style
                            }
                            if ((col.key === "ad_unit_price" || col.key === "platform_price"
                                    || col.key === "thumbnail_url")
                                && cell !== "-"){
                                cell = Number(cell).toLocaleString()
                                if (!col.button[key].style) {
                                    btnClass += " btn-success"
                                }
                            }
                            return <>
                                { key === "save" || key === "charge" ? <div>{ cell }</div> : "" }
                                <button
                                    key={ k }
                                    className={btnClass}
                                    onClick={ () => row.button[key](col.key) }
                                >{ value.title }</button>
                            </>;
                        } else {
                            return <></>;
                        }
                    });
                } else if (col.number) {
                    cell = Number(cell).toLocaleString()

                }
                if (isImage) {
                    cell = <img src={ row[col.key] } alt=""/>;
                }
                let textStyle = ""
                if (col.key === "status") {
                    switch (row.status) {
                        case "캐시부족":
                            textStyle = " [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-red-500"
                            break;
                        case "승인대기중":
                            textStyle = " [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-purple-500"
                            break;
                        case "일시중지":
                            textStyle = " [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-orange-500"
                            break;
                    }
                }
                return <td key={ k } className={ tdClasses }>
                    <div className={ textClasses + textStyle }>
                        { cell }
                    </div>
                </td>
            })}
        </tr>;
    }
    const createTable1 = (columns, row) => {
        const thClasses = `px-1 py-3 text-center text-sm text-gray-500 uppercase tracking-wider w-20`

        return  <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    {columns.filter((col) => {
                        if (col.auth) {
                            return col.auth.includes(me?.auth)
                        } else {
                            return true
                        }
                    }).map((col, k) => {
                        return <th key={ k } scope="col"
                                   className={ thClasses }>
                            { col.title }
                        </th>})
                    }
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                { createRows(columns, row) }
            </tbody>
        </table>
    }

    const createTable2 = (columns, row) => {

        const thClasses = `px-1 py-3 text-center text-sm text-gray-500 uppercase tracking-wider w-20`

        return  <table className="min-w-full divide-y divide-gray-200 text-center min-h-full">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    {columns.filter((col) => {
                        if (col.auth) {
                            return col.auth.includes(me?.auth)
                        } else {
                            return true
                        }
                    }).map((col, k) => {
                        return <th key={ k } scope="col"
                                   className={ thClasses }>
                            { col.title }
                        </th>})
                    }
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
                { createRows(columns, row) }
            </tbody>
        </table>
    }

    const createTable3 = (row) => {
        const thClasses   = `bg-gray-50 px-1 py-3 text-center text-sm text-gray-500 uppercase tracking-wider w-28`
        const tdClasses   = `whitespace-nowrap`
        const textClasses = `text-sm text-gray-900 text-left`
        return (<>
            {columns.col.map((col, k) => {
                if (row.prd_type !== "NS_Traffic" && col.key === "gotobuy_url") {
                    return <></>
                }
                const isButton = !!col.button
                let cell = row[col.key] ? row[col.key] : "-";
                if (isButton) {
                    cell = Object.entries(col.button).map(([key, value], k) => {
                        if (row.button[key]) {
                            return <>
                                { cell }
                                <button
                                    key={ k }
                                    className="btn btn-sm btn-primary ml-2"
                                    onClick={ () => row.button[key](col.key) }
                                >{ value.title }</button>
                            </>

                        } else {
                            return <></>
                        }
                    })
                }

                return <tr key={ k }>
                    <th className={thClasses}>
                        { col.title }
                    </th>
                    <td key={ k } className={ tdClasses }>
                        <div className={ textClasses }>
                            { cell }
                            {cell !== '-' && !isButton ? <button className="btn btn-sm btn-primary ml-2" onClick={() => {
                                navigator.clipboard.writeText(cell).then(() => {
                                    alert("복사되었습니다.\n " + cell);
                                });
                            }}>복사</button> : <></>}
                        </div>
                    </td>
                </tr>
            })}
        </>)
    }
    const createView = () => {
        return data.map((row, k) => {

            return (<div key={k} className="flex flex-row pt-3">
                <div className="flex-auto">
                    { createTable1(columns.row, row) }
                    <table className="min-w-full divide-y divide-gray-200 text-center">
                        <tbody className="bg-white divide-y divide-gray-200">
                        { createTable3(row) }
                        </tbody>
                    </table>
                </div>
                <div className="flex-auto">
                    { createTable2(columns.row2, row) }
                </div>
            </div>)

        });

    }

    return <>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8 text-center">
                    <div className="overflow-hidden border-gray-200 border-b">
                        <div className="h-5">{title}</div>
                        { createView() }
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default DataTable