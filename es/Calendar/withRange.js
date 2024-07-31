import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { forwardRef } from 'react';
import { withPropsOnChange, compose, withState, withProps } from 'recompose';
import classNames from 'classnames';
import { withDefaultProps } from './index.js';
import { withImmutableProps } from '../utils/index.js';
import enhanceHeader from '../Header/withRange.js';
import { format, startOfWeek, endOfWeek, isBefore } from '../utils/dateFnV2.js';
import styles from '../Day/Day.scss.js';
import { parseDate } from '../utils/parse.js';

var isTouchDevice = false;
var EVENT_TYPE = {
  END: 3,
  HOVER: 2,
  START: 1
}; // Enhance Day component to display selected state based on an array of selected dates

var enhanceDay = withPropsOnChange(['selected'], function (_ref) {
  var _classNames;

  var date = _ref.date,
      selected = _ref.selected,
      theme = _ref.theme,
      isWeeklySelection = _ref.isWeeklySelection;
  var start = selected.start,
      end = selected.end;

  if (isWeeklySelection) {
    start = format(startOfWeek(start), 'yyyy-MM-dd');
    end = format(endOfWeek(end), 'yyyy-MM-dd');
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
    className: isSelected && isRange && classNames(styles.range, (_classNames = {}, _defineProperty(_classNames, styles.start, isStart), _defineProperty(_classNames, styles.betweenRange, !isStart && !isEnd), _defineProperty(_classNames, styles.end, isEnd), _classNames)),
    isSelected: isSelected,
    selectionStyle: style
  };
}); // Enhancer to handle selecting and displaying multiple dates

var withRange = function withRange(Calendar) {
  var CalendarWithRef = function CalendarWithRef(_ref2) {
    var forwardedRef = _ref2.forwardedRef,
        props = _objectWithoutProperties(_ref2, ["forwardedRef"]);

    return /*#__PURE__*/React.createElement(Calendar, Object.assign({}, props, {
      ref: forwardedRef
    }));
  };

  var EnhancedCalendar = compose(withDefaultProps, withState('scrollDate', 'setScrollDate', getInitialDate), withState('displayKey', 'setDisplayKey', getInitialDate), withState('selectionStart', 'setSelectionStart', null), withState('hoveredDate', 'setHoveredDate'), withImmutableProps(function (_ref3) {
    var DayComponent = _ref3.DayComponent,
        HeaderComponent = _ref3.HeaderComponent;
    return {
      DayComponent: enhanceDay(DayComponent),
      HeaderComponent: enhanceHeader(HeaderComponent)
    };
  }), withProps(function (_ref4) {
    var displayKey = _ref4.displayKey,
        passThrough = _ref4.passThrough,
        selected = _ref4.selected,
        setDisplayKey = _ref4.setDisplayKey,
        hoveredDate = _ref4.hoveredDate,
        setHoveredDate = _ref4.setHoveredDate,
        forwardedRef = _ref4.forwardedRef,
        props = _objectWithoutProperties(_ref4, ["displayKey", "passThrough", "selected", "setDisplayKey", "hoveredDate", "setHoveredDate", "forwardedRef"]);

    return {
      /* eslint-disable sort-keys */
      passThrough: _objectSpread(_objectSpread({}, passThrough), {}, {
        Day: {
          hoveredDate: hoveredDate,
          isWeeklySelection: Boolean(props.isWeeklySelection),
          onClick: function onClick(date) {
            return handleSelect(date, _objectSpread({
              selected: selected
            }, props));
          },
          onMouseEnter: setHoveredDate,
          onMouseLeave: function onMouseLeave() {
            return setHoveredDate(undefined);
          },
          handlers: {
            onMouseOver: !isTouchDevice && props.selectionStart ? function (e) {
              return handleMouseOver(e, _objectSpread({
                selected: selected
              }, props));
            } : null
          }
        },
        Years: {
          selected: selected && selected[displayKey],
          onSelect: function onSelect(date) {
            return handleYearSelect(date, _objectSpread({
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
        start: selected && format(selected.start, 'yyyy-MM-dd'),
        end: selected && format(selected.end, 'yyyy-MM-dd')
      },
      forwardedRef: forwardedRef
    };
  }))(CalendarWithRef);
  return /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(EnhancedCalendar, Object.assign({}, props, {
      forwardedRef: ref
    }));
  });
};

function getSortedSelection(_ref5) {
  var start = _ref5.start,
      end = _ref5.end;
  return isBefore(start, end) ? {
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
      start = startOfWeek(start);
      end = endOfWeek(end);
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
        start: startOfWeek(date),
        end: endOfWeek(date)
      });
      setSelectionStart(startOfWeek(date));
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
  var date = dateStr && parseDate(dateStr);

  if (!date) {
    return;
  }

  onSelect(_objectSpread({
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
  onSelect(getSortedSelection(Object.assign({}, selected, _defineProperty({}, displayKey, parseDate(date)))));
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

export { EVENT_TYPE, enhanceDay, withRange };
