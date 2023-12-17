import styles from "./datepicker-calendar.module.css"
import {useEffect, useState} from "react";

import {CalendarProps} from "../datepicker-input/datepicker-input.tsx";

import {
    months,
    getMonthIndexByName,
    getMonthNowIndex,
    getDaysOfMonthNow,
    getMonthNameByIndex,
    getYearNow,
    getDateNow,
    getFirstDayOfMonthNow
} from "../utility/dateUtility.ts";

const DatepickerCalendar = ({newDate, newMonth, newYear, setInputDate, onUpdateCalendar}: CalendarProps) => {

    const [currentMonthIndex, setCurrentMonthIndex] = useState(getMonthNowIndex);

    const [currentSelectedDate, setCurrentSelectedDate] = useState(0);
    const [currentSelectedMonth, setCurrentSelectedMonth] = useState(0);
    const [currentSelectedYear, setCurrentSelectedYear] = useState(0);

    const [currentMonthName, setCurrentMonthName] = useState(getMonthNameByIndex(currentMonthIndex))
    const [currentYear, setCurrentYear] = useState(getYearNow());

    const [monthDates, setMonthDates] = useState<number[]>([]);

    const handleYearMonthNavigation = (direction: number) => {

        const indexOutOfRange: boolean = currentMonthIndex + direction > months.length - 1;
        const indexBelowZero: boolean = currentMonthIndex + direction < 0;

        if (indexOutOfRange) {
            setCurrentMonthIndex(0);
            increaseYear();
        } else if (indexBelowZero) {
            setCurrentMonthIndex(months.length - 1);
            decreaseYear()
        } else {
            setCurrentMonthIndex(currentMonthIndex + direction);
        }
    }

    const dateGridSize = 42;
    const redrawDateGrid = () => {

        const monthDatesArr: number[] = [];

        let dayIterationIndex = 0;

        for (let i = 0; i < dateGridSize; i++) {

            const isBelowFirstDate =
                i < getFirstDayOfMonthNow(currentYear, currentMonthIndex);

            const isOutsideMonthDateRange =
                i > getDaysOfMonthNow(currentYear, currentMonthIndex) + getFirstDayOfMonthNow(currentYear, currentMonthIndex) - 1

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

    const increaseYear = () => {
        setCurrentYear(currentYear + 1);
    }

    const decreaseYear = () => {
        setCurrentYear(currentYear - 1);
    }

    useEffect(() => {
        setCurrentSelectedDate(newDate);
        setCurrentYear(newYear);
        setCurrentMonthIndex(newMonth);
    }, [newDate, newYear, newMonth]);

    useEffect(() => {
        setCurrentMonthName(getMonthNameByIndex(currentMonthIndex));
    }, [currentMonthIndex]);

    useEffect(() => {
        redrawDateGrid();
    }, [currentYear, currentMonthIndex]);

    const handleDateClick = (element: number) => {
        setInputDate(`${element}/${getMonthIndexByName(currentMonthName) + 1}/${currentYear}`)

        clearSelectionStyles();

        setCurrentSelectedDate(element);
        setCurrentSelectedMonth(getMonthIndexByName(currentMonthName));
        setCurrentSelectedYear(currentYear);

        onUpdateCalendar({
            newDate: element,
            newMonth: currentMonthIndex,
            newYear: currentYear,
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
                <div className={styles.yearmonth}>

                    <div className={styles.yearmonth__button_left}>
                        <img
                            className={styles.yearmonth__button}
                            src={'./src/assets/left-arrow.png'}
                            alt='<-'
                            onClick={() => handleYearMonthNavigation(-1)}
                        />

                    </div>

                    <p className={styles.yearmonth__text}> {currentMonthName} {currentYear} </p>

                    <div className={styles.yearmonth__button_right}>
                        <img
                            className={styles.yearmonth__button}
                            src={'./src/assets/right-arrow.png'}
                            alt='->'
                            onClick={() => handleYearMonthNavigation(1)}
                        />
                    </div>
                </div>

                <div className={styles.days}>
                    <p className={styles.day}> Su </p>
                    <p className={styles.day}> Mo </p>
                    <p className={styles.day}> Tu </p>
                    <p className={styles.day}> We </p>
                    <p className={styles.day}> Th </p>
                    <p className={styles.day}> Fr </p>
                    <p className={styles.day}> Sa </p>
                </div>

                <div className={styles.dates}>

                    {monthDates.length && monthDates.map((element: number) => (
                        <div key={Math.random()}>
                            {(() => {

                                if (element === 0) {
                                    return <p className={styles.date__empty}></p>;
                                } else if (element === getDateNow() &&
                                    currentYear === getYearNow() &&
                                    currentMonthName === months[getMonthNowIndex()]) {
                                    return <p
                                        className={`${styles.date} ${styles.date__now}`}
                                        onClick={(e) => {
                                            handleDateClick(element);
                                            e.currentTarget.classList.add(styles.date__selected);
                                        }}
                                    > {element} </p>;
                                } else if (element === currentSelectedDate &&
                                    getMonthIndexByName(currentMonthName) === currentSelectedMonth &&
                                    currentYear === currentSelectedYear) {
                                    return <p
                                        className={`${styles.date} ${styles.date__selected}`}
                                        onClick={(e) => {
                                            handleDateClick(element);
                                            e.currentTarget.classList.add(styles.date__selected);
                                        }}
                                    > {element} </p>;
                                } else {
                                    return <p
                                        className={styles.date}
                                        onClick={(e) => {
                                            handleDateClick(element);
                                            e.currentTarget.classList.add(styles.date__selected);
                                        }}
                                    >{element}</p>;
                                }
                            })()}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatepickerCalendar;