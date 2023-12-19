import DatepickerInput from "../datepickerInput/DatepickerInput.tsx";
import styles from "./Datepicker.module.css"

type DatepickerProps = {
    onDateLog: (date: string) => void,
}

const Datepicker = ({onDateLog}: DatepickerProps) => {
    const logDate = (date: string) => {
        onDateLog(date);
    }

    return (
        <div className={styles.datepicker}>
            <DatepickerInput onDateUpdate={logDate} isMondayFirst={true}/>
        </div>
    );
};

export default Datepicker;