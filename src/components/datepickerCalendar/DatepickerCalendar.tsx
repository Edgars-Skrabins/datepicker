import styles from "./DatepickerCalendar.module.css"
import {useEffect, useState} from "react";
import DatepickerCalendarNavigation from "../datepickerCalendarNavigation/DatepickerCalendarNavigation.tsx";
import DateContainer from "../dateContainer/DateContainer.tsx";

import {
    getMonthIndexByName,
    getCurrentMonthIndex,
    getDaysOfCurrentMonth,
    getMonthNameByIndex,
    getYearNow,
    getFirstDayOfCurrentMonth, daysMonFirst, daysSunFirst
} from "../../utils/dateUtils.ts";

export type CalendarProps = {
    dateInputValue: number,
    monthInputValue: number,
    yearInputValue: number,
    isMondayFirst: boolean,
    setInputDate: (date: string) => void;
    onUpdateCalendar: (newCalendar: CalendarProps) => void;
}

export type DateInfo = {
    currentSelectedDate: number,
    currentSelectedMonth: number,
    currentSelectedYear: number,
    currentMonthName: string,
    currentYear: number,
}

const DatepickerCalendar = ({
                                dateInputValue,
                                monthInputValue,
                                yearInputValue,
                                isMondayFirst,
                                setInputDate,
                                onUpdateCalendar,
                            }: CalendarProps) => {

    const [currentMonthIndex, setCurrentMonthIndex] = useState(getCurrentMonthIndex);

    const [dateInfo, setDateInfo] = useState<DateInfo>({
        currentSelectedDate: dateInputValue,
        currentSelectedMonth: monthInputValue,
        currentSelectedYear: yearInputValue,
        currentMonthName: getMonthNameByIndex(currentMonthIndex),
        currentYear: getYearNow()
    });

    const [monthDates, setMonthDates] = useState<number[]>([]);

    const dateGridSize = 42;
    const redrawDateGrid = () => {

        const monthDatesArr: number[] = [];
        let dayIterationIndex = 0;

        for (let i = 0; i < dateGridSize; i++) {

            let isBelowFirstDate: boolean;
            let isOutsideMonthDateRange: boolean;

            if (isMondayFirst) {
                isBelowFirstDate = i < getFirstDayOfCurrentMonth(dateInfo.currentYear, currentMonthIndex) - 1;
                isOutsideMonthDateRange =
                    i > getDaysOfCurrentMonth(dateInfo.currentYear, currentMonthIndex) +
                    getFirstDayOfCurrentMonth(dateInfo.currentYear, currentMonthIndex) - 2;
            } else {
                isBelowFirstDate = i < getFirstDayOfCurrentMonth(dateInfo.currentYear, currentMonthIndex);
                isOutsideMonthDateRange =
                    i > getDaysOfCurrentMonth(dateInfo.currentYear, currentMonthIndex) +
                    getFirstDayOfCurrentMonth(dateInfo.currentYear, currentMonthIndex) - 1;
            }

            if (isBelowFirstDate || isOutsideMonthDateRange) {
                // Pushes empty window
                monthDatesArr.push(0);
            } else {
                // Pushes the currentSelectedDate window
                monthDatesArr.push(dayIterationIndex += 1);
            }
        }

        const lastRowStartLocation = 35;
        // Cleans up extra spaces
        if (monthDatesArr[lastRowStartLocation] === 0) {
            for (let i = 35; i < dateGridSize; i++) {
                monthDatesArr.pop();
            }
        }

        setMonthDates(monthDatesArr);
    }

    const incrementYear = () => {
        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentYear: prevDateInfo.currentYear + 1
        }));
    }

    const decrementYear = () => {
        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentYear: prevDateInfo.currentYear - 1
        }));
    }

    const updateCalendarOnInput = () => {
        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentSelectedDate: dateInputValue,
            currentYear: yearInputValue
        }));
        setCurrentMonthIndex(monthInputValue);
    }

    useEffect(() => {
        updateCalendarOnInput();
    }, [dateInputValue, yearInputValue, monthInputValue]);

    const updateCalendarOnCalendarNavigationInput = () => {
        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentMonthName: getMonthNameByIndex(currentMonthIndex)
        }));
        redrawDateGrid();
    }

    useEffect(() => {
        updateCalendarOnCalendarNavigationInput();
    }, [dateInfo.currentYear, currentMonthIndex]);

    const handleDateClick = (element: number) => {
        const paddedDate = element.toString().padStart(2, '0');
        const paddedMonth = (getMonthIndexByName(dateInfo.currentMonthName) + 1).toString().padStart(2, '0');

        setInputDate(`${paddedDate}/${paddedMonth}/${dateInfo.currentYear}`);

        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentSelectedDate: element,
            currentSelectedMonth: getMonthIndexByName(prevDateInfo.currentMonthName),
            currentSelectedYear: prevDateInfo.currentYear
        }));

        onUpdateCalendar({
            dateInputValue: element,
            monthInputValue: currentMonthIndex,
            yearInputValue: dateInfo.currentYear,
            isMondayFirst: isMondayFirst,
            setInputDate: setInputDate,
            onUpdateCalendar: onUpdateCalendar,
        });
    }

    return (
        <>
            <div className={styles.calendar__container}>
                <DatepickerCalendarNavigation
                    monthName={dateInfo.currentMonthName}
                    year={dateInfo.currentYear}
                    onDecrementYear={decrementYear}
                    onIncrementYear={incrementYear}
                    onCurrentMonthIndexChange={setCurrentMonthIndex}
                />
                <div className={styles.days}>
                    {isMondayFirst
                        ? daysMonFirst.map((day) => (
                            <abbr key={day} className={styles.day}>{day}</abbr>
                        ))
                        : daysSunFirst.map((day) => (
                            <abbr key={day} className={styles.day}>{day}</abbr>
                        ))}
                </div>

                <div className={styles.dates}>
                    {monthDates.length && monthDates.map((currentDateIteration: number) => (
                        <DateContainer
                            key={Math.random()}
                            dateInfo={dateInfo}
                            currentDateIteration={currentDateIteration}
                            onHandleDateClick={handleDateClick}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatepickerCalendar;