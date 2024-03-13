import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    define: {
        MODAL_BODY_TYPES: {
            CONFIRMATION: "CONFIRMATION",
            CREATE: "CREATE",
            PAYMENT_INFO: "PAYMENT_INFO",
            PAYMENT_INFO_DETAIL: "PAYMENT_INFO_DETAIL",
            MODIFY: "MODIFY",
            ADJUSTMENT: "ADJUSTMENT",
            APPROVE: "APPROVE",
            APPROVE_DATA: "APPROVE_DATA",
            IMAGE_VIEW: "IMAGE_VIEW",
            CASH_LIST: "CASH_LIST",
            STATISTIC: "STATISTIC",
            DEFAULT: "",
        },

        RIGHT_DRAWER_TYPES: {
            NOTIFICATION: "NOTIFICATION",
            CALENDAR_EVENTS: "CALENDAR_EVENTS",
            MEETING_ROOM_CALENDAR: "MEETING_ROOM_CALENDAR",
            YOGA_RESERVATION: "YOGA_RESERVATION",
        },

        CALENDAR_EVENT_STYLE: {
            "BLUE": "bg-blue-200 dark:bg-blue-600 dark:text-blue-100",
            "GREEN": "bg-green-200 dark:bg-green-600 dark:text-green-100",
            "PURPLE": "bg-purple-200 dark:bg-purple-600 dark:text-purple-100",
            "ORANGE": "bg-orange-200 dark:bg-orange-600 dark:text-orange-100",
            "PINK": "bg-pink-200 dark:bg-pink-600 dark:text-pink-100",
            "MORE": "hover:underline cursor-pointer font-medium "
        },
    }
})