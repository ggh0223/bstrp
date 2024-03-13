export default {
	TableColumns: {
		wait : {
			row: [{
				title: '소유자',
				key: 'owner',
				button: false,
			}, {
				title: '아이디',
				key: 'account',
				button: false,
			},{
				title: '광고 ID',
				key: 'id',
				button: false,
			},{
				title: '상품유형',
				key: 'prd_type',
				button: false,
			}, {
				title: '플레이스/상품명',
				key: 'company_nm',
				button: false,
			}, {
				title: '키워드',
				key: 'keyword',
				button: false,
			}, {
				title: 'PID',
				key: 'pid',
				button: false,
			}, {
				title: 'MID',
				key: 'mid',
				button: false,
			}, {
				title: '광고단가',
				key: 'ad_unit_price',
				auth: ['관리자'],
				button: {
					save: {
						title: '입력',
					},
				},
				number: true,
			}, {
				title: '매체단가',
				key: 'platform_price',
				auth: ['관리자'],
				button: {
					save: {
						title: '입력',
					},
				},
				number: true,
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
			},{
				title: '전체 참여 제한',
				key: 'limit_total',
				button: false,
				number: true,
			}, {
				title: '광고기간',
				key: 'ad_period_type',
				button: false,
			}, {
				title: '시작일',
				key: 'strt_dt',
				button: false,
			}, {
				title: '종료일',
				key: 'end_dt',
				button: false,
			},
				// 02.19 [수정] 캐시충전상태 관련 승인조건에서 제거
			// 	{
			// 	title: '보유캐시',
			// 	key: 'cash',
			// 	button: {
			// 		charge: {
			// 			title: '부족함',
			// 		},
			// 	},
			// 	number: true,
			// },
				{
				title: '상태',
				key: 'status',
				button: false,
			}],
			row2: [ {
				title: '썸네일',
				key: 'thumbnail_url',
				button: {
					upload: {
						title: '업로드',
					},
					view: {
						title: '보기',
						style: "btn-primary",
					}
				},
				auth: ['관리자', '광고주'],
			}, {
				title: '관리',
				key: 'button',
				button: {
					modify: {
						title: '수정',
					},
					approve: {
						title: '승인',
						auth: ['관리자'],
					},
					copy: {
						title: '복사',
					},
					complete: {
						title: '종료',
						style: "btn-error",
						auth: ['관리자'],
					},
				},
			}],
			col: [{
				title: '광고 URL',
				key: 'ad_url',
				button: false,
			}, {
				title: '사러가기 URL',
				key: 'gotobuy_url',
				button: {
					save: {
						title: '입력',
					},
				},
			}]
		},
		complete : {
			row: [{
				title: '소유자',
				key: 'owner',
				button: false,
			},{
				title: '아이디',
				key: 'account',
				button: false,
			},{
				title: '광고 ID',
				key: 'id',
				button: false,
			},{
				title: '상품유형',
				key: 'prd_type',
				button: false,
			}, {
				title: '플레이스/상품명',
				key: 'company_nm',
				button: false,
			}, {
				title: '키워드',
				key: 'keyword',
				button: false,
			}, {
				title: 'PID',
				key: 'pid',
				button: false,
			}, {
				title: 'MID',
				key: 'mid',
				button: false,
			}, {
				title: '광고단가',
				key: 'ad_unit_price',
				button: false,
				number: true,
				auth: ['관리자'],
			},{
				title: '매체단가',
				key: 'platform_price',
				button: false,
				number: true,
				auth: ['관리자'],
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
			},{
				title: '전체 참여 제한',
				key: 'limit_total',
				button: false,
				number: true,
			}, {
				title: '광고기간',
				key: 'ad_period_type',
				button: false,
			}, {
				title: '시작일',
				key: 'strt_dt',
				button: false,
			}, {
				title: '종료일',
				key: 'end_dt',
				button: false,
			}, {
				title: '상태',
				key: 'status',
				button: false,
			}],
			row2: [ {
				title: '썸네일',
				key: 'thumbnail_url',
				button: {
					view: {
						title: '보기',
					}
				},
			}, {
				title: '관리',
				key: 'button',
				button: {
					statistic: {
						title: '통계',
					},
					media: {
						title: '매체',
						auth : ['관리자', '광고주'],
					},
					copy: {
						title: '복사',
					},
					modify: {
						title: '일시중지',
						auth: ['관리자'],
					},
					// approve: {
					// 	title: '승인',
					// },
				},
			}],
			col: [{
				title: '광고 URL',
				key: 'ad_url',
				button: false,
			}, {
				title: '사러가기 URL',
				key: 'gotobuy_url',
				button: false,
			}]
		},
		end : {
			row: [{
				title: '소유자',
				key: 'owner',
				button: false,
			},{
				title: '아이디',
				key: 'account',
				button: false,
			},{
				title: '광고 ID',
				key: 'id',
				button: false,
			},{
				title: '상품유형',
				key: 'prd_type',
				button: false,
			}, {
				title: '플레이스/상품명',
				key: 'company_nm',
				button: false,
			}, {
				title: '키워드',
				key: 'keyword',
				button: false,
			}, {
				title: 'PID',
				key: 'pid',
				button: false,
			}, {
				title: 'MID',
				key: 'mid',
				button: false,
			}, {
				title: '광고단가',
				key: 'ad_unit_price',
				button: false,
				number: true,
				auth: ['관리자'],
			}, {
				title: '매체단가',
				key: 'platform_price',
				button: false,
				number: true,
				auth: ['관리자'],
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
			},{
				title: '전체 참여 제한',
				key: 'limit_total',
				button: false,
				number: true,
			}, {
				title: '광고기간',
				key: 'ad_period_type',
				button: false,
			}, {
				title: '시작일',
				key: 'strt_dt',
				button: false,
			}, {
				title: '종료일',
				key: 'end_dt',
				button: false,
			}],
			row2: [ {
				title: '썸네일',
				key: 'thumbnail_url',
				button: {
					view: {
						title: '보기',
					}
				}
			}, {
				title: '관리',
				key: 'button',
				button: {
					media: {
						title: '매체',
						auth : ['관리자', '광고주'],
					},
					copy: {
						title: '복사',
					},
					delete: {
						title: '삭제',
						style: "btn-error",
					},
				},
			}],
			col: [{
				title: '광고 URL',
				key: 'ad_url',
				button: false,
			}, {
				title: '사러가기 URL',
				key: 'gotobuy_url',
				button: false,
			}]
		},
	},

};