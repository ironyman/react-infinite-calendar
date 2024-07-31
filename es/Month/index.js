import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import { getDateString } from '../utils/index.js';
import { format, startOfWeek, endOfWeek, isSameDay, addWeeks, isSameWeek, isSameYear, getMonth } from '../utils/dateFnV2.js';
import styles from './Month.scss.js';
import styles$1 from '../Day/Day.scss.js';
import { getDay } from 'date-fns';

var Row = /*#__PURE__*/React.memo(function (_ref) {
  var _classNames;

  var isPartialRow = _ref.isPartialRow,
      label = _ref.label,
      edge = _ref.edge,
      height = _ref.height,
      days = _ref.days;
  return /*#__PURE__*/React.createElement("ul", {
    className: classNames(styles.row, (_classNames = {}, _defineProperty(_classNames, styles.partial, isPartialRow), _defineProperty(_classNames, styles$1.edge, edge), _classNames)),
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
  var renderRows = useCallback(function () {
    var currentYear = today.getFullYear();
    var year = monthDate.getFullYear();
    var month = monthDate.getMonth();
    var monthShort = format(monthDate, 'MMM', {
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
      start = format(startOfWeek(start), 'yyyy-MM-dd');
      end = format(endOfWeek(end), 'yyyy-MM-dd');
    }

    var edgeRows = {};
    var date, days, dow, row; // Used for faster comparisons

    var _today = format(today, 'yyyy-MM-dd');

    var _minDate = format(minDate, 'yyyy-MM-dd');

    var _maxDate = format(maxDate, 'yyyy-MM-dd'); // disable partial weeks for weekly selection


    if (isWeeklySelection) {
      var weekStartOfMin = startOfWeek(minDate);

      if (!isSameDay(minDate, weekStartOfMin)) {
        _minDate = format(addWeeks(weekStartOfMin, 1), 'yyyy-MM-dd');
      }

      var weekEndOfMax = endOfWeek(maxDate);

      if (!isSameDay(maxDate, weekEndOfMax)) {
        _maxDate = format(addWeeks(weekEndOfMax, -1), 'yyyy-MM-dd');
      }
    } // Oh the things we do in the name of performance...


    for (var i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      dow = getDay(new Date(year, month, row[0]));

      for (var k = 0, _len = row.length; k < _len; k++) {
        day = row[k];
        date = getDateString(year, month, day);
        isToday = date === _today;

        if (isWeeklySelection) {
          edgeRows[i] = isSameWeek(start, date) || isSameWeek(end, date);
        }

        isDisabled = minDate && date < _minDate || maxDate && date > _maxDate || disabledDays && disabledDays.length && disabledDays.indexOf(dow) !== -1 || disabledDates && disabledDates.length && disabledDates.indexOf(date) !== -1;
        days[k] = /*#__PURE__*/React.createElement(DayComponent, Object.assign({
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

      monthRows[i] = /*#__PURE__*/React.createElement(Row, {
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
  var dateFormat = isSameYear(monthDate, today) ? 'MMMM' : 'MMMM yyyy';
  var month = getMonth(monthDate);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.root, (_classNames2 = {}, _defineProperty(_classNames2, styles.even, month % 2 === 0), _defineProperty(_classNames2, styles.odd, month % 2 === 1), _classNames2)),
    style: _objectSpread(_objectSpread({}, style), {}, {
      lineHeight: "".concat(rowHeight, "px")
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.rows
  }, renderRows(), showOverlay && /*#__PURE__*/React.createElement("label", {
    className: classNames(styles.label, _defineProperty({}, styles.partialFirstRow, rows[0].length !== 7)),
    style: {
      backgroundColor: theme.overlayColor
    }
  }, /*#__PURE__*/React.createElement("span", null, format(monthDate, dateFormat, {
    locale: locale === null || locale === void 0 ? void 0 : locale.locale
  })))));
};

var Month$1 = /*#__PURE__*/memo(Month);

export default Month$1;
