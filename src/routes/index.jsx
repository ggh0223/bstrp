// All components mapping with path for internal routes
import {lazy} from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Account = lazy(() => import('../pages/protected/Account'))
const AdRegistration = lazy(() => import('../pages/protected/AdRegistration'))
const AdBulkRegistration = lazy(() => import('../pages/protected/AdBulkRegistration'))
// const AdManagement = lazy(() => import('../pages/protected/AdManagement'))
const AdPending = lazy(() => import('../pages/protected/AdPending'))
const AdComplete = lazy(() => import('../pages/protected/AdComplete'))
const AdEnd = lazy(() => import('../pages/protected/AdEnd'))
const AdStatistics = lazy(() => import('../pages/protected/AdStatistics'))
const AdFilter = lazy(() => import('../pages/protected/AdFilter'))
// const Cash = lazy(() => import('../pages/protected/Cash'))
const CashCharge = lazy(() => import('../pages/protected/CashCharge'))
const ChargeHistory = lazy(() => import('../pages/protected/ChargeHistory'))

const Adjustment = lazy(() => import('../pages/protected/Adjustment'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))

const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/account',
        component: Account,
    },
    {
        path: '/ad-registration',
        component: AdRegistration,
    },
    {
        path: '/ad-registration/:id',
        component: AdRegistration,
    },
    {
        path: '/ad-bulk-reg',
        component: AdBulkRegistration,
    },
    {
        path: '/ad-pending',
        component: AdPending,
    },
    {
        path: '/ad-complete',
        component: AdComplete,
    },
    {
        path: '/ad-end',
        component: AdEnd,
    },
    {
        path: '/ad-statistics',
        component: AdStatistics,
    },
    {
        path: '/cash-charge',
        component: CashCharge,
    },
    {
        path: '/charge-history',
        component: ChargeHistory,
    },
    {
        path: '/adjustment',
        component: Adjustment,
    },
    {
        path: '/add-filter',
        component: AdFilter,
    },
    {
        path: '/404',
        component: Page404,
    },
    {
        path: '/blank',
        component: Blank,
    },
]

export default routes