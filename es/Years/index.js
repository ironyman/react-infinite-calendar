import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { useMemo, useCallback } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import classNames from 'classnames';
import { getMonthsForYear, isRange, emptyFn } from '../utils/index.js';
import { isWithinRange, isSameMonth, isBefore, startOfMonth, isAfter, format, endOfMonth } from '../utils/dateFnV2.js';
import styles from './Years.scss.js';
import { parseDate } from '../utils/parse.js';

var SPACING = 0;

var isDateDisabled = function isDateDisabled(_ref) {
  var date = _ref.date,
      min = _ref.min,
      minDate = _ref.minDate,
      max = _ref.max,
      maxDate = _ref.maxDate;
  return isBefore(date, startOfMonth(min)) || isBefore(date, startOfMonth(minDate)) || isAfter(date, max) || isAfter(date, maxDate);
};

var allowToSwitchYear = function allowToSwitchYear(_ref2) {
  var selected = _ref2.selected,
      year = _ref2.year,
      min = _ref2.min,
      minDate = _ref2.minDate,
      max = _ref2.max,
      maxDate = _ref2.maxDate;

  if (isRange(selected)) {
    return false;
  }

  return !isDateDisabled({
    date: new Date(selected).setYear(year),
    min: min,
    minDate: minDate,
    max: max,
    maxDate: maxDate
  });
};

var getSelected = function getSelected(selected) {
  if (isRange(selected)) {
    return {
      start: startOfMonth(selected.start),
      end: endOfMonth(selected.end)
    };
  } // remove time


  return {
    start: parseDate(format(selected, 'yyyy-MM-dd')),
    end: parseDate(format(selected, 'yyyy-MM-dd'))
  };
};

var Years = function Years(_ref3) {
  var height = _ref3.height,
      hideOnSelect = _ref3.hideOnSelect,
      locale = _ref3.locale,
      max = _ref3.max,
      maxDate = _ref3.maxDate,
      min = _ref3.min,
      minDate = _ref3.minDate,
      scrollToDate = _ref3.scrollToDate,
      today = _ref3.today,
      setDisplay = _ref3.setDisplay,
      theme = _ref3.theme,
      handlers = _ref3.handlers,
      width = _ref3.width,
      _ref3$onSelect = _ref3.onSelect,
      onSelect = _ref3$onSelect === void 0 ? emptyFn : _ref3$onSelect,
      _ref3$showMonths = _ref3.showMonths,
      showMonths = _ref3$showMonths === void 0 ? true : _ref3$showMonths,
      selected = _ref3.selected,
      years = _ref3.years;
  var selectedYearIndex = useMemo(function () {
    var yearsSliced = years.slice(0, years.length);
    return yearsSliced.indexOf(getSelected(selected).start.getFullYear());
  }, [selected, years]);
  var handleClick = useCallback(function (date, e) {
    onSelect(date, e, function (date) {
      return scrollToDate(date);
    });

    if (hideOnSelect) {
      window.requestAnimationFrame(function () {
        return setDisplay('days');
      });
    }
  }, [hideOnSelect, onSelect, scrollToDate, setDisplay]);
  var renderMonths = useCallback(function (year) {
    var months = getMonthsForYear(year, getSelected(selected).start.getDate());
    return /*#__PURE__*/React.createElement("ol", null, months.map(function (date, index) {
      var _classNames;

      var isSelected = isWithinRange(date, getSelected(selected).start, getSelected(selected).end);
      var isCurrentMonth = isSameMonth(date, today);
      var isDisabled = isDateDisabled({
        date: date,
        min: min,
        minDate: minDate,
        max: max,
        maxDate: maxDate
      });
      var style = Object.assign({}, isSelected && {
        backgroundColor: typeof theme.selectionColor === 'function' ? theme.selectionColor(date) : theme.selectionColor
      }, isCurrentMonth && {
        borderColor: theme.todayColor
      });
      var isStart = isSameMonth(date, selected.start);
      var isEnd = isSameMonth(date, selected.end);
      return /*#__PURE__*/React.createElement("li", Object.assign({
        key: index,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (!isDisabled) {
            handleClick(date, e);
          }
        },
        className: classNames(styles.month, (_classNames = {}, _defineProperty(_classNames, styles.selected, isSelected), _defineProperty(_classNames, styles.currentMonth, isCurrentMonth), _defineProperty(_classNames, styles.disabled, isDisabled), _defineProperty(_classNames, styles.range, !(isStart && isEnd)), _defineProperty(_classNames, styles.start, isStart), _defineProperty(_classNames, styles.betweenRange, isWithinRange(date, selected.start, selected.end) && !isStart && !isEnd), _defineProperty(_classNames, styles.end, isEnd), _classNames)),
        style: style,
        title: isRange(selected) ? '' : "Set date to ".concat(format(date, 'MMMM do, yyyy')),
        "data-month": "".concat(format(date, 'yyyy-MM-dd'))
      }, handlers), /*#__PURE__*/React.createElement("div", {
        className: styles.selection,
        "data-month": "".concat(format(date, 'yyyy-MM-dd'))
      }, format(date, 'MMM', {
        locale: locale === null || locale === void 0 ? void 0 : locale.locale
      })));
    }));
  }, [handleClick, handlers, locale, max, maxDate, min, minDate, selected, theme, today]);
  var currentYear = today.getFullYear();
  var yearsSliced = years.slice(0, years.length);
  var rowHeight = showMonths ? 80 : 40;
  var heights = yearsSliced.map(function (val, index) {
    return index === 0 || index === yearsSliced.length - 1 ? rowHeight + SPACING : rowHeight;
  });
  var isYearLess = yearsSliced.length * rowHeight < height + 40;
  var containerHeight = isYearLess ? yearsSliced.length * rowHeight + 2 * SPACING : height + 40;
  var scrollOffset = 0;

  if (!isYearLess && selectedYearIndex !== -1) {
    var top = heights.slice(0, selectedYearIndex).reduce(function (acc, val) {
      return acc + val;
    }, 0);
    scrollOffset = top - containerHeight / 2 + 40;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.root,
    style: {
      color: theme.selectionColor,
      height: height + 40
    }
  }, /*#__PURE__*/React.createElement(VirtualList, {
    className: styles.list,
    width: width,
    height: containerHeight,
    itemCount: yearsSliced.length,
    estimatedItemSize: rowHeight,
    itemSize: function itemSize(index) {
      return heights[index];
    },
    scrollOffset: scrollOffset,
    renderItem: function renderItem(_ref4) {
      var _classNames2;

      var index = _ref4.index,
          style = _ref4.style;
      var year = yearsSliced[index];
      var isActive = index === selectedYearIndex;
      var shouldAllowToSwitchYear = allowToSwitchYear({
        selected: selected,
        year: year,
        min: min,
        minDate: minDate,
        max: max,
        maxDate: maxDate
      });
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: classNames(styles.year, (_classNames2 = {}, _defineProperty(_classNames2, styles.active, !showMonths && isActive), _defineProperty(_classNames2, styles.currentYear, !showMonths && year === currentYear), _defineProperty(_classNames2, styles.withMonths, showMonths), _defineProperty(_classNames2, styles.first, index === 0), _defineProperty(_classNames2, styles.last, index === yearsSliced.length - 1), _classNames2)),
        onClick: function onClick(e) {
          return shouldAllowToSwitchYear && handleClick(new Date(year, 0, 1), e);
        },
        title: shouldAllowToSwitchYear ? "Set year to ".concat(year) : '',
        "data-year": year,
        style: _objectSpread(_objectSpread({}, style), {
          color: typeof theme.selectionColor === 'function' ? theme.selectionColor(new Date(year, 0, 1)) : theme.selectionColor
        })
      }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
        style: !showMonths && year === currentYear ? {
          borderColor: theme.todayColor
        } : null
      }, year)), showMonths && renderMonths(year));
    }
  }));
};

export default Years;
