export const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const getMonthNameByIndex = (index: number): string => {
    return months[index];
}

export const getMonthIndexByName = (monthName: string): number => {
    const month = months.indexOf(monthName)
    return month;
}

export const getYearNow = (): number => {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);

    return currentDate.getFullYear();
}

export const getDateNow = () => {
    const currentDate = new Date();
    return currentDate.getMonth() + 1;
};

export const getMonthNowIndex = (): number => {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);

    return currentDate.getMonth();
}

export const getDaysOfMonthNow = (year: number, currentMonthIndex: number) => {
    return new Date(year, currentMonthIndex + 1, 0).getDate();
}

export const getFirstDayOfMonthNow = (year: number, currentMonthIndex: number) => {
    return new Date(year, currentMonthIndex, 1).getDay();
}

