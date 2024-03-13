export default {
	TableColumns: [{
		title: '상품유형',
		key: 'prd_type',
		button: false,
	}, {
		title: '플레이스/상품명',
		key: 'company_nm',
		button: false,
	}, {
		title: '1일 참여수',
		key: 'mission_today',
		button: false,
		number: true,
	}, {
		title: '1일 참여 제한',
		key: 'limit_per_day',
		button: false,
		number: true,
	}, {
		title: '전체 참여수',
		key: 'mission_total',
		button: false,
		number: true,
	}, {
		title: '전체 참여 제한',
		key: 'limit_total',
		button: false,
		number: true,
	}, {
		title: '등록일',
		key: 'createdAt',
		button: false,
	}, {
		title: '종료일',
		key: 'end_dt',
		button: false,
	}, {
		title: '관리',
		key: 'button',
		button: {
			statistics: {
				title: '통계',
			},
			detail: {
				title: '상세보기',
			},
		},
	}],
};