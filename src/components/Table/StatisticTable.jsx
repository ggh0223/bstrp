import React, { useState } from "react";
import {useSelector} from "react-redux";
function DataTable({ columns, data, columnData }) {
    const {me} = useSelector(state => state.user)
    const createColumns = () => {
        const thClasses   = `px-1 py-3 text-center text-sm text-gray-500 uppercase tracking-wider w-20`
        return <tr>
            {columns.filter((col) => {
                    if (col.auth) {
                        return col.auth.includes(me?.auth)
                    } else {
                        return true
                    }
                }).filter((col) => columnData.includes(col.key) || col.essential)
                .map((col, k) => {
                    return <th key={ k } scope="col"
                               className={ thClasses }>
                        { col.title }
                    </th>
                })
            }
        </tr>
    }
    const createTotalRow = (data, title, length) => {
        const tdClasses   = `px-1 py-4 whitespace-nowrap`
        const textClasses = `text-sm text-gray-900`
        return <tr>
            <td key={ "total" } className={ tdClasses } colSpan={ length }>
                <div className={ textClasses }>
                    { title }
                </div>
            </td>
            {columns.filter((col) => {
                if (col.auth) {
                    return col.auth.includes(me?.auth)
                } else {
                    return true
                }
            }).filter((col) => col.essential)
                .map((col, k) => {
                    let cell = data[col.key];
                    if (col.number) {
                        cell = cell?.toLocaleString()
                    }
                    return <td key={ k } className={ tdClasses }>
                        <div className={ textClasses }>
                            { cell }
                        </div>
                    </td>
                })
            }
        </tr>

    }

    const cols = [];
    columnData.forEach((col, idx) => {
        cols.push(idx)
    });
    cols.push("profit", "cost", "mission")
    const compare = (a, b, standard) => {
        let compareA, compareB;
        switch (standard) {
            case "ASC":
                compareA = a;
                compareB = b;
                break;
            case "DESC":
                compareA = b;
                compareB = a;
                break;
            default:
                compareA = standard[a];
                compareB = standard[b];
                break;
        }
        if (compareA < compareB) {
            return -1
        } else if (compareA > compareB) {
            return 1
        } else {
            return 0
        }
    }
    const createRowData = (data, depth, cols, result) => {
        if (data.mission) {
            return result;
        }
        const keys = Object.keys(data).filter((key) => key !== "total");
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            cols[depth] = key;
            if (typeof data[key].mission === "number") {
                const obj = {...data[key], ...cols};
                result.push(obj);
            } else {
                createRowData(data[key],depth+1, cols, result)
            }
        }
        return result;
    }
    const createRow = (data, key) => {
        const tdClasses   = `px-1 py-4 whitespace-nowrap`
        const textClasses = `text-sm text-gray-900`

        const resultData = createRowData(data, 1, {0: key}, [])
            .sort((a, b) => {
                for (let i = 0; i < cols.length; i++) {
                    const col = cols[i];
                    let standard = "ASC";
                    if (col === columnData.length -1) {
                        standard = {
                            "NP_Traffic": 0,
                            "NP_Save": 1,
                            "NS_Traffic": 2,
                        }
                    } else if (typeof col === "string") {
                        standard = "DESC"
                    }
                    const c = compare(a[col], b[col], standard);
                    if (c !== 0) {
                        return c;
                    }
                }
                return 0;
            });
console.log(resultData, columnData)
        const check = Array(columnData.length).fill(null);
        resultData.forEach((data) => {
            for (let i = 0; i < columnData.length; i++) {
                if (i === columnData.length - 1) {
                    check[i] = data[i]
                    continue;
                }
                if (check[i] === data[i]) {
                    data[i] = null;
                } else {
                    check[i] = data[i];
                }
            }
        });
        const colSpans = Array.from(Array(resultData.length), () => new Array(columnData.length - 1));
        for (let i = 0; i < columnData.length - 1; i++) {
            let count = 0;
            for (let j = resultData.length - 1; j >= 0; j--) {
                const data = resultData[j][i];
                if (data) {
                    colSpans[j][i] = count + 1;
                    count = 0;
                } else {
                    count += 1;
                }
            }
        }
        const title = columnData[0] === "date" ? "일계" : "월계";

        return (<>
            { createTotalRow(data.total, title, columnData.length) }
            {resultData.map((data, i) => {
                const c = columnData.map((col, idx) => data[idx]);
                return (<tr key={ i }>
                    {c.map((col, k) => {
                        if (col) {
                            return <td key={ k } className={ tdClasses } rowSpan={ colSpans[i][k] ?? 1 }>
                                <div className={ textClasses }>
                                    { col !== "공백" ? col : "" }
                                </div>
                            </td>
                        } else {
                            return <></>
                        }
                    })}
                    {columns.filter((col) => {
                        if (col.auth) {
                            return col.auth.includes(me?.auth)
                        } else {
                            return true
                        }
                    }).filter((col) => col.essential)
                        .map((col, k) => {
                            let cell = data[col.key];
                            if (col.number) {
                                cell = cell?.toLocaleString()
                            }
                            return <td key={ k } className={ tdClasses }>
                                <div className={ textClasses }>
                                    { cell }
                                </div>
                            </td>
                        })
                    }
                </tr>)
            })}
        </>)
    }

    const createRows = (data) => {
        const keys = Object.keys(data).filter((key) => key !== "total")
            .sort((a, b) => compare(a, b, "DESC"))
        return keys.map((row) => {
            return createRow(data[row], row)
        })
    }

    return <>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8 text-center">
                    <div className="overflow-hidden border-gray-200 border-b">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-50 text-gray-500">
                            { createColumns() }
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            { data.total ? createTotalRow(data.total, "합계", columnData.length) : <></>}
                            { data.total ? createRows(data) : <></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default DataTable