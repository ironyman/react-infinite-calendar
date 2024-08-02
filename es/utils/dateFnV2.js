import * as dateFn from 'date-fns';
export { getDay } from 'date-fns';
import { parseDate } from './parse.js';

var addDays = function addDays(date, amount) {
  return dateFn.addDays(parseDate(date), amount);
};
var addWeeks = function addWeeks(date, amount) {
  return dateFn.addWeeks(parseDate(date), amount);
};
var addMonths = function addMonths(date, amount) {
  return dateFn.addMonths(parseDate(date), amount);
};
var addYears = function addYears(date, amount) {
  return dateFn.addYears(parseDate(date), amount);
};
var isAfter = function isAfter(date, dateToCompare) {
  return dateFn.isAfter(parseDate(date), parseDate(dateToCompare));
};
var isBefore = function isBefore(date, dateToCompare) {
  return dateFn.isBefore(parseDate(date), parseDate(dateToCompare));
};
var isSameDay = function isSameDay(dateLeft, dateRight) {
  return dateFn.isSameDay(parseDate(dateLeft), parseDate(dateRight));
};
var isSameWeek = function isSameWeek(dateLeft, dateRight) {
  return dateFn.isSameWeek(parseDate(dateLeft), parseDate(dateRight));
};
var isSameMonth = function isSameMonth(dateLeft, dateRight) {
  return dateFn.isSameMonth(parseDate(dateLeft), parseDate(dateRight));
};
var isSameYear = function isSameYear(dateLeft, dateRight) {
  return dateFn.isSameYear(parseDate(dateLeft), parseDate(dateRight));
};
var startOfDay = function startOfDay(date) {
  return dateFn.startOfDay(parseDate(date));
};
var startOfWeek = function startOfWeek(date) {
  return dateFn.startOfWeek(parseDate(date));
};
var startOfMonth = function startOfMonth(date) {
  return dateFn.startOfMonth(parseDate(date));
};
var endOfDay = function endOfDay(date) {
  return dateFn.endOfDay(parseDate(date));
};
var endOfWeek = function endOfWeek(date) {
  return dateFn.endOfWeek(parseDate(date));
};
var endOfMonth = function endOfMonth(date) {
  return dateFn.endOfMonth(parseDate(date));
};
var getDaysInMonth = function getDaysInMonth(date) {
  return dateFn.getDaysInMonth(parseDate(date));
};
var getMonth = function getMonth(date) {
  return dateFn.getMonth(parseDate(date));
};
// Don't always want to format to localtime, otherwise it produces wrong result.

var format = function format(date, formatStr, options, localTime) {
  try {
    date = parseDate(date);
    var res;
    var dateLocal = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

    if (localTime) {
      res = dateFn.format(dateLocal, formatStr, options);
    } else {
      res = dateFn.format(date, formatStr, options);
    } // console.log(date, dateLocal, res);


    return res;
  } catch (error) {
    return 'Invalid Date';
  }
};
var isWithinRange = function isWithinRange(date, dateStart, dateEnd) {
  if (!dateStart || !dateEnd) {
    return false;
  }

  try {
    return dateFn.isWithinInterval(parseDate(date), {
      start: parseDate(dateStart),
      end: parseDate(dateEnd)
    });
  } catch (error) {
    return false;
  }
};
var min = function min() {
  for (var _len = arguments.length, dates = new Array(_len), _key = 0; _key < _len; _key++) {
    dates[_key] = arguments[_key];
  }

  return dateFn.min(dates.map(parseDate));
};
var max = function max() {
  for (var _len2 = arguments.length, dates = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    dates[_key2] = arguments[_key2];
  }

  return dateFn.max(dates.map(parseDate));
};

export { addDays, addMonths, addWeeks, addYears, endOfDay, endOfMonth, endOfWeek, format, getDaysInMonth, getMonth, isAfter, isBefore, isSameDay, isSameMonth, isSameWeek, isSameYear, isWithinRange, max, min, startOfDay, startOfMonth, startOfWeek };
