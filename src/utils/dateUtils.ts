export const daysSunFirst = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
]

export const daysMonFirst = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su',
]

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
    return months.indexOf(monthName);
}

export const getYearNow = (): number => {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    return currentDate.getFullYear();
}

export const getDateNow = () => {
    const currentDate = new Date();
    return currentDate.getDate();
};

export const getCurrentMonthIndex = (): number => {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    return currentDate.getMonth();
}

export const getDaysOfCurrentMonth = (year: number, currentMonthIndex: number) => {
    return new Date(year, currentMonthIndex + 1, 0).getDate();
}

export const getFirstDayOfCurrentMonth = (year: number, currentMonthIndex: number) => {
    return new Date(year, currentMonthIndex, 1).getDay();
}