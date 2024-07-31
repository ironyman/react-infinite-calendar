import * as dateFn from 'date-fns';
import { parseDate } from './parse';
export { getDay } from 'date-fns';

// --- fns only need to parseDates
export const addMinutes = (date, amount) =>
  dateFn.addMinutes(parseDate(date), amount);
export const addHours = (date, amount) =>
  dateFn.addHours(parseDate(date), amount);
export const addDays = (date, amount) =>
  dateFn.addDays(parseDate(date), amount);
export const addWeeks = (date, amount) =>
  dateFn.addWeeks(parseDate(date), amount);
export const addMonths = (date, amount) =>
  dateFn.addMonths(parseDate(date), amount);
export const addQuarters = (date, amount) =>
  dateFn.addQuarters(parseDate(date), amount);
export const addYears = (date, amount) =>
  dateFn.addYears(parseDate(date), amount);

export const subDays = (date, amount) =>
  dateFn.subDays(parseDate(date), amount);
export const subMonths = (date, amount) =>
  dateFn.subMonths(parseDate(date), amount);
export const subWeeks = (date, amount) =>
  dateFn.subWeeks(parseDate(date), amount);
export const subYears = (date, amount) =>
  dateFn.subYears(parseDate(date), amount);

export const differenceInSeconds = (dateLeft, dateRight) =>
  dateFn.differenceInSeconds(parseDate(dateLeft), parseDate(dateRight));
export const differenceInHours = (dateLeft, dateRight) =>
  dateFn.differenceInHours(parseDate(dateLeft), parseDate(dateRight));
export const differenceInDays = (dateLeft, dateRight) =>
  dateFn.differenceInDays(parseDate(dateLeft), parseDate(dateRight));
export const differenceInWeeks = (dateLeft, dateRight) =>
  dateFn.differenceInWeeks(parseDate(dateLeft), parseDate(dateRight));
export const differenceInMonths = (dateLeft, dateRight) =>
  dateFn.differenceInMonths(parseDate(dateLeft), parseDate(dateRight));
export const differenceInQuarters = (dateLeft, dateRight) =>
  dateFn.differenceInQuarters(parseDate(dateLeft), parseDate(dateRight));
export const differenceInYears = (dateLeft, dateRight) =>
  dateFn.differenceInYears(parseDate(dateLeft), parseDate(dateRight));
export const differenceInCalendarDays = (dateLeft, dateRight) =>
  dateFn.differenceInCalendarDays(parseDate(dateLeft), parseDate(dateRight));
export const differenceInCalendarMonths = (dateLeft, dateRight) =>
  dateFn.differenceInCalendarMonths(parseDate(dateLeft), parseDate(dateRight));
export const differenceInCalendarWeeks = (dateLeft, dateRight) =>
  dateFn.differenceInCalendarWeeks(parseDate(dateLeft), parseDate(dateRight));

export const isAfter = (date, dateToCompare) =>
  dateFn.isAfter(parseDate(date), parseDate(dateToCompare));
export const isBefore = (date, dateToCompare) =>
  dateFn.isBefore(parseDate(date), parseDate(dateToCompare));
export const isEqual = (dateLeft, dateRight) =>
  dateFn.isEqual(parseDate(dateLeft), parseDate(dateRight));
export const isSameDay = (dateLeft, dateRight) =>
  dateFn.isSameDay(parseDate(dateLeft), parseDate(dateRight));
export const isSameWeek = (dateLeft, dateRight) =>
  dateFn.isSameWeek(parseDate(dateLeft), parseDate(dateRight));
export const isSameMonth = (dateLeft, dateRight) =>
  dateFn.isSameMonth(parseDate(dateLeft), parseDate(dateRight));
export const isSameQuarter = (dateLeft, dateRight) =>
  dateFn.isSameQuarter(parseDate(dateLeft), parseDate(dateRight));
export const isSameYear = (dateLeft, dateRight) =>
  dateFn.isSameYear(parseDate(dateLeft), parseDate(dateRight));

export const startOfHour = (date) => dateFn.startOfHour(parseDate(date));
export const startOfDay = (date) => dateFn.startOfDay(parseDate(date));
export const startOfWeek = (date) => dateFn.startOfWeek(parseDate(date));
export const startOfMonth = (date) => dateFn.startOfMonth(parseDate(date));
export const startOfQuarter = (date) => dateFn.startOfQuarter(parseDate(date));
export const startOfYear = (date) => dateFn.startOfYear(parseDate(date));

export const endOfHour = (date) => dateFn.endOfHour(parseDate(date));
export const endOfDay = (date) => dateFn.endOfDay(parseDate(date));
export const endOfWeek = (date) => dateFn.endOfWeek(parseDate(date));
export const endOfMonth = (date) => dateFn.endOfMonth(parseDate(date));
export const endOfQuarter = (date) => dateFn.endOfQuarter(parseDate(date));
export const endOfYear = (date) => dateFn.endOfYear(parseDate(date));

export const getTime = (date) => dateFn.getTime(parseDate(date));
export const isValid = (date) => dateFn.isValid(parseDate(date));
export const getDate = (date) => dateFn.getDate(parseDate(date));
export const getDaysInYear = (date) => dateFn.getDaysInYear(parseDate(date));
export const getDaysInMonth = (date) => dateFn.getDaysInMonth(parseDate(date));
export const getMonth = (date) => dateFn.getMonth(parseDate(date));

export const setDate = (date, dayOfMonth) =>
  dateFn.setDate(parseDate(date), dayOfMonth);
export const setMonth = (date, month) =>
  dateFn.setMonth(parseDate(date), month);

export const isSaturday = (date) => dateFn.isSaturday(parseDate(date));
export const isSunday = (date) => dateFn.isSunday(parseDate(date));
export const isToday = (date) => dateFn.isToday(parseDate(date));
export const isLastDayOfMonth = (date) =>
  dateFn.isLastDayOfMonth(parseDate(date));

// --- fns fns needs convert params in another format
export const format = (date, formatStr, options) => {
  try {
    date = parseDate(date);
    let dateLocal = new Date(
      date.valueOf() + date.getTimezoneOffset() * 60 * 1000
    );
    return dateFn.format(dateLocal, formatStr, options);
  } catch (error) {
    return 'Invalid Date';
  }
};

export const isWithinRange = (date, dateStart, dateEnd) => {
  if (!dateStart || !dateEnd) {
    return false;
  }
  try {
    return dateFn.isWithinInterval(parseDate(date), {
      start: parseDate(dateStart),
      end: parseDate(dateEnd),
    });
  } catch (error) {
    return false;
  }
};

export const areRangesOverlapping = (
  date1Start,
  date1End,
  date2Start,
  date2End
) =>
  dateFn.areIntervalsOverlapping(
    {
      start: parseDate(date1Start),
      end: parseDate(date1End),
    },
    {
      start: parseDate(date2Start),
      end: parseDate(date2End),
    }
  );
export const min = (...dates) => dateFn.min(dates.map(parseDate));

export const max = (...dates) => dateFn.max(dates.map(parseDate));
