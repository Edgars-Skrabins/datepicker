import styles from "./DatepickerCalendar-Navigation.module.css";
import leftArrowImage from "../datepickerCalendar/assets/left-arrow.png";
import rightArrowImage from "../datepickerCalendar/assets/right-arrow.png";

export type DatepickerCalendarNavigationProps = {
    monthName:string,
    year:number,

    onRightArrowClick: () => void,
    onLeftArrowClick: () => void,
}

const DatepickerCalendarNavigation = ({monthName,year,onLeftArrowClick,onRightArrowClick}:DatepickerCalendarNavigationProps) => {
    return (
        <div className={styles.yearmonth}>
            <div className={styles.yearmonth__button_left}>
                <img
                    className={styles.yearmonth__button}
                    src={leftArrowImage}
                    alt='<-'
                    onClick={onLeftArrowClick}
                />
            </div>

            <p className={styles.yearmonth__text}> {monthName} {year} </p>

            <div className={styles.yearmonth__button_right}>
                <img
                    className={styles.yearmonth__button}
                    src={rightArrowImage}
                    alt='->'
                    onClick={onRightArrowClick}
                />
            </div>
        </div>
    );
};

export default DatepickerCalendarNavigation;