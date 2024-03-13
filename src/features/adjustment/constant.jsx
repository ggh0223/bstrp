export default {
	TableColumns: [{
		title: '번호',
		key: 'no',
		button: false,
	}, {
		title: '신청일자',
		key: 'apply_dt',
		button: false,
	}, {
		title: '아이디',
		key: 'account',
		button: false,
	}, {
		title: '상호명',
		key: 'company_nm',
		button: false,
	}, {
		title: '입금자명',
		key: 'depositor_nm',
		button: false,
	}, {
		title: '충전캐시',
		key: 'amount',
		button: false,
		number: true,
	}, {
		title: '총 입금금액 (VAT 포함)',
		key: 'total_deposit_amount',
		button: false,
		number: true,
	}, {
		title: '결제방법',
		key: 'payment_method',
		button: false,
	}, {
		title: '소유자',
		key: 'owner',
		button: false,
	},  {
		title: '관리',
		key: 'button',
		button: {
			deposit: {
				title: '입금처리',
			},
			deposit_cancel: {
				title: '입금처리완료',
				style: "btn-success"
			},
			invoice: {
				title: '세금계산서',
			},
			invoice_cancel: {
				title: '세금계산서완료',
				style: "btn-success"
			},
			cancel: {
				title: '취소처리',
				style: "btn-error",
			},
			delete: {
				title: '삭제',
				style: 'border-red-800 bg-red-800 hover:bg-red-800 hover:border-red-800',
			}
		},
	}],
};