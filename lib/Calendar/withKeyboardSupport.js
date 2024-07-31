'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var recompose = require('recompose');
var dateFnV2 = require('../utils/dateFnV2.js');
var index = require('../utils/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);

var enhanceDay = recompose.withProps(function (props) {
  return {
    isHighlighted: props.highlightedDate === props.date
  };
});
var withKeyboardSupport = recompose.compose(recompose.withState('highlightedDate', 'setHighlight'), index.withImmutableProps(function (_ref) {
  var DayComponent = _ref.DayComponent;
  return {
    DayComponent: enhanceDay(DayComponent)
  };
}), recompose.withHandlers({
  onKeyDown: function onKeyDown(props) {
    return function (e) {
      return handleKeyDown(e, props);
    };
  }
}), recompose.withProps(function (_ref2) {
  var highlightedDate = _ref2.highlightedDate,
      onKeyDown = _ref2.onKeyDown,
      passThrough = _ref2.passThrough,
      setHighlight = _ref2.setHighlight;
  return {
    passThrough: _objectSpread__default['default'](_objectSpread__default['default']({}, passThrough), {}, {
      Day: _objectSpread__default['default'](_objectSpread__default['default']({}, passThrough.Day), {}, {
        highlightedDate: dateFnV2.format(highlightedDate, 'yyyy-MM-dd'),
        onClick: function onClick(date) {
          setHighlight(null);
          passThrough.Day.onClick(date);
        }
      }),
      rootNode: {
        onKeyDown: onKeyDown
      }
    })
  };
}));

function handleKeyDown(e, props) {
  var minDate = props.minDate,
      maxDate = props.maxDate,
      onClick = props.passThrough.Day.onClick,
      setScrollDate = props.setScrollDate,
      setHighlight = props.setHighlight;
  var highlightedDate = getInitialDate(props);
  var delta = 0;

  if ([index.keyCodes.left, index.keyCodes.up, index.keyCodes.right, index.keyCodes.down].indexOf(e.keyCode) > -1 && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  switch (e.keyCode) {
    case index.keyCodes.enter:
      onClick && onClick(highlightedDate);
      return;

    case index.keyCodes.left:
      delta = -1;
      break;

    case index.keyCodes.right:
      delta = +1;
      break;

    case index.keyCodes.down:
      delta = +7;
      break;

    case index.keyCodes.up:
      delta = -7;
      break;

    default:
      delta = 0;
  }

  if (delta) {
    var newHighlightedDate = dateFnV2.addDays(highlightedDate, delta); // Make sure the new highlighted date isn't before min / max

    if (dateFnV2.isBefore(newHighlightedDate, minDate)) {
      newHighlightedDate = new Date(minDate);
    } else if (dateFnV2.isAfter(newHighlightedDate, maxDate)) {
      newHighlightedDate = new Date(maxDate);
    }

    setScrollDate(newHighlightedDate);
    setHighlight(newHighlightedDate);
  }
}

function getInitialDate(_ref3) {
  var highlightedDate = _ref3.highlightedDate,
      selected = _ref3.selected,
      displayDate = _ref3.displayDate;
  return highlightedDate || selected.start || displayDate || selected || new Date();
}

exports.withKeyboardSupport = withKeyboardSupport;
