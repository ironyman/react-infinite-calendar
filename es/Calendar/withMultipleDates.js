import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { withPropsOnChange, withProps, compose, withState } from 'recompose';
import { withDefaultProps } from './index.js';
import { withImmutableProps, sanitizeDate } from '../utils/index.js';
import enhanceHeader from '../Header/withMultipleDates.js';
import { format } from '../utils/dateFnV2.js';
import { parseDate } from '../utils/parse.js';

var enhanceDay = withPropsOnChange(['selected'], function (props) {
  return {
    isSelected: props.selected.indexOf(props.date) !== -1
  };
}); // Enhance year component

var enhanceYears = withProps(function (_ref) {
  var displayDate = _ref.displayDate;
  return {
    selected: displayDate ? parseDate(displayDate) : null
  };
}); // Enhancer to handle selecting and displaying multiple dates

var withMultipleDates = compose(withDefaultProps, withState('scrollDate', 'setScrollDate', getInitialDate), withState('displayDate', 'setDisplayDate', getInitialDate), withImmutableProps(function (_ref2) {
  var DayComponent = _ref2.DayComponent,
      HeaderComponent = _ref2.HeaderComponent,
      YearsComponent = _ref2.YearsComponent;
  return {
    DayComponent: enhanceDay(DayComponent),
    HeaderComponent: enhanceHeader(HeaderComponent),
    YearsComponent: enhanceYears(YearsComponent)
  };
}), withProps(function (_ref3) {
  var displayDate = _ref3.displayDate,
      onSelect = _ref3.onSelect,
      setDisplayDate = _ref3.setDisplayDate;
      _ref3.scrollToDate;
      var props = _objectWithoutProperties(_ref3, ["displayDate", "onSelect", "setDisplayDate", "scrollToDate"]);

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
      return sanitizeDate(date, props);
    }).map(function (date) {
      return format(date, 'yyyy-MM-dd');
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
  callback(parseDate(date));
}

function getInitialDate(_ref5) {
  var selected = _ref5.selected;
  return selected.length ? selected[0] : new Date();
}

function defaultMultipleDateInterpolation(date, selected) {
  var selectedMap = selected.map(function (date) {
    return format(date, 'yyyy-MM-dd');
  });
  var index = selectedMap.indexOf(format(date, 'yyyy-MM-dd'));
  return index === -1 ? [].concat(_toConsumableArray(selected), [date]) : [].concat(_toConsumableArray(selected.slice(0, index)), _toConsumableArray(selected.slice(index + 1)));
}

export { defaultMultipleDateInterpolation, enhanceDay, withMultipleDates };
