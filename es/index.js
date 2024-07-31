import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { Component } from 'react';
import Calendar from './Calendar/index.js';
export { default as Calendar } from './Calendar/index.js';
import { withDateSelection } from './Calendar/withDateSelection.js';
export { withDateSelection } from './Calendar/withDateSelection.js';
export { withKeyboardSupport } from './Calendar/withKeyboardSupport.js';
export { defaultMultipleDateInterpolation, withMultipleDates } from './Calendar/withMultipleDates.js';
export { withRange } from './Calendar/withRange.js';
export { EVENT_TYPE } from './Calendar/Range/index.js';
export { withMonthRange } from './Calendar/withMonthRange.js';
export { withQuarterRange } from './Calendar/withQuarterRange.js';

// const withForwardingRef = <Props extends {[_: string]: any}>(BaseComponent: React.ReactType<Props>) =>
//   React.forwardRef((props, ref) => <BaseComponent {...props} forwardedRef={ref} />);

var withForwardingRef = function withForwardingRef(BaseComponent) {
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(BaseComponent, Object.assign({}, props, {
      forwardedRef: ref
    }));
  });
};
/*
 * By default, Calendar is a controlled component.
 * Export a sensible default for minimal setup
 */


var DefaultCalendar = /*#__PURE__*/function (_Component) {
  _inherits(DefaultCalendar, _Component);

  var _super = _createSuper(DefaultCalendar);

  function DefaultCalendar() {
    var _this;

    _classCallCheck(this, DefaultCalendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: typeof _this.props.selected !== 'undefined' ? _this.props.selected : new Date()
    });

    _defineProperty(_assertThisInitialized(_this), "_getRef", function (ref) {
      _this.calendar = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (selected, reason) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          interpolateSelection = _this$props.interpolateSelection;

      if (typeof onSelect === 'function') {
        onSelect(selected, reason);
      }

      _this.setState({
        selected: interpolateSelection(selected, _this.state.selected)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToDate", function (date) {
      _this.calendar && _this.calendar.scrollToDate(date, -40);
    });

    return _this;
  }

  _createClass(DefaultCalendar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var selected = _ref.selected;

      if (selected !== this.props.selected) {
        this.setState({
          selected: selected
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      var _this$props2 = this.props,
          Component = _this$props2.Component;
          _this$props2.interpolateSelection;
          var props = _objectWithoutProperties(_this$props2, ["Component", "interpolateSelection"]);

      return /*#__PURE__*/React.createElement(Component, Object.assign({}, props, {
        ref: this._getRef,
        onSelect: this.handleSelect,
        selected: this.state.selected
      }));
    }
  }]);

  return DefaultCalendar;
}(Component);

_defineProperty(DefaultCalendar, "defaultProps", {
  // Component:  React.forwardRef(function (props, ref) { return withDateSelection(Calendar)({...props, ref}) }),
  // Component: withDateSelection(Calendar),
  Component: withForwardingRef(withDateSelection(Calendar)),
  interpolateSelection: function interpolateSelection(selected) {
    return selected;
  }
});

export default DefaultCalendar;
