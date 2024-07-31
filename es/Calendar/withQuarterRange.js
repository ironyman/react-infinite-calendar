import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { max, min, getMonth, startOfMonth, addMonths, endOfMonth } from '../utils/dateFnV2.js';
import { compose, withState, withProps } from 'recompose';
import { withDefaultProps } from './index.js';
import { withImmutableProps } from '../utils/index.js';
import { getInitialDate, EVENT_TYPE, getSortedSelection } from './Range/index.js';

var isTouchDevice = false;
var withQuarterRange = compose(withDefaultProps, withState('scrollDate', 'setScrollDate', getInitialDate), withState('selectionStart', 'setSelectionStart', null), withImmutableProps(function (_ref) {
  var QuartersComponent = _ref.QuartersComponent;
  return {
    QuartersComponent: QuartersComponent
  };
}), withState('hoveredDate', 'setHoveredDate', getInitialDate), withProps(function (_ref2) {
  var passThrough = _ref2.passThrough,
      selected = _ref2.selected;
      _ref2.hoveredDate;
      var props = _objectWithoutProperties(_ref2, ["passThrough", "selected", "hoveredDate"]);

  return {
    /* eslint-disable sort-keys */
    passThrough: _objectSpread(_objectSpread({}, passThrough), {}, {
      Quarters: {
        onSelect: function onSelect(date) {
          return handleSelect(date, _objectSpread({
            selected: selected
          }, props));
        },
        handlers: {
          onMouseOver: !isTouchDevice && props.selectionStart ? function (e) {
            return handleMouseOver(e, _objectSpread({
              selected: selected
            }, props));
          } : null
        }
      }
    }),
    selected: {
      start: selected && selected.start,
      end: selected && selected.end
    }
  };
}));

function handleSelect(date, _ref3) {
  var onSelect = _ref3.onSelect,
      selectionStart = _ref3.selectionStart,
      setSelectionStart = _ref3.setSelectionStart,
      min = _ref3.min,
      max = _ref3.max,
      minDate = _ref3.minDate,
      maxDate = _ref3.maxDate,
      fiscalYearStart = _ref3.fiscalYearStart;

  if (selectionStart) {
    onSelect(_objectSpread({
      eventType: EVENT_TYPE.END
    }, getMonthRangeDate({
      start: selectionStart,
      end: date,
      minSelected: minDate,
      maxSelected: maxDate,
      minScrolled: min,
      maxScrolled: max,
      fiscalYearStart: fiscalYearStart
    })));
    setSelectionStart(null);
  } else {
    onSelect(_objectSpread({
      eventType: EVENT_TYPE.START
    }, getMonthRangeDate({
      start: date,
      end: date,
      minSelected: minDate,
      maxSelected: maxDate,
      minScrolled: min,
      maxScrolled: max,
      fiscalYearStart: fiscalYearStart
    })));
    setSelectionStart(date);
  }
}

function handleMouseOver(e, _ref4) {
  _ref4.selected;
      var onSelect = _ref4.onSelect,
      selectionStart = _ref4.selectionStart,
      fiscalYearStart = _ref4.fiscalYearStart;
  e.stopPropagation();
  var month = e.target.getAttribute('data-month');

  if (!month) {
    return;
  }

  onSelect(_objectSpread({
    eventType: EVENT_TYPE.HOVER
  }, getMonthRangeDate({
    start: selectionStart,
    end: month,
    fiscalYearStart: fiscalYearStart
  })));
}

function startOfQuarter(date, fiscalYearStart) {
  var month = getMonth(date) + 1;
  var offset = (month + 12 - fiscalYearStart) % 3;
  var startQuarterMonth = startOfMonth(addMonths(date, -offset));
  return startQuarterMonth;
}

function endOfQuarter(date, fiscalYearStart) {
  var month = getMonth(date) + 1;
  var offset = 2 - (month + 12 - fiscalYearStart) % 3;
  var endQuarterMonth = endOfMonth(addMonths(date, offset));
  return endQuarterMonth;
}

function getMonthRangeDate(_ref5) {
  var start = _ref5.start,
      end = _ref5.end,
      minSelected = _ref5.minSelected,
      maxSelected = _ref5.maxSelected,
      minScrolled = _ref5.minScrolled,
      maxScrolled = _ref5.maxScrolled,
      fiscalYearStart = _ref5.fiscalYearStart;
  var sortedDate = getSortedSelection({
    start: start,
    end: end
  });
  var compareStartDate = [];
  var compareEndDate = [];

  if (sortedDate.start) {
    compareStartDate.push(startOfQuarter(sortedDate.start, fiscalYearStart));
    minScrolled && compareStartDate.push(minScrolled);
    minSelected && compareStartDate.push(minSelected);
  }

  if (sortedDate.end) {
    compareEndDate.push(endOfQuarter(sortedDate.end, fiscalYearStart));
    maxSelected && compareEndDate.push(maxSelected);
    maxScrolled && compareEndDate.push(maxScrolled);
  }

  return {
    start: compareStartDate.length > 0 ? max.apply(void 0, compareStartDate) : sortedDate.start,
    end: compareEndDate.length > 0 ? min.apply(void 0, compareEndDate) : sortedDate.end
  };
}

if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', function onTouch() {
    isTouchDevice = true;
    window.removeEventListener('touchstart', onTouch, false);
  });
}

export { withQuarterRange };
