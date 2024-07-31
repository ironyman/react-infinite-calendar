'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var dateFnV2 = require('../utils/dateFnV2.js');
var recompose = require('recompose');
var index = require('./index.js');
var index$2 = require('../utils/index.js');
var index$1 = require('./Range/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var isTouchDevice = false;
var withQuarterRange = recompose.compose(index.withDefaultProps, recompose.withState('scrollDate', 'setScrollDate', index$1.getInitialDate), recompose.withState('selectionStart', 'setSelectionStart', null), index$2.withImmutableProps(function (_ref) {
  var QuartersComponent = _ref.QuartersComponent;
  return {
    QuartersComponent: QuartersComponent
  };
}), recompose.withState('hoveredDate', 'setHoveredDate', index$1.getInitialDate), recompose.withProps(function (_ref2) {
  var passThrough = _ref2.passThrough,
      selected = _ref2.selected;
      _ref2.hoveredDate;
      var props = _objectWithoutProperties__default['default'](_ref2, ["passThrough", "selected", "hoveredDate"]);

  return {
    /* eslint-disable sort-keys */
    passThrough: _objectSpread__default['default'](_objectSpread__default['default']({}, passThrough), {}, {
      Quarters: {
        onSelect: function onSelect(date) {
          return handleSelect(date, _objectSpread__default['default']({
            selected: selected
          }, props));
        },
        handlers: {
          onMouseOver: !isTouchDevice && props.selectionStart ? function (e) {
            return handleMouseOver(e, _objectSpread__default['default']({
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
    onSelect(_objectSpread__default['default']({
      eventType: index$1.EVENT_TYPE.END
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
    onSelect(_objectSpread__default['default']({
      eventType: index$1.EVENT_TYPE.START
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

  onSelect(_objectSpread__default['default']({
    eventType: index$1.EVENT_TYPE.HOVER
  }, getMonthRangeDate({
    start: selectionStart,
    end: month,
    fiscalYearStart: fiscalYearStart
  })));
}

function startOfQuarter(date, fiscalYearStart) {
  var month = dateFnV2.getMonth(date) + 1;
  var offset = (month + 12 - fiscalYearStart) % 3;
  var startQuarterMonth = dateFnV2.startOfMonth(dateFnV2.addMonths(date, -offset));
  return startQuarterMonth;
}

function endOfQuarter(date, fiscalYearStart) {
  var month = dateFnV2.getMonth(date) + 1;
  var offset = 2 - (month + 12 - fiscalYearStart) % 3;
  var endQuarterMonth = dateFnV2.endOfMonth(dateFnV2.addMonths(date, offset));
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
  var sortedDate = index$1.getSortedSelection({
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
    start: compareStartDate.length > 0 ? dateFnV2.max.apply(void 0, compareStartDate) : sortedDate.start,
    end: compareEndDate.length > 0 ? dateFnV2.min.apply(void 0, compareEndDate) : sortedDate.end
  };
}

if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', function onTouch() {
    isTouchDevice = true;
    window.removeEventListener('touchstart', onTouch, false);
  });
}

exports.withQuarterRange = withQuarterRange;
