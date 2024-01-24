// --- Dependencies
import dayjs from 'dayjs'

// --- Date day
export const TimeDay = (format: string = 'DD MMM YYYY HH:mm:ss'): string =>
	dayjs().format(format)

// --- Date ISO
export const DateISO = (): string => dayjs().format()
