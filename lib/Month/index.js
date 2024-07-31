'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var classNames = require('classnames');
var index = require('../utils/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var Month$2 = require('./Month.scss.js');
var Day = require('../Day/Day.scss.js');
var dateFn = require('date-fns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var Row = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var _classNames;

  var isPartialRow = _ref.isPartialRow,
      label = _ref.label,
      edge = _ref.edge,
      height = _ref.height,
      days = _ref.days;
  return /*#__PURE__*/React__default['default'].createElement("ul", {
    className: classNames__default['default'](Month$2['default'].row, (_classNames = {}, _defineProperty__default['default'](_classNames, Month$2['default'].partial, isPartialRow), _defineProperty__default['default'](_classNames, Day['default'].edge, edge), _classNames)),
    style: {
      height: height
    },
    role: "row",
    "aria-label": label
  }, days);
});

var Month = function Month(_ref2) {
  var _classNames2;

  var locale = _ref2.locale,
      showOverlay = _ref2.showOverlay,
      style = _ref2.style,
      DayComponent = _ref2.DayComponent,
      disabledDates = _ref2.disabledDates,
      disabledDays = _ref2.disabledDays,
      monthDate = _ref2.monthDate,
      maxDate = _ref2.maxDate,
      minDate = _ref2.minDate,
      rowHeight = _ref2.rowHeight,
      rows = _ref2.rows,
      selected = _ref2.selected,
      today = _ref2.today,
      theme = _ref2.theme,
      passThrough = _ref2.passThrough;
  var renderRows = React.useCallback(function () {
    var currentYear = today.getFullYear();
    var year = monthDate.getFullYear();
    var month = monthDate.getMonth();
    var monthShort = dateFnV2.format(monthDate, 'MMM', {
      locale: locale === null || locale === void 0 ? void 0 : locale.locale
    });
    var monthRows = [];
    var day = 0;
    var isDisabled = false;
    var isToday = false;

    var _ref3 = passThrough.Day || {},
        isWeeklySelection = _ref3.isWeeklySelection;

    var start = selected.start,
        end = selected.end;

    if (isWeeklySelection) {
      start = dateFnV2.format(dateFnV2.startOfWeek(start), 'yyyy-MM-dd');
      end = dateFnV2.format(dateFnV2.endOfWeek(end), 'yyyy-MM-dd');
    }

    var edgeRows = {};
    var date, days, dow, row; // Used for faster comparisons

    var _today = dateFnV2.format(today, 'yyyy-MM-dd');

    var _minDate = dateFnV2.format(minDate, 'yyyy-MM-dd');

    var _maxDate = dateFnV2.format(maxDate, 'yyyy-MM-dd'); // disable partial weeks for weekly selection


    if (isWeeklySelection) {
      var weekStartOfMin = dateFnV2.startOfWeek(minDate);

      if (!dateFnV2.isSameDay(minDate, weekStartOfMin)) {
        _minDate = dateFnV2.format(dateFnV2.addWeeks(weekStartOfMin, 1), 'yyyy-MM-dd');
      }

      var weekEndOfMax = dateFnV2.endOfWeek(maxDate);

      if (!dateFnV2.isSameDay(maxDate, weekEndOfMax)) {
        _maxDate = dateFnV2.format(dateFnV2.addWeeks(weekEndOfMax, -1), 'yyyy-MM-dd');
      }
    } // Oh the things we do in the name of performance...


    for (var i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      dow = dateFn.getDay(new Date(year, month, row[0]));

      for (var k = 0, _len = row.length; k < _len; k++) {
        day = row[k];
        date = index.getDateString(year, month, day);
        isToday = date === _today;

        if (isWeeklySelection) {
          edgeRows[i] = dateFnV2.isSameWeek(start, date) || dateFnV2.isSameWeek(end, date);
        }

        isDisabled = minDate && date < _minDate || maxDate && date > _maxDate || disabledDays && disabledDays.length && disabledDays.indexOf(dow) !== -1 || disabledDates && disabledDates.length && disabledDates.indexOf(date) !== -1;
        days[k] = /*#__PURE__*/React__default['default'].createElement(DayComponent, Object.assign({
          key: "day-".concat(day),
          currentYear: currentYear,
          date: date,
          day: day,
          selected: selected,
          isDisabled: isDisabled,
          isToday: isToday,
          locale: locale,
          month: month,
          monthShort: monthShort,
          theme: theme,
          year: year
        }, passThrough.Day));
        dow += 1;
      }

      monthRows[i] = /*#__PURE__*/React__default['default'].createElement(Row, {
        isPartialRow: row.length !== 7,
        key: "Row-".concat(i),
        label: "Week ".concat(i + 1),
        edge: edgeRows[i],
        height: rowHeight,
        days: days
      });
    }

    return monthRows;
  }, [disabledDates, disabledDays, locale, maxDate, minDate, monthDate, passThrough.Day, rowHeight, rows, selected, theme, today]);
  var dateFormat = dateFnV2.isSameYear(monthDate, today) ? 'MMMM' : 'MMMM yyyy';
  var month = dateFnV2.getMonth(monthDate);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: classNames__default['default'](Month$2['default'].root, (_classNames2 = {}, _defineProperty__default['default'](_classNames2, Month$2['default'].even, month % 2 === 0), _defineProperty__default['default'](_classNames2, Month$2['default'].odd, month % 2 === 1), _classNames2)),
    style: _objectSpread__default['default'](_objectSpread__default['default']({}, style), {}, {
      lineHeight: "".concat(rowHeight, "px")
    })
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: Month$2['default'].rows
  }, renderRows(), showOverlay && /*#__PURE__*/React__default['default'].createElement("label", {
    className: classNames__default['default'](Month$2['default'].label, _defineProperty__default['default']({}, Month$2['default'].partialFirstRow, rows[0].length !== 7)),
    style: {
      backgroundColor: theme.overlayColor
    }
  }, /*#__PURE__*/React__default['default'].createElement("span", null, dateFnV2.format(monthDate, dateFormat, {
    locale: locale === null || locale === void 0 ? void 0 : locale.locale
  })))));
};

var Month$1 = /*#__PURE__*/React.memo(Month);

exports.default = Month$1;
