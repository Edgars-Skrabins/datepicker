import styles from "./datepicker-input.module.css"
import {useRef, useState} from "react";
import DatepickerCalendar from "../datepicker-calendar/datepicker-calendar.tsx";

import {
    getMonthNowIndex,
    getYearNow,
    getDateNow,
} from "../utility/dateUtility.ts";

export type CalendarProps = {
    newDate: number,
    newMonth: number,
    newYear: number,

    setInputDate: (date: string) => void;
    onUpdateCalendar: (newCalendar: CalendarProps) => void;

}

export type DatepickerInputProps = {
    onDateUpdate: (date: string) => void,
}

const DatepickerInput = ({onDateUpdate}: DatepickerInputProps) => {

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

    const validateDate = () => {
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
                        validateDate();
                    }}
                    onClick={handleInputClick}
                    onKeyDown={(e) => {
                        // Allow numbers, "/", and backspace key; prevent others
                        if (!/^\d$|^\/$/.test(e.key) && e.key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}
                />
            </div>

            {currentCalendar.map(({newDate, newMonth, newYear, setInputDate}) => (
                <DatepickerCalendar
                    key={Math.random()}
                    newDate={newDate}
                    newMonth={newMonth}
                    newYear={newYear}
                    setInputDate={setInputDate}
                    onUpdateCalendar={updateCalendar}
                />
            ))}

        </>

    );
};

export default DatepickerInput;