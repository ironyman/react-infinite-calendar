'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dateFnV2 = require('../utils/dateFnV2.js');
var defaultLocale = require('../utils/defaultLocale.js');
var CurrentMonth$1 = require('./CurrentMonth.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CurrentMonth = function CurrentMonth(_ref) {
  var currentMonth = _ref.currentMonth,
      theme = _ref.theme;
  return currentMonth ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: CurrentMonth$1['default'].root,
    style: {
      backgroundColor: theme.floatingNav.background,
      color: theme.floatingNav.color
    }
  }, dateFnV2.format(currentMonth, defaultLocale['default'].monthLabelFormat).toUpperCase()) : null;
};

exports.default = CurrentMonth;
