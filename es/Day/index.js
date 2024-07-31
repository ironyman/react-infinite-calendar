import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { startOfWeek, isSameDay, endOfWeek, startOfMonth, endOfMonth, isSameWeek, getMonth } from '../utils/dateFnV2.js';
import styles from './Day.scss.js';
import { parseDate } from '../utils/parse.js';

var padZero = function padZero(n) {
  return n < 10 ? "0".concat(n) : String(n);
};

var Day = /*#__PURE__*/function (_PureComponent) {
  _inherits(Day, _PureComponent);

  var _super = _createSuper(Day);

  function Day() {
    var _this;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var _this$props = _this.props,
          date = _this$props.date,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick,
          isWeeklySelection = _this$props.isWeeklySelection;

      if (!isDisabled && typeof onClick === 'function') {
        if (isWeeklySelection) {
          onClick(parseDate(startOfWeek(date)), 'week');
        } else {
          onClick(parseDate(date), 'day');
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          isDisabled = _this$props2.isDisabled,
          isWeeklySelection = _this$props2.isWeeklySelection,
          onMouseEnter = _this$props2.onMouseEnter;

      if (!isDisabled && isWeeklySelection) {
        onMouseEnter(date);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      var _this$props3 = _this.props,
          date = _this$props3.date,
          isDisabled = _this$props3.isDisabled,
          isWeeklySelection = _this$props3.isWeeklySelection,
          onMouseLeave = _this$props3.onMouseLeave;

      if (!isDisabled && isWeeklySelection) {
        onMouseLeave(date);
      }
    });

    return _this;
  }

  _createClass(Day, [{
    key: "renderSelection",
    value: function renderSelection() {
      var _this$props4 = this.props,
          day = _this$props4.day,
          date = _this$props4.date,
          isToday = _this$props4.isToday,
          todayLabel = _this$props4.locale.todayLabel,
          monthShort = _this$props4.monthShort,
          textColor = _this$props4.theme.textColor,
          selectionStyle = _this$props4.selectionStyle;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.selection,
        "data-date": date,
        style: _objectSpread({
          backgroundColor: this.selectionColor,
          color: textColor.active
        }, selectionStyle)
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.month
      }, isToday ? todayLabel["short"] || todayLabel["long"] : monthShort), /*#__PURE__*/React.createElement("span", {
        className: styles.day
      }, padZero(day)));
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props5 = this.props,
          className = _this$props5.className,
          currentYear = _this$props5.currentYear,
          date = _this$props5.date,
          day = _this$props5.day,
          handlers = _this$props5.handlers,
          hoveredDate = _this$props5.hoveredDate,
          isDisabled = _this$props5.isDisabled,
          isHighlighted = _this$props5.isHighlighted,
          isToday = _this$props5.isToday,
          isSelected = _this$props5.isSelected,
          isWeeklySelection = _this$props5.isWeeklySelection,
          monthShort = _this$props5.monthShort,
          _this$props5$theme = _this$props5.theme,
          selectionColor = _this$props5$theme.selectionColor,
          todayColor = _this$props5$theme.todayColor,
          year = _this$props5.year;
      var isStartOfWeek = isSameDay(date, startOfWeek(date));
      var isEndOfWeek = isSameDay(date, endOfWeek(date));
      var isStartOfMonth = isSameDay(date, startOfMonth(date));
      var isEndOfMonth = isSameDay(date, endOfMonth(date));
      var isHovered = isWeeklySelection && isSameWeek(date, hoveredDate);
      var month = getMonth(date);
      var color;

      if (isSelected) {
        color = this.selectionColor = typeof selectionColor === 'function' ? selectionColor(date) : selectionColor;
      } else if (isToday) {
        color = todayColor;
      }

      return /*#__PURE__*/React.createElement("li", Object.assign({
        style: color ? {
          color: color
        } : null,
        className: classNames(styles.root, (_classNames = {}, _defineProperty(_classNames, styles.today, isToday), _defineProperty(_classNames, styles.highlighted, isHighlighted), _defineProperty(_classNames, styles.selected, isSelected), _defineProperty(_classNames, styles.disabled, isDisabled), _defineProperty(_classNames, styles.enabled, !isDisabled), _defineProperty(_classNames, styles.hovered, isHovered && !isSelected), _defineProperty(_classNames, styles.startOfWeek, isStartOfWeek), _defineProperty(_classNames, styles.endOfWeek, isEndOfWeek), _defineProperty(_classNames, styles.endOfMonth, isEndOfMonth), _defineProperty(_classNames, styles.endOfOddMonth, month % 2 === 0 && isEndOfMonth && !isEndOfWeek), _defineProperty(_classNames, styles.endOfEvenMonth, month % 2 === 1 && isEndOfMonth && !isEndOfWeek), _defineProperty(_classNames, styles.startOfMonth, isStartOfMonth), _defineProperty(_classNames, styles.startOfOddMonth, month % 2 === 1 && isStartOfMonth && !isStartOfWeek), _defineProperty(_classNames, styles.startOfEvenMonth, month % 2 === 0 && isStartOfMonth && !isStartOfWeek), _classNames), className),
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        "data-date": date,
        "data-value": padZero(day)
      }, handlers), day === 1 && /*#__PURE__*/React.createElement("span", {
        className: styles.month
      }, monthShort), isToday ? /*#__PURE__*/React.createElement("span", null, padZero(day)) : padZero(day), day === 1 && currentYear !== year && monthShort === 'Jan' && /*#__PURE__*/React.createElement("span", {
        className: styles.year
      }, year), isSelected && this.renderSelection());
    }
  }]);

  return Day;
}(PureComponent);

export default Day;
