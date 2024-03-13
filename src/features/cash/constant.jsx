export default {
	TableColumns: [
		{
		title: '번호',
		key: 'no',
		button: false,
	}, {
		title: '승인일자',
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
		title: '충전현황',
		key: 'deposit_status',
		button: false,
	},  {
		title: '관리',
		key: 'button',
		button: {
			detail: {
				title: '보기',
			},
			delete: {
				title: '삭제',
				style: 'border-red-800 bg-red-800 hover:bg-red-800 hover:border-red-800',
				auth: ['관리자'],
			}
		},
	}],
	CashListColumns: [
		{
			title: '아이디',
			key: 'account',
			button: false,
		}, {
			title: '일자',
			key: 'date',
			button: false,
		}, {
			title: '상호명',
			key: 'company_nm',
			button: false,
		}, {
			title: '입금자명',
			key: 'depositor_nm',
			button: false,
		},  {
			title: '플레이스/상품명',
			key: 'ad_company_nm',
			button: false,
		}, {
			title: '상품유형',
			key: 'prd_type',
			button: false,
		}, {
			title: 'PID/MID',
			key: 'pmid',
			button: false,
		}, {
			title: '전체 참여 수',
			key: 'limit_total',
			button: false,
			number: true,
		}, {
			title: '캐시',
			key: 'cash',
			button: false,
			number: true,
		}, {
			title: '보유캐시',
			key: 'current_cash',
			button: false,
			number: true,
		}, {
			title: '상태',
			key: 'status',
			button: false,
		}, {
			title: '관리',
			key: 'button',
			button: {
				detail: {
					title: '보기',
				},
				delete: {
					title: '삭제',
					style: 'border-red-800 bg-red-800 hover:bg-red-800 hover:border-red-800',
					auth: ['관리자'],
				}
			},
		}
	]
};