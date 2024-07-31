'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var index = require('../utils/index.js');
var defaultSelectionRenderer = require('./defaultSelectionRenderer.js');
var index$1 = require('./Slider/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var enhanceHeader = index.withImmutableProps(function (_ref) {
  var setDisplayDate = _ref.setDisplayDate;
  return {
    renderSelection: function renderSelection(values, _ref2) {
      var scrollToDate = _ref2.scrollToDate,
          displayDate = _ref2.displayDate,
          props = _objectWithoutProperties__default['default'](_ref2, ["scrollToDate", "displayDate"]);

      if (!values.length) {
        return null;
      }

      var dates = values.sort();
      var index = values.indexOf(dateFnV2.format(parse.parseDate(displayDate), 'yyyy-MM-dd'));
      return /*#__PURE__*/React__default['default'].createElement(index$1['default'], {
        index: index !== -1 ? index : dates.length - 1,
        onChange: function onChange(index) {
          return setDisplayDate(dates[index], function () {
            return setTimeout(function () {
              return scrollToDate(dates[index], 0, true);
            }, 50);
          });
        }
      }, dates.map(function (value) {
        return defaultSelectionRenderer['default'](value, _objectSpread__default['default'](_objectSpread__default['default']({}, props), {}, {
          key: index,
          scrollToDate: scrollToDate,
          shouldAnimate: false
        }));
      }));
    }
  };
});

exports.default = enhanceHeader;
