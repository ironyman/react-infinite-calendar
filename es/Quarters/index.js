import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import classNames from 'classnames';
import { getMonthsForYear, chunk, isRange, emptyFn } from '../utils/index.js';
import { isWithinRange, isBefore, startOfMonth, isAfter, getMonth, format, isSameMonth, addYears, endOfMonth } from '../utils/dateFnV2.js';
import styles from './quarters.scss.js';
import { parseDate } from '../utils/parse.js';

var SPACING = 0;

var isDateDisabled = function isDateDisabled(_ref) {
  var date = _ref.date,
      min = _ref.min,
      minDate = _ref.minDate,
      max = _ref.max,
      maxDate = _ref.maxDate;
  return isBefore(date, startOfMonth(min)) || isBefore(date, startOfMonth(minDate)) || isAfter(date, startOfMonth(max)) || isAfter(date, startOfMonth(maxDate));
};

var getSelected = function getSelected(selected) {
  if (isRange(selected)) {
    return {
      start: startOfMonth(selected.start),
      end: endOfMonth(selected.end)
    };
  }

  return {
    start: parseDate(format(selected, 'yyyy-MM-dd')),
    end: parseDate(format(selected, 'yyyy-MM-dd'))
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
      onSelect = _props$onSelect === void 0 ? emptyFn : _props$onSelect,
      _props$showQuarters = props.showQuarters,
      showQuarters = _props$showQuarters === void 0 ? true : _props$showQuarters,
      selected = props.selected,
      years = props.years,
      _props$fiscalYearStar = props.fiscalYearStart,
      fiscalYearStart = _props$fiscalYearStar === void 0 ? 1 : _props$fiscalYearStar;

  var _getSelected = getSelected(selected),
      start = _getSelected.start,
      end = _getSelected.end;

  var selectedYearIndex = useMemo(function () {
    var yearsSliced = years.slice(0, years.length);
    return yearsSliced.indexOf(start.getFullYear());
  }, [years, start]);
  var handleClick = useCallback(function (date, e) {
    onSelect(date, e, function (date) {
      return scrollToDate(date);
    });

    if (hideOnSelect) {
      window.requestAnimationFrame(function () {
        return setDisplay('quarters');
      });
    }
  }, [hideOnSelect, onSelect, scrollToDate, setDisplay]);
  var renderMonths = useCallback(function (chunked) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("article", {
      className: "quarter-label"
    }, chunked.map(function (months, index) {
      var isSelected = months.some(function (month) {
        return isWithinRange(month, start, end);
      });
      return /*#__PURE__*/React.createElement("label", {
        key: "Q".concat(index + 1),
        className: classNames('label', _defineProperty({}, styles.selected, isSelected))
      }, /*#__PURE__*/React.createElement("span", null, "Q".concat(index + 1)));
    })), /*#__PURE__*/React.createElement("article", {
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
        return isWithinRange(month, start, end);
      });
      return /*#__PURE__*/React.createElement("div", {
        key: "".concat(getMonth(months[0]))
      }, /*#__PURE__*/React.createElement("ol", Object.assign({
        className: classNames(styles.month, (_classNames2 = {}, _defineProperty(_classNames2, styles.selected, isSelected && !isDisabled), _defineProperty(_classNames2, styles.disabled, isDisabled), _classNames2)),
        onClick: function onClick(e) {
          e.stopPropagation();

          if (!isDisabled) {
            handleClick(months[0], e);
          }
        }
      }, handlers), months.map(function (date, index) {
        return /*#__PURE__*/React.createElement("li", {
          key: index,
          "data-month": "".concat(format(date, 'yyyy-MM-dd')),
          className: classNames(_defineProperty({}, styles.selected, isSameMonth(date, start) || isSameMonth(date, end)))
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.selection
        }, format(date, 'MMM', {
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

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      scrollOffset = _useState2[0],
      setScrollOffset = _useState2[1];

  useEffect(function () {
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

  return /*#__PURE__*/React.createElement(VirtualList, {
    className: styles.list,
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

      var index = _ref2.index,
          style = _ref2.style;
      var year = yearsSliced[index];
      var isActive = index === selectedYearIndex;
      var months = getMonthsForYear(year, start.getDate());
      var appendages = months.slice(0, fiscalYearStart - 1).map(function (date) {
        return addYears(date, 1);
      });
      var fiscalYear = [].concat(_toConsumableArray(months.slice(fiscalYearStart - 1, months.length)), _toConsumableArray(appendages));
      var chunked = chunk(fiscalYear, 4);
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: classNames(styles.year, (_classNames4 = {}, _defineProperty(_classNames4, styles.active, showQuarters && isActive), _defineProperty(_classNames4, styles.withQuarters, showQuarters), _defineProperty(_classNames4, styles.first, index === 0), _defineProperty(_classNames4, styles.last, index === yearsSliced.length - 1), _classNames4)),
        style: _objectSpread(_objectSpread({}, style), {
          color: typeof theme.selectionColor === 'function' ? theme.selectionColor(new Date(year, 0, 1)) : theme.selectionColor
        }),
        role: "row"
      }, /*#__PURE__*/React.createElement("label", {
        className: classNames('year-label', _defineProperty({}, styles.currentYear, currentYear === year))
      }, /*#__PURE__*/React.createElement("span", null, year)), showQuarters && renderMonths(chunked));
    }
  });
};

var defaultQuartersDisplayOptions = {
  showHeader: false,
  showWeekdays: false,
  hideYearsOnSelect: false
};

export default Quarters;
export { defaultQuartersDisplayOptions };
