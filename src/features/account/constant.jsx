export default {
	TableColumns: [{
		title: '소유자',
		key: 'owner',
		button: false,
	},{
		title: '아이디',
		key: 'account',
		button: false,
	}, {
		title: '비밀번호',
		key: 'password',
		button: false,
	}, {
		title: '상호명',
		key: 'company_nm',
		button: false,
	}, {
		title: '권한',
		key: 'auth',
		button: false,
	}, {
		title: '관리계정수',
		key: 'mng_acc_cnt',
		button: false,
		number: true,
	}, {
		title: '보유캐시',
		key: 'cash',
		button: false,
		number: true,
	}, {
		title: '등록일',
		key: 'createdAt',
		button: false,
	}, {
		title: '사업자 등록증',
		key: 'biz_reg',
		button: {
			view: {
				title: '보기',
			},
		},
	}, {
		title: '관리',
		key: 'button',
		button: {
			modify: {
				title: '수정',
			},
			delete: {
				title: '삭제',
			}
		},
	}],
};
