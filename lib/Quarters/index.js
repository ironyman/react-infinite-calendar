'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var VirtualList = require('react-tiny-virtual-list');
var classNames = require('classnames');
var index = require('../utils/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var quarters = require('./quarters.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
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
  return dateFnV2.isBefore(date, dateFnV2.startOfMonth(min)) || dateFnV2.isBefore(date, dateFnV2.startOfMonth(minDate)) || dateFnV2.isAfter(date, dateFnV2.startOfMonth(max)) || dateFnV2.isAfter(date, dateFnV2.startOfMonth(maxDate));
};

var getSelected = function getSelected(selected) {
  if (index.isRange(selected)) {
    return {
      start: dateFnV2.startOfMonth(selected.start),
      end: dateFnV2.endOfMonth(selected.end)
    };
  }

  return {
    start: parse.parseDate(dateFnV2.format(selected, 'yyyy-MM-dd')),
    end: parse.parseDate(dateFnV2.format(selected, 'yyyy-MM-dd'))
  };
};

var Quarters = function Quarters(props) {
  var height = props.height,
      hideOnSelect = props.hideOnSelect,
      locale = props.locale,
      max = props.max,
      maxDate = props.maxDate,
      min = props.min,
      minDate = props.minDate,
      scrollToDate = props.scrollToDate,
      today = props.today,
      setDisplay = props.setDisplay,
      theme = props.theme,
      handlers = props.handlers,
      width = props.width,
      _props$onSelect = props.onSelect,
      onSelect = _props$onSelect === void 0 ? index.emptyFn : _props$onSelect,
      _props$showQuarters = props.showQuarters,
      showQuarters = _props$showQuarters === void 0 ? true : _props$showQuarters,
      selected = props.selected,
      years = props.years,
      _props$fiscalYearStar = props.fiscalYearStart,
      fiscalYearStart = _props$fiscalYearStar === void 0 ? 1 : _props$fiscalYearStar;

  var _getSelected = getSelected(selected),
      start = _getSelected.start,
      end = _getSelected.end;

  var selectedYearIndex = React.useMemo(function () {
    var yearsSliced = years.slice(0, years.length);
    return yearsSliced.indexOf(start.getFullYear());
  }, [years, start]);
  var handleClick = React.useCallback(function (date, e) {
    onSelect(date, e, function (date) {
      return scrollToDate(date);
    });

    if (hideOnSelect) {
      window.requestAnimationFrame(function () {
        return setDisplay('quarters');
      });
    }
  }, [hideOnSelect, onSelect, scrollToDate, setDisplay]);
  var renderMonths = React.useCallback(function (chunked) {
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("article", {
      className: "quarter-label"
    }, chunked.map(function (months, index) {
      var isSelected = months.some(function (month) {
        return dateFnV2.isWithinRange(month, start, end);
      });
      return /*#__PURE__*/React__default['default'].createElement("label", {
        key: "Q".concat(index + 1),
        className: classNames__default['default']('label', _defineProperty__default['default']({}, quarters['default'].selected, isSelected))
      }, /*#__PURE__*/React__default['default'].createElement("span", null, "Q".concat(index + 1)));
    })), /*#__PURE__*/React__default['default'].createElement("article", {
      className: "quarterly-view"
    }, chunked.map(function (months) {
      var _classNames2;

      var isDisabled = months.some(function (month) {
        var disabled = isDateDisabled({
          date: month,
          min: min,
          minDate: minDate,
          max: max,
          maxDate: maxDate
        });
        return disabled;
      });
      var isSelected = months.some(function (month) {
        return dateFnV2.isWithinRange(month, start, end);
      });
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: "".concat(dateFnV2.getMonth(months[0]))
      }, /*#__PURE__*/React__default['default'].createElement("ol", Object.assign({
        className: classNames__default['default'](quarters['default'].month, (_classNames2 = {}, _defineProperty__default['default'](_classNames2, quarters['default'].selected, isSelected && !isDisabled), _defineProperty__default['default'](_classNames2, quarters['default'].disabled, isDisabled), _classNames2)),
        onClick: function onClick(e) {
          e.stopPropagation();

          if (!isDisabled) {
            handleClick(months[0], e);
          }
        }
      }, handlers), months.map(function (date, index) {
        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: index,
          "data-month": "".concat(dateFnV2.format(date, 'yyyy-MM-dd')),
          className: classNames__default['default'](_defineProperty__default['default']({}, quarters['default'].selected, dateFnV2.isSameMonth(date, start) || dateFnV2.isSameMonth(date, end)))
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: quarters['default'].selection
        }, dateFnV2.format(date, 'MMM', {
          locale: locale === null || locale === void 0 ? void 0 : locale.locale
        })));
      })));
    })));
  }, [handleClick, handlers, locale, max, maxDate, min, minDate, start, end]);
  var currentYear = today.getFullYear();
  var yearsSliced = years.slice(0, years.length);
  var rowHeight = 164;
  var heights = yearsSliced.map(function (val, index) {
    return index === 0 || index === yearsSliced.length - 1 ? rowHeight + SPACING : rowHeight;
  });
  var isYearLess = yearsSliced.length * rowHeight < height + 40;
  var containerHeight = isYearLess ? yearsSliced.length * rowHeight + 2 * SPACING : height + 40; // Scroll to selected year

  var _useState = React.useState(0),
      _useState2 = _slicedToArray__default['default'](_useState, 2),
      scrollOffset = _useState2[0],
      setScrollOffset = _useState2[1];

  React.useEffect(function () {
    if (!isYearLess && selectedYearIndex !== -1) {
      var top = heights.slice(0, selectedYearIndex).reduce(function (acc, val) {
        return acc + val;
      }, 0);
      setScrollOffset(top);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var onScroll = function onScroll(scrollTop) {
    setScrollOffset(scrollTop);
  };

  return /*#__PURE__*/React__default['default'].createElement(VirtualList__default['default'], {
    className: quarters['default'].list,
    width: width,
    height: containerHeight,
    itemCount: yearsSliced.length,
    estimatedItemSize: rowHeight,
    itemSize: function itemSize(index) {
      return heights[index];
    },
    scrollOffset: scrollOffset,
    onScroll: onScroll,
    renderItem: function renderItem(_ref2) {
      var _classNames4;

      var index$1 = _ref2.index,
          style = _ref2.style;
      var year = yearsSliced[index$1];
      var isActive = index$1 === selectedYearIndex;
      var months = index.getMonthsForYear(year, start.getDate());
      var appendages = months.slice(0, fiscalYearStart - 1).map(function (date) {
        return dateFnV2.addYears(date, 1);
      });
      var fiscalYear = [].concat(_toConsumableArray__default['default'](months.slice(fiscalYearStart - 1, months.length)), _toConsumableArray__default['default'](appendages));
      var chunked = index.chunk(fiscalYear, 4);
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: index$1,
        className: classNames__default['default'](quarters['default'].year, (_classNames4 = {}, _defineProperty__default['default'](_classNames4, quarters['default'].active, showQuarters && isActive), _defineProperty__default['default'](_classNames4, quarters['default'].withQuarters, showQuarters), _defineProperty__default['default'](_classNames4, quarters['default'].first, index$1 === 0), _defineProperty__default['default'](_classNames4, quarters['default'].last, index$1 === yearsSliced.length - 1), _classNames4)),
        style: _objectSpread__default['default'](_objectSpread__default['default']({}, style), {
          color: typeof theme.selectionColor === 'function' ? theme.selectionColor(new Date(year, 0, 1)) : theme.selectionColor
        }),
        role: "row"
      }, /*#__PURE__*/React__default['default'].createElement("label", {
        className: classNames__default['default']('year-label', _defineProperty__default['default']({}, quarters['default'].currentYear, currentYear === year))
      }, /*#__PURE__*/React__default['default'].createElement("span", null, year)), showQuarters && renderMonths(chunked));
    }
  });
};

var defaultQuartersDisplayOptions = {
  showHeader: false,
  showWeekdays: false,
  hideYearsOnSelect: false
};

exports.default = Quarters;
exports.defaultQuartersDisplayOptions = defaultQuartersDisplayOptions;
