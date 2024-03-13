/** Icons are imported separatly to reduce build time */
import {
    UserIcon,
    QueueListIcon,
    BanknotesIcon,
    ChartPieIcon,
    CheckCircleIcon,
    EllipsisHorizontalCircleIcon,
    ClipboardDocumentListIcon,
    XCircleIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

const iconClasses        = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const routes = [
    // {
    //     auth: [ '관리자', '0차총판', '총판', '대행사', '매체사' ], path: '/app/dashboard', // url
    //     icon: <ComputerDesktopIcon className={ iconClasses }/>, // icon component
    //     name: '대시보드', // name that appear in Sidebar
    // },
    {
        auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/ad-complete', // url
        owner: [],
        icon: <CheckCircleIcon className={ iconClasses }/>, // icon component
        name: '광고관리', // name that appear in Sidebar
    },
    {
        auth: [ '관리자', '0차총판', '총판', '대행사', '매체사' ], path: '/app/account', // url
        owner: [],
        icon: <UserIcon className={ iconClasses }/>, // icon component
        name: '계정관리', // name that appear in Sidebar
    },
    {
        auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '',
        owner: [],
        icon: <ClipboardDocumentListIcon className={ iconClasses }/>, // icon component
        name: '광고등록', // name that appear in Sidebar
        submenu: [ {
            auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/ad-registration/NP_Traffic', // url
            owner: [],
            icon: <ClipboardDocumentListIcon className={ submenuIconClasses }/>, // icon component
            name: 'NP 트래픽', // name that appear in Sidebar
        }, {
            auth: [ '관리자', '0차총판', '총판', '대행사' ],path: '/app/ad-registration/NP_Save', // url
            owner: [],
            icon: <ClipboardDocumentListIcon className={ submenuIconClasses }/>, // icon component
            name: 'NP 저장하기', // name that appear in Sidebar
        }, {
            auth: [ '관리자', '0차총판', '총판', '대행사' ],path: '/app/ad-registration/NS_Traffic', // url
            owner: [],
            icon: <ClipboardDocumentListIcon className={ submenuIconClasses }/>, // icon component
            name: 'NS 트래픽', // name that appear in Sidebar
        }, {
            auth: [ '관리자', '0차총판', '총판', '대행사' ],path: '/app/ad-bulk-reg', // url
            owner: [],
            icon: <ClipboardDocumentListIcon className={ submenuIconClasses }/>, // icon component
            name: '일괄등록', // name that appear in Sidebar
        },]

    }, {
        auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/ad-pending', // url
        owner: [],
        icon: <EllipsisHorizontalCircleIcon className={ iconClasses }/>, // icon component
        name: '승인대기', // name that appear in Sidebar
    }, {
        auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/ad-end', // url
        owner: [],
        icon: <XCircleIcon className={ iconClasses }/>, // icon component
        name: '광고종료', // name that appear in Sidebar
    }, {
        auth: [ '관리자', '광고주' ], path: '/app/ad-statistics', // url
        owner: [],
        icon: <ChartPieIcon className={ iconClasses }/>, // icon component
        name: '광고통계', // name that appear in Sidebar
    },
    {
        auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/cash-charge',
        owner: ['admin'],
        icon: <BanknotesIcon className={ iconClasses }/>,
        name: '캐시충전',
    },
    // {
    //     auth: [ '관리자', '0차총판', '총판', '대행사' ], path: '/app/charge-history',
    //     icon: <CreditCardIcon className={ iconClasses }/>,
    //     name: '충전내역',
    // },
    {
        auth: [ '관리자' ], path: '/app/adjustment', // url
        owner: [],
        icon: <QueueListIcon className={ iconClasses }/>, // icon component
        name: '정산관리', // name that appear in Sidebar
    },
    {
        auth: [ '관리자'], path: '/app/add-filter',
        owner: [],
        icon: <FunnelIcon className={ iconClasses }/>,
        name: '광고필터',
    },
    // {
    //     role: [ 'user', 'admin', 'leader' ], path: '/app/media', // url
    //     icon: <ClipboardDocumentListIcon className={ iconClasses }/>, // icon component
    //     name: '매체관리', // name that appear in Sidebar
    // },

    ]

export default routes