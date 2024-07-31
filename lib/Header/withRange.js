'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var React = require('react');
var index = require('../utils/index.js');
var defaultSelectionRenderer = require('./defaultSelectionRenderer.js');
var Header = require('./Header.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var enhanceHeader = index.withImmutableProps(function () {
  return {
    renderSelection: function renderSelection(values, props) {
      if (!values || !values.start && !values.end) {
        return null;
      }

      if (values.start === values.end) {
        return defaultSelectionRenderer['default'](values.start, props);
      }

      var dateFormat = props.locale && props.locale.headerFormat || 'MMM do';
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: Header['default'].range,
        style: {
          color: props.theme.headerColor
        }
      }, defaultSelectionRenderer['default'](values.start, _objectSpread__default['default'](_objectSpread__default['default']({}, props), {}, {
        dateFormat: dateFormat,
        key: 'start',
        shouldAnimate: false
      })), defaultSelectionRenderer['default'](values.end, _objectSpread__default['default'](_objectSpread__default['default']({}, props), {}, {
        dateFormat: dateFormat,
        key: 'end',
        shouldAnimate: false
      })));
    }
  };
});

exports.default = enhanceHeader;
