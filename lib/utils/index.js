'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var getScrollbarSize = require('dom-helpers/scrollbarSize');
var dateFnV2 = require('./dateFnV2.js');
var recompose = require('recompose');
var dateFn = require('date-fns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var getScrollbarSize__default = /*#__PURE__*/_interopDefaultLegacy(getScrollbarSize);

var keyCodes = {
  command: 91,
  control: 17,
  down: 40,
  enter: 13,
  escape: 27,
  left: 37,
  right: 39,
  shift: 16,
  up: 38
};
/**
 * Given a year and a month, returns the rows for that month to be iterated over
 * @param {Number} year - the year number
 * @param {Number} month - the index of the month
 * @param {Number} weekStartsOn - the index of the first day of the week (from 0 to 6)
 * @return {Object} - Returns the first day of the month and the rows of that month
 */

function getMonth(year, month, weekStartsOn) {
  var rows = [];
  var monthDate = new Date(year, month, 1);
  var daysInMonth = dateFnV2.getDaysInMonth(monthDate);
  var weekEndsOn = getEndOfWeekIndex(weekStartsOn);
  var dow = dateFn.getDay(new Date(year, month, 1));
  var week = 0;

  for (var day = 1; day <= daysInMonth; day++) {
    if (!rows[week]) {
      rows[week] = [];
    }

    rows[week].push(day);

    if (dow === weekEndsOn) {
      week++;
    }

    dow = dow < 6 ? dow + 1 : 0;
  }

  return {
    date: monthDate,
    rows: rows
  };
}
function getWeek(yearStart, date, weekStartsOn) {
  var yearStartDate = typeof yearStart === 'number' ? new Date(yearStart, 0, 1) // 1st Jan of the Year
  : yearStart;
  return Math.ceil((Math.round((date - yearStartDate) / (60 * 60 * 24 * 1000)) + yearStartDate.getDay() + 1 - weekStartsOn) / 7);
}
/**
 * Get the number of weeks in a given month to be able to calculate the height of that month
 * @param {Number} year - the year number
 * @param {Number} month - the index of the month
 * @param {Number} weekStartsOn - the index of the first day of the week (from 0 to 6)
 * @param isLastDisplayedMonth
 * @return {Number} - Returns the number of weeks for the given month
 */

function getWeeksInMonth(month) {
  var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getFullYear();
  var weekStartsOn = arguments.length > 2 ? arguments[2] : undefined;
  var isLastDisplayedMonth = arguments.length > 3 ? arguments[3] : undefined;
  var weekEndsOn = getEndOfWeekIndex(weekStartsOn);
  var firstOfMonth = new Date(year, month, 1);
  var firstWeekNumber = getWeek(year, firstOfMonth, weekStartsOn);
  var lastOfMonth = new Date(year, month + 1, 0); // Last date of the Month

  var lastWeekNumber = getWeek(year, lastOfMonth, weekStartsOn);
  var rowCount = lastWeekNumber - firstWeekNumber; // If the last week contains 7 days, we need to add an extra row

  if (lastOfMonth.getDay() === weekEndsOn || isLastDisplayedMonth) {
    rowCount++;
  }

  return rowCount;
}
/**
 * Helper to find out what day the week ends on given the localized start of the week
 * @param {Number} weekStartsOn - the index of the first day of the week (from 0 to 6)
 * @return {Number} - Returns the index of the day the week ends on
 */

function getEndOfWeekIndex(weekStartsOn) {
  return weekStartsOn === 0 ? 6 : weekStartsOn - 1;
}

var ScrollSpeed = /*#__PURE__*/function () {
  function ScrollSpeed() {
    var _this = this;

    _classCallCheck__default['default'](this, ScrollSpeed);

    _defineProperty__default['default'](this, "clear", function () {
      _this.lastPosition = null;
      _this.delta = 0;
    });
  }

  _createClass__default['default'](ScrollSpeed, [{
    key: "getScrollSpeed",
    value: function getScrollSpeed(scrollOffset) {
      if (this.lastPosition != null) {
        this.delta = scrollOffset - this.lastPosition;
      }

      this.lastPosition = scrollOffset;
      clearTimeout(this._timeout);
      this._timeout = setTimeout(this.clear, 50);
      return this.delta;
    }
  }]);

  return ScrollSpeed;
}();
var scrollbarSize = getScrollbarSize__default['default']();
function emptyFn() {
  /* no-op */
}
function sanitizeDate(date, _ref) {
  var _ref$disabledDates = _ref.disabledDates,
      disabledDates = _ref$disabledDates === void 0 ? [] : _ref$disabledDates,
      _ref$disabledDays = _ref.disabledDays,
      disabledDays = _ref$disabledDays === void 0 ? [] : _ref$disabledDays,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate;

  // Selected date should not be disabled or outside the selectable range
  if (!date || disabledDates.some(function (disabledDate) {
    return dateFnV2.isSameDay(disabledDate, date);
  }) || disabledDays && disabledDays.indexOf(dateFn.getDay(date)) !== -1 || minDate && dateFnV2.isBefore(date, dateFnV2.startOfDay(minDate)) || maxDate && dateFnV2.isAfter(date, dateFnV2.endOfDay(maxDate))) {
    return null;
  }

  return date;
}
function getDateString(year, month, date) {
  return "".concat(year, "-").concat(('0' + (month + 1)).slice(-2), "-").concat(('0' + date).slice(-2));
}
function getMonthsForYear(year) {
  var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Array.apply(null, Array(12)).map(function (val, index) {
    var constrainedDay = Math.min(dateFnV2.getDaysInMonth(new Date(year, index, 1)), isNaN(day) ? 1 : day);
    return new Date(year, index, constrainedDay);
  });
}
var withImmutableProps = function withImmutableProps(props) {
  return recompose.withPropsOnChange(function () {
    return false;
  }, props);
};
function debounce(callback, wait) {
  var _this2 = this;

  var timeout = null;
  var callbackArgs = null;

  var later = function later() {
    return callback.apply(_this2, callbackArgs);
  };

  return function () {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function range(start, stop) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var i = 0; i < length; i++, start += step) {
    range[i] = start;
  }

  return range;
}
function isRange(date) {
  if (!date) {
    return false;
  }

  var start = date.start,
      end = date.end;
  return start !== undefined && end !== undefined;
}
function getValidSelection(selected, minDate, maxDate) {
  if (!isRange(selected)) {
    if (minDate && dateFnV2.isBefore(selected, minDate)) {
      return dateFnV2.format(minDate, 'yyyy-MM-dd');
    }

    if (maxDate && dateFnV2.isAfter(selected, maxDate)) {
      return dateFnV2.format(maxDate, 'yyyy-MM-dd');
    } // Needs to return date, but selected is string for some reason
    // return for react-infinite-calendar/src/Calendar/index.js


    return new Date(selected);
  }

  var start = selected.start,
      end = selected.end;

  if (minDate && dateFnV2.isBefore(start, minDate)) {
    start = dateFnV2.format(minDate, 'yyyy-MM-dd');
  }

  if (maxDate && dateFnV2.isAfter(end, maxDate)) {
    end = dateFnV2.format(maxDate, 'yyyy-MM-dd');
  }

  return {
    start: start,
    end: end
  };
}
function getSortedDate(start, end) {
  return dateFnV2.isBefore(start, end) ? {
    start: start,
    end: end
  } : {
    start: end,
    end: start
  };
} // Chunk function splits the array into %target number of equal sized chunks.

var chunk = function chunk(target, size) {
  return target.reduce(function (memo, value, index) {
    if (index % (target.length / size) === 0 && index !== 0) memo.push([]);
    memo[memo.length - 1].push(value);
    return memo;
  }, [[]]);
};

exports.ScrollSpeed = ScrollSpeed;
exports.chunk = chunk;
exports.debounce = debounce;
exports.emptyFn = emptyFn;
exports.getDateString = getDateString;
exports.getMonth = getMonth;
exports.getMonthsForYear = getMonthsForYear;
exports.getSortedDate = getSortedDate;
exports.getValidSelection = getValidSelection;
exports.getWeek = getWeek;
exports.getWeeksInMonth = getWeeksInMonth;
exports.isRange = isRange;
exports.keyCodes = keyCodes;
exports.range = range;
exports.sanitizeDate = sanitizeDate;
exports.scrollbarSize = scrollbarSize;
exports.withImmutableProps = withImmutableProps;
