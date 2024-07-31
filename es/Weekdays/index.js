import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import React from 'react';
import { scrollbarSize } from '../utils/index.js';
import styles from './Weekdays.scss.js';

var Weekdays = function Weekdays(_ref) {
  var weekdays = _ref.weekdays,
      weekStartsOn = _ref.weekStartsOn,
      theme = _ref.theme;
  var orderedWeekdays = [].concat(_toConsumableArray(weekdays.slice(weekStartsOn, 7)), _toConsumableArray(weekdays.slice(0, weekStartsOn)));
  return /*#__PURE__*/React.createElement("ul", {
    className: styles.root,
    style: {
      backgroundColor: theme.weekdayColor,
      color: theme.textColor.active,
      paddingRight: scrollbarSize
    },
    "aria-hidden": true
  }, orderedWeekdays.map(function (val) {
    return /*#__PURE__*/React.createElement("li", {
      key: "Weekday-".concat(val),
      className: styles.day
    }, val);
  }));
};

export default Weekdays;
