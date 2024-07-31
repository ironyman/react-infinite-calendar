'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var VirtualList = require('react-tiny-virtual-list');
var classNames = require('classnames');
var index = require('../utils/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var Years$1 = require('./Years.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var VirtualList__default = /*#__PURE__*/_interopDefaultLegacy(VirtualList);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var SPACING = 0;

var isDateDisabled = function isDateDisabled(_ref) {
  var date = _ref.date,
      min = _ref.min,
      minDate = _ref.minDate,
      max = _ref.max,
      maxDate = _ref.maxDate;
  return dateFnV2.isBefore(date, dateFnV2.startOfMonth(min)) || dateFnV2.isBefore(date, dateFnV2.startOfMonth(minDate)) || dateFnV2.isAfter(date, max) || dateFnV2.isAfter(date, maxDate);
};

var allowToSwitchYear = function allowToSwitchYear(_ref2) {
  var selected = _ref2.selected,
      year = _ref2.year,
      min = _ref2.min,
      minDate = _ref2.minDate,
      max = _ref2.max,
      maxDate = _ref2.maxDate;

  if (index.isRange(selected)) {
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
  if (index.isRange(selected)) {
    return {
      start: dateFnV2.startOfMonth(selected.start),
      end: dateFnV2.endOfMonth(selected.end)
    };
  } // remove time


  return {
    start: parse.parseDate(dateFnV2.format(selected, 'yyyy-MM-dd')),
    end: parse.parseDate(dateFnV2.format(selected, 'yyyy-MM-dd'))
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
      onSelect = _ref3$onSelect === void 0 ? index.emptyFn : _ref3$onSelect,
      _ref3$showMonths = _ref3.showMonths,
      showMonths = _ref3$showMonths === void 0 ? true : _ref3$showMonths,
      selected = _ref3.selected,
      years = _ref3.years;
  var selectedYearIndex = React.useMemo(function () {
    var yearsSliced = years.slice(0, years.length);
    return yearsSliced.indexOf(getSelected(selected).start.getFullYear());
  }, [selected, years]);
  var handleClick = React.useCallback(function (date, e) {
    onSelect(date, e, function (date) {
      return scrollToDate(date);
    });

    if (hideOnSelect) {
      window.requestAnimationFrame(function () {
        return setDisplay('days');
      });
    }
  }, [hideOnSelect, onSelect, scrollToDate, setDisplay]);
  var renderMonths = React.useCallback(function (year) {
    var months = index.getMonthsForYear(year, getSelected(selected).start.getDate());
    return /*#__PURE__*/React__default['default'].createElement("ol", null, months.map(function (date, index$1) {
      var _classNames;

      var isSelected = dateFnV2.isWithinRange(date, getSelected(selected).start, getSelected(selected).end);
      var isCurrentMonth = dateFnV2.isSameMonth(date, today);
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
      var isStart = dateFnV2.isSameMonth(date, selected.start);
      var isEnd = dateFnV2.isSameMonth(date, selected.end);
      return /*#__PURE__*/React__default['default'].createElement("li", Object.assign({
        key: index$1,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (!isDisabled) {
            handleClick(date, e);
          }
        },
        className: classNames__default['default'](Years$1['default'].month, (_classNames = {}, _defineProperty__default['default'](_classNames, Years$1['default'].selected, isSelected), _defineProperty__default['default'](_classNames, Years$1['default'].currentMonth, isCurrentMonth), _defineProperty__default['default'](_classNames, Years$1['default'].disabled, isDisabled), _defineProperty__default['default'](_classNames, Years$1['default'].range, !(isStart && isEnd)), _defineProperty__default['default'](_classNames, Years$1['default'].start, isStart), _defineProperty__default['default'](_classNames, Years$1['default'].betweenRange, dateFnV2.isWithinRange(date, selected.start, selected.end) && !isStart && !isEnd), _defineProperty__default['default'](_classNames, Years$1['default'].end, isEnd), _classNames)),
        style: style,
        title: index.isRange(selected) ? '' : "Set date to ".concat(dateFnV2.format(date, 'MMMM do, yyyy')),
        "data-month": "".concat(dateFnV2.format(date, 'yyyy-MM-dd'))
      }, handlers), /*#__PURE__*/React__default['default'].createElement("div", {
        className: Years$1['default'].selection,
        "data-month": "".concat(dateFnV2.format(date, 'yyyy-MM-dd'))
      }, dateFnV2.format(date, 'MMM', {
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

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: Years$1['default'].root,
    style: {
      color: theme.selectionColor,
      height: height + 40
    }
  }, /*#__PURE__*/React__default['default'].createElement(VirtualList__default['default'], {
    className: Years$1['default'].list,
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
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: index,
        className: classNames__default['default'](Years$1['default'].year, (_classNames2 = {}, _defineProperty__default['default'](_classNames2, Years$1['default'].active, !showMonths && isActive), _defineProperty__default['default'](_classNames2, Years$1['default'].currentYear, !showMonths && year === currentYear), _defineProperty__default['default'](_classNames2, Years$1['default'].withMonths, showMonths), _defineProperty__default['default'](_classNames2, Years$1['default'].first, index === 0), _defineProperty__default['default'](_classNames2, Years$1['default'].last, index === yearsSliced.length - 1), _classNames2)),
        onClick: function onClick(e) {
          return shouldAllowToSwitchYear && handleClick(new Date(year, 0, 1), e);
        },
        title: shouldAllowToSwitchYear ? "Set year to ".concat(year) : '',
        "data-year": year,
        style: _objectSpread__default['default'](_objectSpread__default['default']({}, style), {
          color: typeof theme.selectionColor === 'function' ? theme.selectionColor(new Date(year, 0, 1)) : theme.selectionColor
        })
      }, /*#__PURE__*/React__default['default'].createElement("label", null, /*#__PURE__*/React__default['default'].createElement("span", {
        style: !showMonths && year === currentYear ? {
          borderColor: theme.todayColor
        } : null
      }, year)), showMonths && renderMonths(year));
    }
  }));
};

exports.default = Years;
