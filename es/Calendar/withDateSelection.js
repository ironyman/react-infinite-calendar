import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { withPropsOnChange, compose, withState, withProps } from 'recompose';
import classNames from 'classnames';
import { withDefaultProps } from './index.js';
import { withImmutableProps, sanitizeDate } from '../utils/index.js';
import { format, startOfWeek, endOfWeek } from '../utils/dateFnV2.js';
import styles from '../Day/Day.scss.js';
import { parseDate } from '../utils/parse.js';

var enhanceDay = withPropsOnChange(['selected'], function (_ref) {
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

  var start = format(startOfWeek(selected), 'yyyy-MM-dd');
  var end = format(endOfWeek(selected), 'yyyy-MM-dd');
  var isSelected = date >= start && date <= end;
  var isStart = date === start;
  var isEnd = date === end;
  var isRange = !(isStart && isEnd);
  var style = isRange && (isStart || isEnd) && {
    backgroundColor: theme.accentColor
  };
  return {
    className: isSelected && isRange && classNames(styles.range, (_classNames = {}, _defineProperty(_classNames, styles.start, isStart), _defineProperty(_classNames, styles.betweenRange, !isStart && !isEnd), _defineProperty(_classNames, styles.end, isEnd), _classNames)),
    isSelected: isSelected,
    selectionStyle: style
  };
});
var enhanceYear = withPropsOnChange(['selected'], function (_ref2) {
  var selected = _ref2.selected;
  return {
    selected: parseDate(selected)
  };
}); // Enhancer to handle selecting and displaying a single date

var withDateSelection = compose(withDefaultProps, withImmutableProps(function (_ref3) {
  var DayComponent = _ref3.DayComponent,
      YearsComponent = _ref3.YearsComponent;
  return {
    DayComponent: enhanceDay(DayComponent),
    YearsComponent: enhanceYear(YearsComponent)
  };
}), withState('hoveredDate', 'setHoveredDate'), withState('scrollDate', 'setScrollDate', function (props) {
  return props.selected || new Date();
}), withProps(function (_ref4) {
  var _onSelect = _ref4.onSelect,
      setScrollDate = _ref4.setScrollDate,
      hoveredDate = _ref4.hoveredDate,
      setHoveredDate = _ref4.setHoveredDate,
      props = _objectWithoutProperties(_ref4, ["onSelect", "setScrollDate", "hoveredDate", "setHoveredDate"]);

  var selected = sanitizeDate(props.selected, props);
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
    selected: selected && format(selected, 'yyyy-MM-dd')
  };
}));

function handleYearSelect(date, _ref5) {
  var setScrollDate = _ref5.setScrollDate,
      onSelect = _ref5.onSelect;
  var newDate = parseDate(date);
  onSelect(newDate, 'month');
  setScrollDate(newDate);
}

export { enhanceDay, withDateSelection };
