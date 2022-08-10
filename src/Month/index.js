import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import { getDateString } from '../utils';
import {
  addWeeks,
  endOfWeek,
  format,
  getDay,
  getMonth,
  isSameDay,
  isSameWeek,
  isSameYear,
  startOfWeek,
} from '../utils/dateFnV2';
import styles from './Month.scss';
import dayStyles from '../Day/Day.scss';

const Row = React.memo(({ isPartialRow, label, edge, height, days }) => (
  <ul
    className={classNames(styles.row, {
      [styles.partial]: isPartialRow,
      [dayStyles.edge]: edge,
    })}
    style={{ height: height }}
    role="row"
    aria-label={label}
  >
    {days}
  </ul>
));

const Month = ({
  locale,
  showOverlay,
  style,
  DayComponent,
  disabledDates,
  disabledDays,
  monthDate,
  maxDate,
  minDate,
  rowHeight,
  rows,
  selected,
  today,
  theme,
  passThrough,
}) => {
  const renderRows = useCallback(() => {
    const currentYear = today.getFullYear();
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthShort = format(monthDate, 'MMM', locale?.locale);
    const monthRows = [];
    let day = 0;
    let isDisabled = false;
    let isToday = false;

    const { isWeeklySelection } = passThrough.Day || {};
    let { start, end } = selected;
    if (isWeeklySelection) {
      start = format(startOfWeek(start), 'yyyy-MM-dd');
      end = format(endOfWeek(end), 'yyyy-MM-dd');
    }
    const edgeRows = {};

    let date, days, dow, row;

    // Used for faster comparisons
    const _today = format(today, 'yyyy-MM-dd');
    let _minDate = format(minDate, 'yyyy-MM-dd');
    let _maxDate = format(maxDate, 'yyyy-MM-dd');

    // disable partial weeks for weekly selection
    if (isWeeklySelection) {
      const weekStartOfMin = startOfWeek(minDate);
      if (!isSameDay(minDate, weekStartOfMin)) {
        _minDate = format(addWeeks(weekStartOfMin, 1), 'yyyy-MM-dd');
      }

      const weekEndOfMax = endOfWeek(maxDate);
      if (!isSameDay(maxDate, weekEndOfMax)) {
        _maxDate = format(addWeeks(weekEndOfMax, -1), 'yyyy-MM-dd');
      }
    }

    // Oh the things we do in the name of performance...
    for (let i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      dow = getDay(new Date(year, month, row[0]));

      for (let k = 0, len = row.length; k < len; k++) {
        day = row[k];

        date = getDateString(year, month, day);
        isToday = date === _today;

        if (isWeeklySelection) {
          edgeRows[i] = isSameWeek(start, date) || isSameWeek(end, date);
        }

        isDisabled =
          (minDate && date < _minDate) ||
          (maxDate && date > _maxDate) ||
          (disabledDays &&
            disabledDays.length &&
            disabledDays.indexOf(dow) !== -1) ||
          (disabledDates &&
            disabledDates.length &&
            disabledDates.indexOf(date) !== -1);

        days[k] = (
          <DayComponent
            key={`day-${day}`}
            currentYear={currentYear}
            date={date}
            day={day}
            selected={selected}
            isDisabled={isDisabled}
            isToday={isToday}
            locale={locale}
            month={month}
            monthShort={monthShort}
            theme={theme}
            year={year}
            {...passThrough.Day}
          />
        );

        dow += 1;
      }
      monthRows[i] = (
        <Row
          isPartialRow={row.length !== 7}
          key={`Row-${i}`}
          label={`Week ${i + 1}`}
          edge={edgeRows[i]}
          height={rowHeight}
          days={days}
        />
      );
    }

    return monthRows;
  }, [
    disabledDates,
    disabledDays,
    locale,
    maxDate,
    minDate,
    monthDate,
    passThrough.Day,
    rowHeight,
    rows,
    selected,
    theme,
    today,
  ]);

  const dateFormat = isSameYear(monthDate, today) ? 'MMMM' : 'MMMM yyyy';
  const month = getMonth(monthDate);

  return (
    <div
      className={classNames(styles.root, {
        [styles.even]: month % 2 === 0,
        [styles.odd]: month % 2 === 1,
      })}
      style={{ ...style, lineHeight: `${rowHeight}px` }}
    >
      <div className={styles.rows}>
        {renderRows()}
        {showOverlay && (
          <label
            className={classNames(styles.label, {
              [styles.partialFirstRow]: rows[0].length !== 7,
            })}
            style={{ backgroundColor: theme.overlayColor }}
          >
            <span>{format(monthDate, dateFormat, locale?.locale)}</span>
          </label>
        )}
      </div>
    </div>
  );
};

export default memo(Month);
