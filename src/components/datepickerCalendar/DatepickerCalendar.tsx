import styles from "./DatepickerCalendar.module.css"
import {useEffect, useState} from "react";

import {
    months,
    getMonthIndexByName,
    getMonthNowIndex,
    getDaysOfMonthNow,
    getMonthNameByIndex,
    getYearNow,
    getDateNow,
    getFirstDayOfMonthNow
} from "../../utility/dateUtility.ts";
import DatepickerCalendarNavigation from "../datepickerCalendar-navigation/DatepickerCalendar-Navigation.tsx";

export type CalendarProps = {
    newDate: number,
    newMonth: number,
    newYear: number,
    isMondayFirst:boolean,

    setInputDate: (date: string) => void;
    onUpdateCalendar: (newCalendar: CalendarProps) => void;

}

const daysSunFirst = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
]

const daysMonFirst = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su',
]

const DatepickerCalendar = ({newDate, newMonth, newYear, isMondayFirst, setInputDate, onUpdateCalendar}: CalendarProps) => {

    const [currentMonthIndex, setCurrentMonthIndex] = useState(getMonthNowIndex);

    const [dateInfo, setDateInfo] = useState({
        currentSelectedDate: newDate,
        currentSelectedMonth: newMonth,
        currentSelectedYear: newYear,
        currentMonthName: getMonthNameByIndex(currentMonthIndex),
        currentYear: getYearNow()
    });

    const [monthDates, setMonthDates] = useState<number[]>([]);

    const handleYearMonthNavigation = (direction: number) => {

        const indexOutOfRange: boolean = currentMonthIndex + direction > months.length - 1;
        const indexBelowZero: boolean = currentMonthIndex + direction < 0;

        if (indexOutOfRange) {
            setCurrentMonthIndex(0);
            incrementYear();
        } else if (indexBelowZero) {
            setCurrentMonthIndex(months.length - 1);
            decrementYear()
        } else {
            setCurrentMonthIndex(currentMonthIndex + direction);
        }
    }

    const dateGridSize = 42;
    const redrawDateGrid = () => {

        const monthDatesArr: number[] = [];
        let dayIterationIndex = 0;

        for (let i = 0; i < dateGridSize; i++) {

            let isBelowFirstDate:boolean;
            let isOutsideMonthDateRange:boolean;

            if(isMondayFirst)
            {
                isBelowFirstDate = i < getFirstDayOfMonthNow(dateInfo.currentYear, currentMonthIndex) - 1;
                isOutsideMonthDateRange =
                    i > getDaysOfMonthNow(dateInfo.currentYear, currentMonthIndex) +
                    getFirstDayOfMonthNow(dateInfo.currentYear, currentMonthIndex) - 2;
            }
            else{
                isBelowFirstDate = i < getFirstDayOfMonthNow(dateInfo.currentYear, currentMonthIndex);
                isOutsideMonthDateRange =
                    i > getDaysOfMonthNow(dateInfo.currentYear, currentMonthIndex) +
                    getFirstDayOfMonthNow(dateInfo.currentYear, currentMonthIndex) - 1;
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
            currentSelectedDate: newDate,
            currentYear: newYear
        }));
        setCurrentMonthIndex(newMonth);
    }

    useEffect(() => {
        updateCalendarOnInput();
    }, [newDate, newYear, newMonth]);

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

        clearSelectionStyles();

        setDateInfo(prevDateInfo => ({
            ...prevDateInfo,
            currentSelectedDate: element,
            currentSelectedMonth: getMonthIndexByName(prevDateInfo.currentMonthName),
            currentSelectedYear: prevDateInfo.currentYear
        }));

        onUpdateCalendar({
            newDate: element,
            newMonth: currentMonthIndex,
            newYear: dateInfo.currentYear,
            isMondayFirst: isMondayFirst,
            setInputDate: setInputDate,
            onUpdateCalendar: onUpdateCalendar,
        });
    }

    const clearSelectionStyles = () => {
        const allSelected = document.querySelectorAll(`.${styles.date__selected}`);
        const selectedArray = Array.from(allSelected);

        selectedArray.forEach((e) => {
            e.classList.remove(styles.date__selected);
        });
    };

    return (
        <>
            <div className={styles.calendar__container}>

                <DatepickerCalendarNavigation
                    monthName={dateInfo.currentMonthName}
                    year={dateInfo.currentYear}
                    onLeftArrowClick={() => handleYearMonthNavigation(-1)}
                    onRightArrowClick={() => handleYearMonthNavigation(1)}
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
                        <div key={Math.random()}>
                            {(() => {
                                const isSelected = currentDateIteration === dateInfo.currentSelectedDate &&
                                    getMonthIndexByName(dateInfo.currentMonthName) === dateInfo.currentSelectedMonth &&
                                    dateInfo.currentYear === dateInfo.currentSelectedYear;

                                return (
                                    <p
                                        className={`${styles.date} 
                                            ${isSelected ? styles.date__selected : ''} 
                                            ${currentDateIteration === 0 ? styles.date__empty : ''} 
                                            ${
                                            currentDateIteration === getDateNow() &&
                                            dateInfo.currentYear === getYearNow() &&
                                            dateInfo.currentMonthName === months[getMonthNowIndex()]
                                                ? styles.date__now
                                                : ''
                                        }`}
                                        onClick={(e) => {
                                            handleDateClick(currentDateIteration);
                                            e.currentTarget.classList.add(styles.date__selected);
                                        }}
                                    >
                                        {currentDateIteration !== 0 && currentDateIteration}
                                    </p>
                                );
                            })()}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatepickerCalendar;