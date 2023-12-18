import DatepickerInput from "../datepickerInput/DatepickerInput.tsx";

import styles from "./Datepicker.module.css"

type DatepickerProps ={
    onDateLog: (date:string) => void,
}

const Datepicker = ({onDateLog}:DatepickerProps) => {

    return (
        <div className={styles.datepicker}>
            <DatepickerInput onDateUpdate={onDateLog} isMondayFirst={true} />
        </div>
    );
};

export default Datepicker;