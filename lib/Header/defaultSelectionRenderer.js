'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var classNames = require('classnames');
var dateFnV2 = require('../utils/dateFnV2.js');
var Header = require('./Header.scss.js');
var Animation = require('./Animation.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

function defaultSelectionRenderer(value, _ref) {
  var display = _ref.display,
      key = _ref.key,
      locale = _ref.locale.locale,
      dateFormat = _ref.dateFormat,
      onYearClick = _ref.onYearClick,
      scrollToDate = _ref.scrollToDate,
      setDisplay = _ref.setDisplay,
      shouldAnimate = _ref.shouldAnimate,
      isWeeklySelection = _ref.isWeeklySelection;
  var date = parse.parseDate(value);

  if (isWeeklySelection) {
    if (key === 'start') {
      date = dateFnV2.startOfWeek(date);
    } else {
      date = dateFnV2.endOfWeek(date);
    }
  }

  var values = date && [{
    active: display === 'years',
    handleClick: function handleClick(e) {
      onYearClick(date, e, key);
      setDisplay('years');
    },
    item: 'year',
    title: display === 'days' ? "Change year" : null,
    value: date.getFullYear()
  }, {
    active: display === 'days',
    handleClick: function handleClick() {
      if (display !== 'days') {
        setDisplay('days');
      } else if (date) {
        scrollToDate(date, -40, true);
      }
    },
    item: 'day',
    title: display === 'days' ? "Scroll to ".concat(dateFnV2.format(date, dateFormat, locale)) : null,
    value: dateFnV2.format(date, dateFormat, locale)
  }];
  return /*#__PURE__*/React__default['default'].createElement("div", {
    key: key,
    className: Header['default'].wrapper,
    "aria-label": dateFnV2.format(date, dateFormat + ' yyyy', locale)
  }, /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.TransitionGroup, {
    component: null
  }, values.map(function (_ref2) {
    var handleClick = _ref2.handleClick,
        item = _ref2.item,
        value = _ref2.value,
        active = _ref2.active,
        title = _ref2.title;
    // Div wrapping CSSTransition causes
    // Warning: Received `true` for a non-boolean attribute `in`.
    // See https://github.com/reactjs/react-transition-group/issues/561
    // Not sure why.
    return /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.CSSTransition, {
      key: item,
      classNames: Animation['default'],
      timeout: {
        exit: 250,
        enter: 250
      },
      enter: shouldAnimate,
      leave: shouldAnimate.toString()
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: classNames__default['default'](Header['default'].dateWrapper, Header['default'][item], _defineProperty__default['default']({}, Header['default'].active, active)),
      title: title
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      key: "".concat(item, "-").concat(value),
      className: Header['default'].date,
      "aria-hidden": true,
      onClick: handleClick
    }, value)));
  })));
}

exports.default = defaultSelectionRenderer;
