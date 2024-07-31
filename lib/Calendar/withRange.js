'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var recompose = require('recompose');
var classNames = require('classnames');
var index = require('./index.js');
var index$1 = require('../utils/index.js');
var withRange$1 = require('../Header/withRange.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var Day = require('../Day/Day.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var isTouchDevice = false;
var EVENT_TYPE = {
  END: 3,
  HOVER: 2,
  START: 1
}; // Enhance Day component to display selected state based on an array of selected dates

var enhanceDay = recompose.withPropsOnChange(['selected'], function (_ref) {
  var _classNames;

  var date = _ref.date,
      selected = _ref.selected,
      theme = _ref.theme,
      isWeeklySelection = _ref.isWeeklySelection;
  var start = selected.start,
      end = selected.end;

  if (isWeeklySelection) {
    start = dateFnV2.format(dateFnV2.startOfWeek(start), 'yyyy-MM-dd');
    end = dateFnV2.format(dateFnV2.endOfWeek(end), 'yyyy-MM-dd');
  }

  var isSelected = date >= start && date <= end;
  var isStart = date === start;
  var isEnd = date === end;
  var isRange = !(isStart && isEnd);
  var style = isRange && (isStart && {
    backgroundColor: theme.accentColor
  } || isEnd && {
    backgroundColor: theme.accentColor
  });
  return {
    className: isSelected && isRange && classNames__default['default'](Day['default'].range, (_classNames = {}, _defineProperty__default['default'](_classNames, Day['default'].start, isStart), _defineProperty__default['default'](_classNames, Day['default'].betweenRange, !isStart && !isEnd), _defineProperty__default['default'](_classNames, Day['default'].end, isEnd), _classNames)),
    isSelected: isSelected,
    selectionStyle: style
  };
}); // Enhancer to handle selecting and displaying multiple dates

var withRange = function withRange(Calendar) {
  var CalendarWithRef = function CalendarWithRef(_ref2) {
    var forwardedRef = _ref2.forwardedRef,
        props = _objectWithoutProperties__default['default'](_ref2, ["forwardedRef"]);

    return /*#__PURE__*/React__default['default'].createElement(Calendar, Object.assign({}, props, {
      ref: forwardedRef
    }));
  };

  var EnhancedCalendar = recompose.compose(index.withDefaultProps, recompose.withState('scrollDate', 'setScrollDate', getInitialDate), recompose.withState('displayKey', 'setDisplayKey', getInitialDate), recompose.withState('selectionStart', 'setSelectionStart', null), recompose.withState('hoveredDate', 'setHoveredDate'), index$1.withImmutableProps(function (_ref3) {
    var DayComponent = _ref3.DayComponent,
        HeaderComponent = _ref3.HeaderComponent;
    return {
      DayComponent: enhanceDay(DayComponent),
      HeaderComponent: withRange$1['default'](HeaderComponent)
    };
  }), recompose.withProps(function (_ref4) {
    var displayKey = _ref4.displayKey,
        passThrough = _ref4.passThrough,
        selected = _ref4.selected,
        setDisplayKey = _ref4.setDisplayKey,
        hoveredDate = _ref4.hoveredDate,
        setHoveredDate = _ref4.setHoveredDate,
        forwardedRef = _ref4.forwardedRef,
        props = _objectWithoutProperties__default['default'](_ref4, ["displayKey", "passThrough", "selected", "setDisplayKey", "hoveredDate", "setHoveredDate", "forwardedRef"]);

    return {
      /* eslint-disable sort-keys */
      passThrough: _objectSpread__default['default'](_objectSpread__default['default']({}, passThrough), {}, {
        Day: {
          hoveredDate: hoveredDate,
          isWeeklySelection: Boolean(props.isWeeklySelection),
          onClick: function onClick(date) {
            return handleSelect(date, _objectSpread__default['default']({
              selected: selected
            }, props));
          },
          onMouseEnter: setHoveredDate,
          onMouseLeave: function onMouseLeave() {
            return setHoveredDate(undefined);
          },
          handlers: {
            onMouseOver: !isTouchDevice && props.selectionStart ? function (e) {
              return handleMouseOver(e, _objectSpread__default['default']({
                selected: selected
              }, props));
            } : null
          }
        },
        Years: {
          selected: selected && selected[displayKey],
          onSelect: function onSelect(date) {
            return handleYearSelect(date, _objectSpread__default['default']({
              displayKey: displayKey,
              selected: selected
            }, props));
          }
        },
        Header: {
          isWeeklySelection: Boolean(props.isWeeklySelection),
          onYearClick: function onYearClick(date, e, key) {
            return setDisplayKey(key || 'start');
          }
        }
      }),
      selected: {
        start: selected && dateFnV2.format(selected.start, 'yyyy-MM-dd'),
        end: selected && dateFnV2.format(selected.end, 'yyyy-MM-dd')
      },
      forwardedRef: forwardedRef
    };
  }))(CalendarWithRef);
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(EnhancedCalendar, Object.assign({}, props, {
      forwardedRef: ref
    }));
  });
};

function getSortedSelection(_ref5) {
  var start = _ref5.start,
      end = _ref5.end;
  return dateFnV2.isBefore(start, end) ? {
    start: start,
    end: end
  } : {
    start: end,
    end: start
  };
}

function handleSelect(date, _ref6) {
  var onSelect = _ref6.onSelect,
      selectionStart = _ref6.selectionStart,
      setSelectionStart = _ref6.setSelectionStart,
      isWeeklySelection = _ref6.isWeeklySelection;

  if (selectionStart) {
    var _getSortedSelection = getSortedSelection({
      start: selectionStart,
      end: date
    }),
        start = _getSortedSelection.start,
        end = _getSortedSelection.end;

    if (isWeeklySelection) {
      start = dateFnV2.startOfWeek(start);
      end = dateFnV2.endOfWeek(end);
    }

    onSelect({
      eventType: EVENT_TYPE.END,
      start: start,
      end: end
    });
    setSelectionStart(null);
  } else {
    if (isWeeklySelection) {
      onSelect({
        eventType: EVENT_TYPE.START,
        start: dateFnV2.startOfWeek(date),
        end: dateFnV2.endOfWeek(date)
      });
      setSelectionStart(dateFnV2.startOfWeek(date));
    } else {
      onSelect({
        eventType: EVENT_TYPE.START,
        start: date,
        end: date
      });
      setSelectionStart(date);
    }
  }
}

function handleMouseOver(e, _ref7) {
  var onSelect = _ref7.onSelect,
      selectionStart = _ref7.selectionStart;
  var dateStr = e.target.getAttribute('data-date');
  var date = dateStr && parse.parseDate(dateStr);

  if (!date) {
    return;
  }

  onSelect(_objectSpread__default['default']({
    eventType: EVENT_TYPE.HOVER
  }, getSortedSelection({
    start: selectionStart,
    end: date
  })));
}

function handleYearSelect(date, _ref8) {
  var displayKey = _ref8.displayKey,
      onSelect = _ref8.onSelect,
      selected = _ref8.selected,
      setScrollDate = _ref8.setScrollDate;
  setScrollDate(date);
  onSelect(getSortedSelection(Object.assign({}, selected, _defineProperty__default['default']({}, displayKey, parse.parseDate(date)))));
}

function getInitialDate(_ref9) {
  var selected = _ref9.selected;
  return selected && selected.start || new Date();
}

if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', function onTouch() {
    isTouchDevice = true;
    window.removeEventListener('touchstart', onTouch, false);
  });
}

exports.EVENT_TYPE = EVENT_TYPE;
exports.enhanceDay = enhanceDay;
exports.withRange = withRange;
