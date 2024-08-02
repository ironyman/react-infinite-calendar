'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dateFn = require('date-fns');
var parse = require('./parse.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var dateFn__namespace = /*#__PURE__*/_interopNamespace(dateFn);

var addDays = function addDays(date, amount) {
  return dateFn__namespace.addDays(parse.parseDate(date), amount);
};
var addWeeks = function addWeeks(date, amount) {
  return dateFn__namespace.addWeeks(parse.parseDate(date), amount);
};
var addMonths = function addMonths(date, amount) {
  return dateFn__namespace.addMonths(parse.parseDate(date), amount);
};
var addYears = function addYears(date, amount) {
  return dateFn__namespace.addYears(parse.parseDate(date), amount);
};
var isAfter = function isAfter(date, dateToCompare) {
  return dateFn__namespace.isAfter(parse.parseDate(date), parse.parseDate(dateToCompare));
};
var isBefore = function isBefore(date, dateToCompare) {
  return dateFn__namespace.isBefore(parse.parseDate(date), parse.parseDate(dateToCompare));
};
var isSameDay = function isSameDay(dateLeft, dateRight) {
  return dateFn__namespace.isSameDay(parse.parseDate(dateLeft), parse.parseDate(dateRight));
};
var isSameWeek = function isSameWeek(dateLeft, dateRight) {
  return dateFn__namespace.isSameWeek(parse.parseDate(dateLeft), parse.parseDate(dateRight));
};
var isSameMonth = function isSameMonth(dateLeft, dateRight) {
  return dateFn__namespace.isSameMonth(parse.parseDate(dateLeft), parse.parseDate(dateRight));
};
var isSameYear = function isSameYear(dateLeft, dateRight) {
  return dateFn__namespace.isSameYear(parse.parseDate(dateLeft), parse.parseDate(dateRight));
};
var startOfDay = function startOfDay(date) {
  return dateFn__namespace.startOfDay(parse.parseDate(date));
};
var startOfWeek = function startOfWeek(date) {
  return dateFn__namespace.startOfWeek(parse.parseDate(date));
};
var startOfMonth = function startOfMonth(date) {
  return dateFn__namespace.startOfMonth(parse.parseDate(date));
};
var endOfDay = function endOfDay(date) {
  return dateFn__namespace.endOfDay(parse.parseDate(date));
};
var endOfWeek = function endOfWeek(date) {
  return dateFn__namespace.endOfWeek(parse.parseDate(date));
};
var endOfMonth = function endOfMonth(date) {
  return dateFn__namespace.endOfMonth(parse.parseDate(date));
};
var getDaysInMonth = function getDaysInMonth(date) {
  return dateFn__namespace.getDaysInMonth(parse.parseDate(date));
};
var getMonth = function getMonth(date) {
  return dateFn__namespace.getMonth(parse.parseDate(date));
};
// Don't always want to format to localtime, otherwise it produces wrong result.

var format = function format(date, formatStr, options, localTime) {
  try {
    date = parse.parseDate(date);
    var res;
    var dateLocal = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

    if (localTime) {
      res = dateFn__namespace.format(dateLocal, formatStr, options);
    } else {
      res = dateFn__namespace.format(date, formatStr, options);
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
    return dateFn__namespace.isWithinInterval(parse.parseDate(date), {
      start: parse.parseDate(dateStart),
      end: parse.parseDate(dateEnd)
    });
  } catch (error) {
    return false;
  }
};
var min = function min() {
  for (var _len = arguments.length, dates = new Array(_len), _key = 0; _key < _len; _key++) {
    dates[_key] = arguments[_key];
  }

  return dateFn__namespace.min(dates.map(parse.parseDate));
};
var max = function max() {
  for (var _len2 = arguments.length, dates = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    dates[_key2] = arguments[_key2];
  }

  return dateFn__namespace.max(dates.map(parse.parseDate));
};

Object.defineProperty(exports, 'getDay', {
  enumerable: true,
  get: function () {
    return dateFn.getDay;
  }
});
exports.addDays = addDays;
exports.addMonths = addMonths;
exports.addWeeks = addWeeks;
exports.addYears = addYears;
exports.endOfDay = endOfDay;
exports.endOfMonth = endOfMonth;
exports.endOfWeek = endOfWeek;
exports.format = format;
exports.getDaysInMonth = getDaysInMonth;
exports.getMonth = getMonth;
exports.isAfter = isAfter;
exports.isBefore = isBefore;
exports.isSameDay = isSameDay;
exports.isSameMonth = isSameMonth;
exports.isSameWeek = isSameWeek;
exports.isSameYear = isSameYear;
exports.isWithinRange = isWithinRange;
exports.max = max;
exports.min = min;
exports.startOfDay = startOfDay;
exports.startOfMonth = startOfMonth;
exports.startOfWeek = startOfWeek;
