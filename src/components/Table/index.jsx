import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
function DataTable({ columns, data, title }) {
    const {me} = useSelector(state => state.user)

    const createColums = () => {
        const thClasses   = `px-1 py-3 text-center text-sm text-gray-500 uppercase tracking-wider w-20`
        return <tr>
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
                    </th>
                })
            }
        </tr>
    }
    const createRows = () => {
        const tdClasses   = `px-1 py-4 whitespace-nowrap`
        const textClasses = `text-sm text-gray-900`
        return data.map((row, k) => {
            return <tr key={ k }>
                {columns.filter((col) => {
                    if (col.auth) {
                        return col.auth.includes(me?.auth)
                    } else {
                        return true
                    }
                }).map((col, k) => {
                    const isButton = !!col.button
                    const isImage = !!col.image
                    let cell = row[col.key] ?? '-';
                    if (isButton) {
                        cell = Object.entries(col.button).map(([key, value], k) => {
                            if (row.button[key]) {
                                if (value.auth && !value.auth.includes(me?.auth)) {
                                    return <></>
                                }
                                if (title === "계정관리" && row.account === 'admin' && key === 'delete') {
                                    return <></>
                                }
                                if ((title === "충전내역" || title === "정산관리")
                                    && key === 'delete'
                                    && (row.Account && row.deposit_status !== "취소")
                                ) {
                                    return <></>
                                }
                                let btnClass = "btn btn-sm btn-primary"
                                if (col.button[key].style) {
                                    btnClass += " " + col.button[key].style
                                }
                                return <button
                                    key={ k }
                                    className={btnClass}
                                    onClick={ row.button[key] }
                                >{ value.title }</button>
                            } else {
                                return <></>
                            }
                        });
                    }
                    if (isImage) {
                        cell = <img src={ row[col.key] } alt=""/>
                    }
                    if (col.number) {
                        cell = Number(cell).toLocaleString()
                    }
                    return <td key={ k } className={ tdClasses }>
                        <div className={ textClasses }>
                            { cell }
                        </div>
                    </td>
                })}
            </tr>
        })
    }

    return <>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8 text-center">
                    <div className="overflow-hidden border-gray-200 border-b">
                        {/*<div className="h-5">{title}</div>*/}
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-50 text-gray-500">
                            { createColums() }
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            { createRows() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default DataTable