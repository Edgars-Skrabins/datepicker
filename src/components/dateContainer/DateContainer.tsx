import {DateInfo} from "../datepickerCalendar/DatepickerCalendar.tsx";
import styles from './DateContainer.module.css'
import {getCurrentMonthIndex, getDateNow, getMonthIndexByName, getYearNow, months} from "../../utils/dateUtils.ts";

export type DateContainerProps = {
    dateInfo: DateInfo,
    currentDateIteration: number,
    onHandleDateClick: (date: number) => void,
}
const DateContainer = ({dateInfo, currentDateIteration, onHandleDateClick}: DateContainerProps) => {

    const isSelected = currentDateIteration === dateInfo.currentSelectedDate &&
        getMonthIndexByName(dateInfo.currentMonthName) === dateInfo.currentSelectedMonth &&
        dateInfo.currentYear === dateInfo.currentSelectedYear;

    const clearSelectionStyles = () => {
        const allSelected = document.querySelectorAll(`.${styles.date__selected}`);
        const selectedArray = Array.from(allSelected);

        selectedArray.forEach((e) => {
            e.classList.remove(styles.date__selected);
        });
    };

    return (
        <p
            className={`${styles.date}
         ${isSelected ? styles.date__selected : ''}
         ${currentDateIteration === 0 ? styles.date__empty : ''}
         ${
                currentDateIteration === getDateNow() &&
                dateInfo.currentYear === getYearNow() &&
                dateInfo.currentMonthName === months[getCurrentMonthIndex()]
                    ? styles.date__now
                    : ''
            }`}
            onClick={(e) => {
                clearSelectionStyles();
                onHandleDateClick(currentDateIteration);
                e.currentTarget.classList.add(styles.date__selected);
            }}
        >
            {currentDateIteration !== 0 && currentDateIteration}
        </p>
    );
};

export default DateContainer;