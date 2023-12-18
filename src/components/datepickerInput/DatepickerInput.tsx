import styles from "./DatepickerInput.module.css"
import {useRef, useState} from "react";
import DatepickerCalendar from "../datepickerCalendar/DatepickerCalendar.tsx";
import {CalendarProps} from "../datepickerCalendar/DatepickerCalendar.tsx";

import {
    getMonthNowIndex,
    getYearNow,
    getDateNow,
} from "../../utility/dateUtility.ts";



export type DatepickerInputProps = {
    onDateUpdate: (date: string) => void,

    isMondayFirst:boolean,
}

const DatepickerInput = ({onDateUpdate,isMondayFirst}: DatepickerInputProps) => {

    const [currentCalendar, setCurrentCalendar] = useState<CalendarProps[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    let dateInput = '';

    const handleInputClick = () => {

        if (currentCalendar.length) {
            setCurrentCalendar([]);
            return;
        }

        const newCalendar: CalendarProps = {
            newDate: getDateNow(),
            newMonth: getMonthNowIndex(),
            newYear: getYearNow(),
            isMondayFirst: isMondayFirst,

            setInputDate: setInputDate,
            onUpdateCalendar: updateCalendar,
        }

        updateCalendar(newCalendar)
    }

    const setInputDate = (newDate: string) => {
        if (inputRef.current) {
            inputRef.current.value = newDate;
        }
    }

    const setDateThroughInput = () => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (dateInput && datePattern.test(dateInput)) {
            const [date, month, year] = dateInput.split('/');

            const dateInt = parseInt(date, 10);
            const monthInt = parseInt(month, 10);
            const yearInt = parseInt(year, 10);

            const yearOutOfDateRange = yearInt > 9999 || yearInt < 100;

            if (yearOutOfDateRange) {
                return;
            }

            const newCalendar: CalendarProps = {
                newDate: dateInt,
                newMonth: monthInt,
                newYear: yearInt,
                isMondayFirst:isMondayFirst,

                setInputDate: setInputDate,
                onUpdateCalendar: updateCalendar,
            }


            updateCalendarCleared(newCalendar)
        }
    }

    const updateCalendar = (newCalendar: CalendarProps) => {

        if (currentCalendar.length > 0) {
            onDateUpdate(`${newCalendar.newDate}/${newCalendar.newMonth+ 1}/${newCalendar.newYear}`);
            return;
        }

        const newCalendarArr: CalendarProps[] = [];
        newCalendarArr.push(newCalendar);

        setCurrentCalendar(newCalendarArr);
    }

    const updateCalendarCleared = (newCalendar: CalendarProps) => {

        newCalendar.newMonth = newCalendar.newMonth - 1;

        const newCalendarArr: CalendarProps[] = [];
        newCalendarArr.push(newCalendar);
        setCurrentCalendar(newCalendarArr);
    }

    return (
        <>
            <div className={styles.container}>
                <label className={styles.label} htmlFor="dateInput"> Date: </label>
                <input
                    className={styles.inputField}
                    type="text"
                    maxLength={10}
                    name="dateInput"
                    ref={inputRef}
                    onChange={(e) => {
                        dateInput = e.currentTarget.value;
                        setDateThroughInput();
                    }}
                    onClick={handleInputClick}
                    onKeyDown={(e) => {
                        // Allow only numbers, "/", and backspace key
                        if (!/^\d$|^\/$/.test(e.key) && e.key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}
                />
            </div>

            {currentCalendar.map(({newDate, newMonth,isMondayFirst, newYear, setInputDate}) => (
                <DatepickerCalendar
                    key={Math.random()}
                    newDate={newDate}
                    newMonth={newMonth}
                    newYear={newYear}
                    isMondayFirst={isMondayFirst}
                    setInputDate={setInputDate}
                    onUpdateCalendar={updateCalendar}
                />
            ))}

        </>

    );
};

export default DatepickerInput;