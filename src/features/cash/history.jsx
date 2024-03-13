import React, {useEffect} from "react";
import { useState } from 'react'
import {openModal} from "../common/modalSlice";
import {useDispatch} from "react-redux";
import Table from "../../components/Table";
import Constant from "./constant";
import useSWR from "swr";
import axios from "axios";

function History({query, status}) {
	const dispatch = useDispatch()
	console.log(status)

	const [ currentPage, setCurrentPage ] = useState(0);
	const [ pages, setPages ]             = useState([]);
	const { data, error, isLoading, mutate } = useSWR(`/cash/useList?limit=10&page=${currentPage}${query}&status=${status}`);

	console.log(data)
	const tableData = data?.list.map((item, idx) => {
		// TODO 소진내역 관련 데이터
		const result = {
			...item,
			button : {
				detail: () => {
					if (item.Cash) {
						dispatch(openModal({
							title: "",
							bodyType: MODAL_BODY_TYPES.PAYMENT_INFO_DETAIL,
							extraObject: {
								data: {
									deposit_dt: item.Cash.deposit_dt,
									cancel_dt: item.Cash.cancel_dt,
									apply_dt: item.Cash.apply_dt,
									tax_invoice_dt: item.Cash.tax_invoice_dt,
								},
							}
						}))
					}
				},
				delete: async () => {
					if (!confirm("삭제하시겠습니까?")) return;
					await axios.delete(`/cash/history/${item.id}`);
					await mutate();
				}
			}
		}

		return result;
	});

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
		if (!isLoading) {
			makePages(data.totalCount);
		}
	}, [ data ])

	if (isLoading) return <div>loading...</div>
	if (error) return <div>error...</div>

	return (<>
		<Table
			title="충전내역"
			columns={Constant.CashListColumns}
			data={tableData}
		/>
		<div style={ { display: "flex", justifyContent: "center" } }>
			<div className="join"
			     key={ "page-" + currentPage }
			     style={ { display: "flex", justifyContent: "space-around", padding: 10 } }>
				{ pages }
			</div>
		</div>
	</>)
}

export default History;