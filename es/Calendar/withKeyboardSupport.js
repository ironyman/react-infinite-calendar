import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import { withProps, compose, withState, withHandlers } from 'recompose';
import { format, addDays, isBefore, isAfter } from '../utils/dateFnV2.js';
import { withImmutableProps, keyCodes } from '../utils/index.js';

var enhanceDay = withProps(function (props) {
  return {
    isHighlighted: props.highlightedDate === props.date
  };
});
var withKeyboardSupport = compose(withState('highlightedDate', 'setHighlight'), withImmutableProps(function (_ref) {
  var DayComponent = _ref.DayComponent;
  return {
    DayComponent: enhanceDay(DayComponent)
  };
}), withHandlers({
  onKeyDown: function onKeyDown(props) {
    return function (e) {
      return handleKeyDown(e, props);
    };
  }
}), withProps(function (_ref2) {
  var highlightedDate = _ref2.highlightedDate,
      onKeyDown = _ref2.onKeyDown,
      passThrough = _ref2.passThrough,
      setHighlight = _ref2.setHighlight;
  return {
    passThrough: _objectSpread(_objectSpread({}, passThrough), {}, {
      Day: _objectSpread(_objectSpread({}, passThrough.Day), {}, {
        highlightedDate: format(highlightedDate, 'yyyy-MM-dd'),
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

  if ([keyCodes.left, keyCodes.up, keyCodes.right, keyCodes.down].indexOf(e.keyCode) > -1 && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  switch (e.keyCode) {
    case keyCodes.enter:
      onClick && onClick(highlightedDate);
      return;

    case keyCodes.left:
      delta = -1;
      break;

    case keyCodes.right:
      delta = +1;
      break;

    case keyCodes.down:
      delta = +7;
      break;

    case keyCodes.up:
      delta = -7;
      break;

    default:
      delta = 0;
  }

  if (delta) {
    var newHighlightedDate = addDays(highlightedDate, delta); // Make sure the new highlighted date isn't before min / max

    if (isBefore(newHighlightedDate, minDate)) {
      newHighlightedDate = new Date(minDate);
    } else if (isAfter(newHighlightedDate, maxDate)) {
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

export { withKeyboardSupport };
