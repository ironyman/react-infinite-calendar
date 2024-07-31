'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _createSuper = require('@babel/runtime/helpers/createSuper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var classNames = require('classnames');
var dateFnV2 = require('../utils/dateFnV2.js');
var Day$1 = require('./Day.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _createSuper__default = /*#__PURE__*/_interopDefaultLegacy(_createSuper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var padZero = function padZero(n) {
  return n < 10 ? "0".concat(n) : String(n);
};

var Day = /*#__PURE__*/function (_PureComponent) {
  _inherits__default['default'](Day, _PureComponent);

  var _super = _createSuper__default['default'](Day);

  function Day() {
    var _this;

    _classCallCheck__default['default'](this, Day);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "handleClick", function () {
      var _this$props = _this.props,
          date = _this$props.date,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick,
          isWeeklySelection = _this$props.isWeeklySelection;

      if (!isDisabled && typeof onClick === 'function') {
        if (isWeeklySelection) {
          onClick(parse.parseDate(dateFnV2.startOfWeek(date)), 'week');
        } else {
          onClick(parse.parseDate(date), 'day');
        }
      }
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "handleMouseEnter", function () {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          isDisabled = _this$props2.isDisabled,
          isWeeklySelection = _this$props2.isWeeklySelection,
          onMouseEnter = _this$props2.onMouseEnter;

      if (!isDisabled && isWeeklySelection) {
        onMouseEnter(date);
      }
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "handleMouseLeave", function () {
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

  _createClass__default['default'](Day, [{
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
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: Day$1['default'].selection,
        "data-date": date,
        style: _objectSpread__default['default']({
          backgroundColor: this.selectionColor,
          color: textColor.active
        }, selectionStyle)
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: Day$1['default'].month
      }, isToday ? todayLabel["short"] || todayLabel["long"] : monthShort), /*#__PURE__*/React__default['default'].createElement("span", {
        className: Day$1['default'].day
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
      var isStartOfWeek = dateFnV2.isSameDay(date, dateFnV2.startOfWeek(date));
      var isEndOfWeek = dateFnV2.isSameDay(date, dateFnV2.endOfWeek(date));
      var isStartOfMonth = dateFnV2.isSameDay(date, dateFnV2.startOfMonth(date));
      var isEndOfMonth = dateFnV2.isSameDay(date, dateFnV2.endOfMonth(date));
      var isHovered = isWeeklySelection && dateFnV2.isSameWeek(date, hoveredDate);
      var month = dateFnV2.getMonth(date);
      var color;

      if (isSelected) {
        color = this.selectionColor = typeof selectionColor === 'function' ? selectionColor(date) : selectionColor;
      } else if (isToday) {
        color = todayColor;
      }

      return /*#__PURE__*/React__default['default'].createElement("li", Object.assign({
        style: color ? {
          color: color
        } : null,
        className: classNames__default['default'](Day$1['default'].root, (_classNames = {}, _defineProperty__default['default'](_classNames, Day$1['default'].today, isToday), _defineProperty__default['default'](_classNames, Day$1['default'].highlighted, isHighlighted), _defineProperty__default['default'](_classNames, Day$1['default'].selected, isSelected), _defineProperty__default['default'](_classNames, Day$1['default'].disabled, isDisabled), _defineProperty__default['default'](_classNames, Day$1['default'].enabled, !isDisabled), _defineProperty__default['default'](_classNames, Day$1['default'].hovered, isHovered && !isSelected), _defineProperty__default['default'](_classNames, Day$1['default'].startOfWeek, isStartOfWeek), _defineProperty__default['default'](_classNames, Day$1['default'].endOfWeek, isEndOfWeek), _defineProperty__default['default'](_classNames, Day$1['default'].endOfMonth, isEndOfMonth), _defineProperty__default['default'](_classNames, Day$1['default'].endOfOddMonth, month % 2 === 0 && isEndOfMonth && !isEndOfWeek), _defineProperty__default['default'](_classNames, Day$1['default'].endOfEvenMonth, month % 2 === 1 && isEndOfMonth && !isEndOfWeek), _defineProperty__default['default'](_classNames, Day$1['default'].startOfMonth, isStartOfMonth), _defineProperty__default['default'](_classNames, Day$1['default'].startOfOddMonth, month % 2 === 1 && isStartOfMonth && !isStartOfWeek), _defineProperty__default['default'](_classNames, Day$1['default'].startOfEvenMonth, month % 2 === 0 && isStartOfMonth && !isStartOfWeek), _classNames), className),
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        "data-date": date,
        "data-value": padZero(day)
      }, handlers), day === 1 && /*#__PURE__*/React__default['default'].createElement("span", {
        className: Day$1['default'].month
      }, monthShort), isToday ? /*#__PURE__*/React__default['default'].createElement("span", null, padZero(day)) : padZero(day), day === 1 && currentYear !== year && monthShort === 'Jan' && /*#__PURE__*/React__default['default'].createElement("span", {
        className: Day$1['default'].year
      }, year), isSelected && this.renderSelection());
    }
  }]);

  return Day;
}(React.PureComponent);

exports.default = Day;
