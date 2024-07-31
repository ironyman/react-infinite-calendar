'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var recompose = require('recompose');
var index = require('./index.js');
var index$1 = require('../utils/index.js');
var withMultipleDates$1 = require('../Header/withMultipleDates.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var parse = require('../utils/parse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var enhanceDay = recompose.withPropsOnChange(['selected'], function (props) {
  return {
    isSelected: props.selected.indexOf(props.date) !== -1
  };
}); // Enhance year component

var enhanceYears = recompose.withProps(function (_ref) {
  var displayDate = _ref.displayDate;
  return {
    selected: displayDate ? parse.parseDate(displayDate) : null
  };
}); // Enhancer to handle selecting and displaying multiple dates

var withMultipleDates = recompose.compose(index.withDefaultProps, recompose.withState('scrollDate', 'setScrollDate', getInitialDate), recompose.withState('displayDate', 'setDisplayDate', getInitialDate), index$1.withImmutableProps(function (_ref2) {
  var DayComponent = _ref2.DayComponent,
      HeaderComponent = _ref2.HeaderComponent,
      YearsComponent = _ref2.YearsComponent;
  return {
    DayComponent: enhanceDay(DayComponent),
    HeaderComponent: withMultipleDates$1['default'](HeaderComponent),
    YearsComponent: enhanceYears(YearsComponent)
  };
}), recompose.withProps(function (_ref3) {
  var displayDate = _ref3.displayDate,
      onSelect = _ref3.onSelect,
      setDisplayDate = _ref3.setDisplayDate;
      _ref3.scrollToDate;
      var props = _objectWithoutProperties__default['default'](_ref3, ["displayDate", "onSelect", "setDisplayDate", "scrollToDate"]);

  return {
    passThrough: {
      Day: {
        onClick: function onClick(date) {
          return handleSelect(date, {
            onSelect: onSelect,
            setDisplayDate: setDisplayDate
          });
        }
      },
      Header: {
        setDisplayDate: setDisplayDate
      },
      Years: {
        displayDate: displayDate,
        onSelect: function onSelect(year, e, callback) {
          return handleYearSelect(year, callback);
        },
        selected: displayDate
      }
    },
    selected: props.selected.filter(function (date) {
      return index$1.sanitizeDate(date, props);
    }).map(function (date) {
      return dateFnV2.format(date, 'yyyy-MM-dd');
    })
  };
}));

function handleSelect(date, _ref4) {
  var onSelect = _ref4.onSelect,
      setDisplayDate = _ref4.setDisplayDate;
  onSelect(date);
  setDisplayDate(date);
}

function handleYearSelect(date, callback) {
  callback(parse.parseDate(date));
}

function getInitialDate(_ref5) {
  var selected = _ref5.selected;
  return selected.length ? selected[0] : new Date();
}

function defaultMultipleDateInterpolation(date, selected) {
  var selectedMap = selected.map(function (date) {
    return dateFnV2.format(date, 'yyyy-MM-dd');
  });
  var index = selectedMap.indexOf(dateFnV2.format(date, 'yyyy-MM-dd'));
  return index === -1 ? [].concat(_toConsumableArray__default['default'](selected), [date]) : [].concat(_toConsumableArray__default['default'](selected.slice(0, index)), _toConsumableArray__default['default'](selected.slice(index + 1)));
}

exports.defaultMultipleDateInterpolation = defaultMultipleDateInterpolation;
exports.enhanceDay = enhanceDay;
exports.withMultipleDates = withMultipleDates;
