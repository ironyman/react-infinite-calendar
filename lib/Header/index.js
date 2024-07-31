'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var index = require('../utils/index.js');
var defaultSelectionRenderer = require('./defaultSelectionRenderer.js');
var classNames = require('classnames');
var Header$1 = require('./Header.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var Header = function Header(props) {
  var layout = props.layout,
      blank = props.locale.blank,
      selected = props.selected,
      renderSelection = props.renderSelection,
      theme = props.theme;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: classNames__default['default'](Header$1['default'].root, _defineProperty__default['default']({}, Header$1['default'].landscape, layout === 'landscape')),
    style: {
      backgroundColor: theme.headerColor,
      color: theme.textColor.active
    }
  }, selected && renderSelection(selected, props) || /*#__PURE__*/React__default['default'].createElement("div", {
    className: classNames__default['default'](Header$1['default'].wrapper, Header$1['default'].blank)
  }, blank));
};
Header.defaultProps = {
  onYearClick: index.emptyFn,
  renderSelection: defaultSelectionRenderer['default']
};

exports.default = Header;
