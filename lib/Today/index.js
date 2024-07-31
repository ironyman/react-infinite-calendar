'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var classNames = require('classnames');
var Today$1 = require('./Today.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var DIRECTION_UP = 1;
var DIRECTION_DOWN = -1;
var CHEVRON = 'M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9 c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3 z';

var Today = function Today(_ref) {
  var _classNames;

  var todayLabel = _ref.todayLabel,
      show = _ref.show,
      theme = _ref.theme,
      scrollToDate = _ref.scrollToDate;

  var scrollToToday = function scrollToToday() {
    scrollToDate(new Date(), -40, true);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: classNames__default['default'](Today$1['default'].root, (_classNames = {}, _defineProperty__default['default'](_classNames, Today$1['default'].show, show), _defineProperty__default['default'](_classNames, Today$1['default'].chevronUp, show === DIRECTION_UP), _defineProperty__default['default'](_classNames, Today$1['default'].chevronDown, show === DIRECTION_DOWN), _classNames)),
    style: {
      backgroundColor: theme.floatingNav.background,
      color: theme.floatingNav.color
    },
    onClick: scrollToToday
  }, todayLabel, /*#__PURE__*/React__default['default'].createElement("svg", {
    className: Today$1['default'].chevron,
    x: "0px",
    y: "0px",
    width: "14px",
    height: "14px",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fill: theme.floatingNav.chevron || theme.floatingNav.color,
    d: CHEVRON
  })));
};

exports.DIRECTION_DOWN = DIRECTION_DOWN;
exports.DIRECTION_UP = DIRECTION_UP;
exports.default = Today;
