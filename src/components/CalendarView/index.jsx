import { useEffect, useState } from "react";
import { ChevronLeftIcon,ChevronRightIcon,ArrowPathIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import lunar from "korean-lunar-calendar";

const THEME_BG = CALENDAR_EVENT_STYLE

function CalendarView({ calendarEvents, addNewEvent, openDayDetail, firstDayOfMonth, setFirstDayOfMonth }) {

    // console.log("test",test);

    const today           = moment().startOf('day')
    const weekdays        = [ "일", "월", "화", "수", "목", "금", "토" ];
    const colStartClasses = [ "col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7", ];

    const [ events, setEvents ]       = useState([])
    const [ currMonth, setCurrMonth ] = useState(() => moment(today).format("MMM-yyyy"));

    useEffect(() => {
        setEvents(calendarEvents)
    }, [ calendarEvents ])


    const allDaysInMonth = () => {
        let start = moment(firstDayOfMonth).startOf('week')
        let end   = moment(moment(firstDayOfMonth).endOf('month')).endOf('week')
        var days  = [];
        var day   = start;
        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days
    }

    const getEventsForCurrentDate = (date) => {
        let holiday = isHolidays(date);
        if (moment(date).day() === 6 || moment(date).day() === 0 || holiday) return [];
        let filteredEvents = events.filter((e) => {
            return moment(date).isBetween(e.startDate, e.endDate, 'day', '[]');
        })
        if (filteredEvents.length > 2) {
            let originalLength = filteredEvents.length
            filteredEvents     = filteredEvents.slice(0, 2)
            filteredEvents.push({ title: `${ originalLength - 2 } more`, theme: "MORE" })
        }
        return filteredEvents
    }

    const openAllEventsDetail = (date, e) => {
        if (e.theme !== "MORE") return 1
        let filteredEvents = events.filter((e) => {
            return moment(date).isBetween(e.startDate, e.endDate, 'day', '[]')
        }).map((e) => {
            return {
                title: `[${ e.User?.Team?.name }]${ e.User?.name } ${ ANNUAL_TYPE[e.type] }`, theme: e.User.Team.theme
            } //e.theme}
        })
        openDayDetail({ filteredEvents, title: moment(date).format("YYYY-MM-DD") })
    }

    const isToday = (date) => {
        return moment(date).isSame(moment(), 'day');
    }

    const isSunday = (date) => {
        return moment(date).day() === 0;
    }

    const isSaturday = (date) => {
        return moment(date).day() === 6;
    }

    const isDifferentMonth = (date) => {
        return moment(date).month() !== moment(firstDayOfMonth).month()
    }

    const getPrevMonth = () => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth)
        setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
    };

    const getCurrentMonth = () => {
        const firstDayOfCurrMonth = moment().startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth)
        setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
    };

    const getNextMonth = () => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth)
        setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
    };

    const isColorDark = (color) => {
        // Convert the hex color to RGB values
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);

        // Calculate the perceived brightness of the color
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Return true if the brightness is less than or equal to 128 (dark color)
        return brightness <= 128;
    };

    // 대체공휴일 및 공휴일
    const isHolidays = (day) => {
        // 양력
        let holidays = [
            { name: "신정", day: "01-01" },
            { name: "삼일절", day: "03-01" },
            { name: "어린이날", day: "05-05" },
            { name: "현충일", day: "06-06" },
            { name: "광복절", day: "08-15" },
            { name: "개천절", day: "10-03" },
            { name: "한글날", day: "10-09" },
            { name: "크리스마스", day: "12-25" },
        ]

        // 음력
        let lunarHolidays = [
            { name: " ", day: "12-30" },
            { name: "설날", day: "01-01" },
            { name: " ", day: "01-02" },
            { name: "석가탄신일", day: "04-08" },
            { name: " ", day: "08-14" },
            { name: "추석", day: "08-15" },
            { name: " ", day: "08-16" },
        ]

        let holiday = holidays.filter((e) => {
            return moment(day).format("MM-DD") === e.day;
        });

        let lunarHoliday = lunarHolidays.filter((e) => {
            const calendar = new lunar;
            calendar.setSolarDate(moment(day).year(), moment(day).month() + 1, moment(day).date());
            const lunarDate    = calendar.getLunarCalendar();
            const lunarMonth   = lunarDate.month;
            const lunarDay     = lunarDate.day;
            const lunarHoliday = `${ lunarMonth }-${ lunarDay }`;
            return moment(lunarHoliday).format("MM-DD") === e.day;
        });

        if (holiday.length > 0) return holiday[0].name; else if (lunarHoliday.length > 0) return lunarHoliday[0].name;
    }

    return (<>
        <div className="w-full bg-base-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex  justify-normal gap-2 sm:gap-4">
                    <button className="btn  btn-square btn-sm btn-ghost" onClick={ getPrevMonth }><ChevronLeftIcon
                        className="w-5 h-5"
                    /></button>
                    <div className="flex ">
                        <p className="font-semibold text-xl mx-1 my-0.5 text-center">
                            { moment(firstDayOfMonth).format("YYYY-MM").toString() }
                        </p>
                        <button className="btn  btn-sm btn-ghost btn-circle" onClick={ getCurrentMonth }>
                            <ArrowPathIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <button className="btn btn-square btn-sm btn-ghost" onClick={ getNextMonth }><ChevronRightIcon
                        className="w-5 h-5"
                    /></button>
                </div>
            </div>

            <div className="my-2 divider"/>
            <div className="grid grid-cols-7 place-items-center">
                { weekdays.map((day, key) => {
                    return (<p key={ key }
                               className={ `text-sm text-center ${ key === 0 && "text-red-500" } ${ key === 6 && "text-blue-500" }` }>
                        { day }
                    </p>);
                }) }
            </div>

            <div className="grid grid-cols-7 mt-1  place-items-center">
                { allDaysInMonth().map((day, idx) => {
                    return (<div key={ idx }
                                 className={ colStartClasses[moment(day).day()
                                                                        .toString()] + " border border-solid w-full h-28  " }>
                        <div className="flex justify-between items-center px-2">
                            <p className={ `inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300
                                ${ isSunday(day) && "text-red-500" } 
                                ${ isSaturday(day) && "text-blue-500" }
                                ${ isToday(day) && " bg-sky-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white" }
                                ${ isDifferentMonth(day) && " text-slate-400 dark:text-slate-600" }
                                ${ isHolidays(day) && "text-red-500 dark:text-red-400" }
                              ` }
                               onClick={ () => addNewEvent(day) }> { moment(day).format("D") }</p>
                            <p className="inline-block flex items-center justify-center mx-1 mt-1 text-xs text-gray-500 dark:text-white">{ isHolidays(day) }</p>
                        </div>
                        { getEventsForCurrentDate(day).map((e, k) => {
                            return <p key={ k }
                                      onClick={ () => openAllEventsDetail(day, e) }
                                      style={ {
                                          backgroundColor: e.User?.Team.theme || '',
                                          color          : isColorDark(e.User?.Team.theme || '') ? 'white' : 'black'
                                      } }
                                      className={ `text-xs px-2 mt-1 truncate  ${ THEME_BG[e.theme] || "" }` }>
                                { e.title }
                                { e.User && `[${ e.User?.Team?.name }]${ e.User?.name } ${ ANNUAL_TYPE[e.type] }` }
                            </p>
                        }) }
                    </div>);
                }) }
            </div>
        </div>
    </>)
}

export default CalendarView