'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _createSuper = require('@babel/runtime/helpers/createSuper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var index = require('./Calendar/index.js');
var withDateSelection = require('./Calendar/withDateSelection.js');
var withKeyboardSupport = require('./Calendar/withKeyboardSupport.js');
var withMultipleDates = require('./Calendar/withMultipleDates.js');
var withRange = require('./Calendar/withRange.js');
var index$1 = require('./Calendar/Range/index.js');
var withMonthRange = require('./Calendar/withMonthRange.js');
var withQuarterRange = require('./Calendar/withQuarterRange.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _createSuper__default = /*#__PURE__*/_interopDefaultLegacy(_createSuper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// const withForwardingRef = <Props extends {[_: string]: any}>(BaseComponent: React.ReactType<Props>) =>
//   React.forwardRef((props, ref) => <BaseComponent {...props} forwardedRef={ref} />);

var withForwardingRef = function withForwardingRef(BaseComponent) {
  return /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(BaseComponent, Object.assign({}, props, {
      forwardedRef: ref
    }));
  });
};
/*
 * By default, Calendar is a controlled component.
 * Export a sensible default for minimal setup
 */


var DefaultCalendar = /*#__PURE__*/function (_Component) {
  _inherits__default['default'](DefaultCalendar, _Component);

  var _super = _createSuper__default['default'](DefaultCalendar);

  function DefaultCalendar() {
    var _this;

    _classCallCheck__default['default'](this, DefaultCalendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "state", {
      selected: typeof _this.props.selected !== 'undefined' ? _this.props.selected : new Date()
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "_getRef", function (ref) {
      _this.calendar = ref;
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "handleSelect", function (selected, reason) {
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

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "scrollToDate", function (date) {
      _this.calendar && _this.calendar.scrollToDate(date, -40);
    });

    return _this;
  }

  _createClass__default['default'](DefaultCalendar, [{
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
          var props = _objectWithoutProperties__default['default'](_this$props2, ["Component", "interpolateSelection"]);

      return /*#__PURE__*/React__default['default'].createElement(Component, Object.assign({}, props, {
        ref: this._getRef,
        onSelect: this.handleSelect,
        selected: this.state.selected
      }));
    }
  }]);

  return DefaultCalendar;
}(React.Component);

_defineProperty__default['default'](DefaultCalendar, "defaultProps", {
  // Component:  React.forwardRef(function (props, ref) { return withDateSelection(Calendar)({...props, ref}) }),
  // Component: withDateSelection(Calendar),
  Component: withForwardingRef(withDateSelection.withDateSelection(index['default'])),
  interpolateSelection: function interpolateSelection(selected) {
    return selected;
  }
});

exports.Calendar = index['default'];
exports.withDateSelection = withDateSelection.withDateSelection;
exports.withKeyboardSupport = withKeyboardSupport.withKeyboardSupport;
exports.defaultMultipleDateInterpolation = withMultipleDates.defaultMultipleDateInterpolation;
exports.withMultipleDates = withMultipleDates.withMultipleDates;
exports.withRange = withRange.withRange;
exports.EVENT_TYPE = index$1.EVENT_TYPE;
exports.withMonthRange = withMonthRange.withMonthRange;
exports.withQuarterRange = withQuarterRange.withQuarterRange;
exports.default = DefaultCalendar;
