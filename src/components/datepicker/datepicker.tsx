import DatepickerInput from "./datepickerInput/datepickerInput.tsx";

import styles from "./datepicker.module.css"

const Datepicker = () => {

    const logDate = (date:string) => {
        console.log(`Date: ${date}`);
    }

    return (
        <div className={styles.datepicker}>
            <DatepickerInput onDateUpdate={logDate} />
        </div>
    );
};

export default Datepicker;