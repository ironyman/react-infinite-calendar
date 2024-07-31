'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var recompose = require('recompose');
var classNames = require('classnames');
var index = require('./index.js');
var index$1 = require('../utils/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var Day = require('../Day/Day.scss.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var enhanceDay = recompose.withPropsOnChange(['selected'], function (_ref) {
  var _classNames;

  var isWeeklySelection = _ref.isWeeklySelection,
      selected = _ref.selected,
      date = _ref.date,
      theme = _ref.theme;

  if (!isWeeklySelection) {
    return {
      isSelected: selected === date
    };
  }

  var start = dateFnV2.format(dateFnV2.startOfWeek(selected), 'yyyy-MM-dd');
  var end = dateFnV2.format(dateFnV2.endOfWeek(selected), 'yyyy-MM-dd');
  var isSelected = date >= start && date <= end;
  var isStart = date === start;
  var isEnd = date === end;
  var isRange = !(isStart && isEnd);
  var style = isRange && (isStart || isEnd) && {
    backgroundColor: theme.accentColor
  };
  return {
    className: isSelected && isRange && classNames__default['default'](Day['default'].range, (_classNames = {}, _defineProperty__default['default'](_classNames, Day['default'].start, isStart), _defineProperty__default['default'](_classNames, Day['default'].betweenRange, !isStart && !isEnd), _defineProperty__default['default'](_classNames, Day['default'].end, isEnd), _classNames)),
    isSelected: isSelected,
    selectionStyle: style
  };
});
var enhanceYear = recompose.withPropsOnChange(['selected'], function (_ref2) {
  var selected = _ref2.selected;
  return {
    selected: parse.parseDate(selected)
  };
}); // Enhancer to handle selecting and displaying a single date

var withDateSelection = recompose.compose(index.withDefaultProps, index$1.withImmutableProps(function (_ref3) {
  var DayComponent = _ref3.DayComponent,
      YearsComponent = _ref3.YearsComponent;
  return {
    DayComponent: enhanceDay(DayComponent),
    YearsComponent: enhanceYear(YearsComponent)
  };
}), recompose.withState('hoveredDate', 'setHoveredDate'), recompose.withState('scrollDate', 'setScrollDate', function (props) {
  return props.selected || new Date();
}), recompose.withProps(function (_ref4) {
  var _onSelect = _ref4.onSelect,
      setScrollDate = _ref4.setScrollDate,
      hoveredDate = _ref4.hoveredDate,
      setHoveredDate = _ref4.setHoveredDate,
      props = _objectWithoutProperties__default['default'](_ref4, ["onSelect", "setScrollDate", "hoveredDate", "setHoveredDate"]);

  var selected = index$1.sanitizeDate(props.selected, props);
  return {
    passThrough: {
      Day: {
        hoveredDate: hoveredDate,
        isWeeklySelection: Boolean(props.isWeeklySelection),
        onClick: _onSelect,
        onMouseEnter: setHoveredDate,
        onMouseLeave: function onMouseLeave() {
          return setHoveredDate(undefined);
        }
      },
      Years: {
        onSelect: function onSelect(year) {
          return handleYearSelect(year, {
            onSelect: _onSelect,
            selected: selected,
            setScrollDate: setScrollDate
          });
        }
      }
    },
    selected: selected && dateFnV2.format(selected, 'yyyy-MM-dd')
  };
}));

function handleYearSelect(date, _ref5) {
  var setScrollDate = _ref5.setScrollDate,
      onSelect = _ref5.onSelect;
  var newDate = parse.parseDate(date);
  onSelect(newDate, 'month');
  setScrollDate(newDate);
}

exports.enhanceDay = enhanceDay;
exports.withDateSelection = withDateSelection;
