import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { startOfWeek, endOfWeek, format } from '../utils/dateFnV2.js';
import styles from './Header.scss.js';
import animation from './Animation.scss.js';
import { parseDate } from '../utils/parse.js';

function defaultSelectionRenderer(value, _ref) {
  var display = _ref.display,
      key = _ref.key,
      locale = _ref.locale.locale,
      dateFormat = _ref.dateFormat,
      onYearClick = _ref.onYearClick,
      scrollToDate = _ref.scrollToDate,
      setDisplay = _ref.setDisplay,
      shouldAnimate = _ref.shouldAnimate,
      isWeeklySelection = _ref.isWeeklySelection;
  var date = parseDate(value);

  if (isWeeklySelection) {
    if (key === 'start') {
      date = startOfWeek(date);
    } else {
      date = endOfWeek(date);
    }
  }

  var values = date && [{
    active: display === 'years',
    handleClick: function handleClick(e) {
      onYearClick(date, e, key);
      setDisplay('years');
    },
    item: 'year',
    title: display === 'days' ? "Change year" : null,
    value: date.getFullYear()
  }, {
    active: display === 'days',
    handleClick: function handleClick() {
      if (display !== 'days') {
        setDisplay('days');
      } else if (date) {
        scrollToDate(date, -40, true);
      }
    },
    item: 'day',
    title: display === 'days' ? "Scroll to ".concat(format(date, dateFormat, locale)) : null,
    value: format(date, dateFormat, locale)
  }];
  return /*#__PURE__*/React.createElement("div", {
    key: key,
    className: styles.wrapper,
    "aria-label": format(date, dateFormat + ' yyyy', locale)
  }, /*#__PURE__*/React.createElement(TransitionGroup, {
    component: null
  }, values.map(function (_ref2) {
    var handleClick = _ref2.handleClick,
        item = _ref2.item,
        value = _ref2.value,
        active = _ref2.active,
        title = _ref2.title;
    // Div wrapping CSSTransition causes
    // Warning: Received `true` for a non-boolean attribute `in`.
    // See https://github.com/reactjs/react-transition-group/issues/561
    // Not sure why.
    return /*#__PURE__*/React.createElement(CSSTransition, {
      key: item,
      classNames: animation,
      timeout: {
        exit: 250,
        enter: 250
      },
      enter: shouldAnimate,
      leave: shouldAnimate.toString()
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames(styles.dateWrapper, styles[item], _defineProperty({}, styles.active, active)),
      title: title
    }, /*#__PURE__*/React.createElement("span", {
      key: "".concat(item, "-").concat(value),
      className: styles.date,
      "aria-hidden": true,
      onClick: handleClick
    }, value)));
  })));
}

export default defaultSelectionRenderer;
