'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _createSuper = require('@babel/runtime/helpers/createSuper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var classNames = require('classnames');
var Slider$1 = require('./Slider.scss.js');
var transition = require('./transition.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _createSuper__default = /*#__PURE__*/_interopDefaultLegacy(_createSuper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var DIRECTIONS = {
  LEFT: 0,
  RIGHT: 1
};

var Arrow = function Arrow(_ref) {
  var _classNames;

  var direction = _ref.direction,
      _onClick = _ref.onClick;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: classNames__default['default'](Slider$1['default'].arrow, (_classNames = {}, _defineProperty__default['default'](_classNames, Slider$1['default'].arrowLeft, direction === DIRECTIONS.LEFT), _defineProperty__default['default'](_classNames, Slider$1['default'].arrowRight, direction === DIRECTIONS.RIGHT), _classNames)),
    onClick: function onClick() {
      return _onClick(direction);
    }
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    x: "0px",
    y: "0px",
    viewBox: "0 0 26 46"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M31.232233,34.767767 C32.2085438,35.7440777 33.7914562,35.7440777 34.767767,34.767767 C35.7440777,33.7914562 35.7440777,32.2085438 34.767767,31.232233 L14.767767,11.232233 C13.7914562,10.2559223 12.2085438,10.2559223 11.232233,11.232233 L-8.767767,31.232233 C-9.7440777,32.2085438 -9.7440777,33.7914562 -8.767767,34.767767 C-7.7914562,35.7440777 -6.2085438,35.7440777 -5.232233,34.767767 L12.9997921,16.5357418 L31.232233,34.767767 Z",
    id: "Shape",
    fill: "#FFF",
    transform: "translate(13.000000, 23.000000) rotate(90.000000) translate(-13.000000, -23.000000) "
  })));
};

var Slider = /*#__PURE__*/function (_PureComponent) {
  _inherits__default['default'](Slider, _PureComponent);

  var _super = _createSuper__default['default'](Slider);

  function Slider() {
    var _this;

    _classCallCheck__default['default'](this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "handleClick", function (direction) {
      var _this$props = _this.props,
          children = _this$props.children,
          index = _this$props.index,
          onChange = _this$props.onChange;

      switch (direction) {
        case DIRECTIONS.LEFT:
          index = Math.max(0, index - 1);
          break;

        case DIRECTIONS.RIGHT:
          index = Math.min(index + 1, children.length);
          break;

        default:
          return;
      }

      onChange(index);
    });

    return _this;
  }

  _createClass__default['default'](Slider, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          index = _this$props2.index;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: Slider$1['default'].root
      }, index !== 0 && /*#__PURE__*/React__default['default'].createElement(Arrow, {
        onClick: this.handleClick,
        direction: DIRECTIONS.LEFT
      }), /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.TransitionGroup, null, React.Children.map(children, function (child, i) {
        return /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.CSSTransition, {
          timeout: {
            exit: 300,
            enter: 300
          },
          component: "div",
          style: {
            transform: "translate3d(-".concat(100 * index, "%, 0, 0)")
          },
          classNames: classNames__default['default'](transition['default'], Slider$1['default'].wrapper)
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          key: i,
          className: Slider$1['default'].slide,
          style: {
            transform: "translateX(".concat(100 * i, "%)")
          }
        }, child));
      })), index !== children.length - 1 && /*#__PURE__*/React__default['default'].createElement(Arrow, {
        onClick: this.handleClick,
        direction: DIRECTIONS.RIGHT
      }));
    }
  }]);

  return Slider;
}(React.PureComponent);

exports.default = Slider;
