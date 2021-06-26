import {weekNumber} from 'weeknumber'

export function fromDateToYearWeek(date: Date): Number {
    const parts =
        date.getFullYear() * 100 +
        weekNumber(date)
    return parts
}

export function fromNumberToDate(dateAsNumber: Number) {

    Date()
}
