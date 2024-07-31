'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var React = require('react');
var index = require('../utils/index.js');
var Weekdays$1 = require('./Weekdays.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Weekdays = function Weekdays(_ref) {
  var weekdays = _ref.weekdays,
      weekStartsOn = _ref.weekStartsOn,
      theme = _ref.theme;
  var orderedWeekdays = [].concat(_toConsumableArray__default['default'](weekdays.slice(weekStartsOn, 7)), _toConsumableArray__default['default'](weekdays.slice(0, weekStartsOn)));
  return /*#__PURE__*/React__default['default'].createElement("ul", {
    className: Weekdays$1['default'].root,
    style: {
      backgroundColor: theme.weekdayColor,
      color: theme.textColor.active,
      paddingRight: index.scrollbarSize
    },
    "aria-hidden": true
  }, orderedWeekdays.map(function (val) {
    return /*#__PURE__*/React__default['default'].createElement("li", {
      key: "Weekday-".concat(val),
      className: Weekdays$1['default'].day
    }, val);
  }));
};

exports.default = Weekdays;
