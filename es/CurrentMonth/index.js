import React from 'react';
import { format } from '../utils/dateFnV2.js';
import defaultLocale from '../utils/defaultLocale.js';
import styles from './CurrentMonth.scss.js';

var CurrentMonth = function CurrentMonth(_ref) {
  var currentMonth = _ref.currentMonth,
      theme = _ref.theme;
  return currentMonth ? /*#__PURE__*/React.createElement("div", {
    className: styles.root,
    style: {
      backgroundColor: theme.floatingNav.background,
      color: theme.floatingNav.color
    }
  }, format(currentMonth, defaultLocale.monthLabelFormat).toUpperCase()) : null;
};

export default CurrentMonth;
