import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { Children, PureComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Slider.scss.js';
import transition from './transition.scss.js';

var DIRECTIONS = {
  LEFT: 0,
  RIGHT: 1
};

var Arrow = function Arrow(_ref) {
  var _classNames;

  var direction = _ref.direction,
      _onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.arrow, (_classNames = {}, _defineProperty(_classNames, styles.arrowLeft, direction === DIRECTIONS.LEFT), _defineProperty(_classNames, styles.arrowRight, direction === DIRECTIONS.RIGHT), _classNames)),
    onClick: function onClick() {
      return _onClick(direction);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    x: "0px",
    y: "0px",
    viewBox: "0 0 26 46"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M31.232233,34.767767 C32.2085438,35.7440777 33.7914562,35.7440777 34.767767,34.767767 C35.7440777,33.7914562 35.7440777,32.2085438 34.767767,31.232233 L14.767767,11.232233 C13.7914562,10.2559223 12.2085438,10.2559223 11.232233,11.232233 L-8.767767,31.232233 C-9.7440777,32.2085438 -9.7440777,33.7914562 -8.767767,34.767767 C-7.7914562,35.7440777 -6.2085438,35.7440777 -5.232233,34.767767 L12.9997921,16.5357418 L31.232233,34.767767 Z",
    id: "Shape",
    fill: "#FFF",
    transform: "translate(13.000000, 23.000000) rotate(90.000000) translate(-13.000000, -23.000000) "
  })));
};

var Slider = /*#__PURE__*/function (_PureComponent) {
  _inherits(Slider, _PureComponent);

  var _super = _createSuper(Slider);

  function Slider() {
    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (direction) {
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

  _createClass(Slider, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          index = _this$props2.index;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.root
      }, index !== 0 && /*#__PURE__*/React.createElement(Arrow, {
        onClick: this.handleClick,
        direction: DIRECTIONS.LEFT
      }), /*#__PURE__*/React.createElement(TransitionGroup, null, Children.map(children, function (child, i) {
        return /*#__PURE__*/React.createElement(CSSTransition, {
          timeout: {
            exit: 300,
            enter: 300
          },
          component: "div",
          style: {
            transform: "translate3d(-".concat(100 * index, "%, 0, 0)")
          },
          classNames: classNames(transition, styles.wrapper)
        }, /*#__PURE__*/React.createElement("div", {
          key: i,
          className: styles.slide,
          style: {
            transform: "translateX(".concat(100 * i, "%)")
          }
        }, child));
      })), index !== children.length - 1 && /*#__PURE__*/React.createElement(Arrow, {
        onClick: this.handleClick,
        direction: DIRECTIONS.RIGHT
      }));
    }
  }]);

  return Slider;
}(PureComponent);

export default Slider;
