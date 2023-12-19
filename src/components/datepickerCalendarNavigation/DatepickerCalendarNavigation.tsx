import styles from "./DatepickerCalendarNavigation.module.css";
import leftArrowImage from "./assets/left-arrow.svg";
import rightArrowImage from "./assets/right-arrow.svg";
import {useEffect, useState} from "react";
import {getCurrentMonthIndex, months} from "../../utils/dateUtils.ts";

type DatepickerCalendarNavigationProps = {
    monthName: string,
    year: number,
    onIncrementYear: () => void,
    onDecrementYear: () => void,
    onCurrentMonthIndexChange: (newIndex: number) => void,
}

const DatepickerCalendarNavigation = ({monthName, year, onDecrementYear, onIncrementYear, onCurrentMonthIndexChange}: DatepickerCalendarNavigationProps) => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(getCurrentMonthIndex);

    const handleYearMonthNavigation = (direction: number) => {

        const indexOutOfRange: boolean = currentMonthIndex + direction > months.length - 1;
        const indexBelowZero: boolean = currentMonthIndex + direction < 0;

        if (indexOutOfRange) {
            setCurrentMonthIndex(0);
            onIncrementYear();
        } else if (indexBelowZero) {
            setCurrentMonthIndex(months.length - 1);
            onDecrementYear();
        } else {
            setCurrentMonthIndex(currentMonthIndex + direction);
        }
    }

    useEffect(() => {
        onCurrentMonthIndexChange(currentMonthIndex);
    }, [currentMonthIndex]);

    return (
        <div className={styles.yearmonth}>
            <div className={styles.yearmonth__button_left}>
                <img
                    className={styles.yearmonth__button}
                    src={leftArrowImage}
                    alt='<-'
                    onClick={() => handleYearMonthNavigation(1)}
                />
            </div>

            <p className={styles.yearmonth__text}> {monthName} {year} </p>

            <div className={styles.yearmonth__button_right}>
                <img
                    className={styles.yearmonth__button}
                    src={rightArrowImage}
                    alt='->'
                    onClick={() => handleYearMonthNavigation(-1)}
                />
            </div>
        </div>
    );
};

export default DatepickerCalendarNavigation;