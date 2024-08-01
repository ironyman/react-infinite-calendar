import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { format, startOfWeek, endOfWeek } from '../utils/dateFnV2';
import styles from './Header.scss';
import animation from './Animation.scss';
import { parseDate } from '../utils/parse';

export default function defaultSelectionRenderer(
  value,
  {
    display,
    key,
    locale: { locale },
    dateFormat,
    onYearClick,
    scrollToDate,
    setDisplay,
    shouldAnimate,
    isWeeklySelection,
  }
) {
  let date = parseDate(value);

  if (isWeeklySelection) {
    if (key === 'start') {
      date = startOfWeek(date);
    } else {
      date = endOfWeek(date);
    }
  }
  const values = date && [
    {
      active: display === 'years',
      handleClick: (e) => {
        onYearClick(date, e, key);
        setDisplay('years');
      },
      item: 'year',
      title: display === 'days' ? `Change year` : null,
      value: date.getFullYear(),
    },
    {
      active: display === 'days',
      handleClick: () => {
        if (display !== 'days') {
          setDisplay('days');
        } else if (date) {
          scrollToDate(date, -40, true);
        }
      },
      item: 'day',
      title:
        display === 'days'
          ? `Scroll to ${format(date, dateFormat, locale)}`
          : null,
      value: format(date, dateFormat, locale, true),
    },
  ];

  return (
    <div
      key={key}
      className={styles.wrapper}
      aria-label={format(date, dateFormat + ' yyyy', locale)}
    >
      <TransitionGroup component={null}>
        {values.map(({ handleClick, item, value, active, title }) => {
          // Div wrapping CSSTransition causes
          // Warning: Received `true` for a non-boolean attribute `in`.
          // See https://github.com/reactjs/react-transition-group/issues/561
          // Not sure why.
          return (
            <CSSTransition
              key={item}
              classNames={animation}
              timeout={{ exit: 250, enter: 250 }}
              enter={shouldAnimate}
              leave={shouldAnimate.toString()}
            >
              <div
                className={classNames(styles.dateWrapper, styles[item], {
                  [styles.active]: active,
                })}
                title={title}
              >
                <span
                  key={`${item}-${value}`}
                  className={styles.date}
                  aria-hidden={true}
                  onClick={handleClick}
                >
                  {value}
                </span>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
