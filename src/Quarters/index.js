import React, { useCallback, useEffect, useMemo, useState } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import classNames from 'classnames';
import { emptyFn, getMonthsForYear, isRange, chunk } from '../utils';
import {
  startOfMonth,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isWithinRange,
  isSameMonth,
  parse,
  getMonth,
  addYears,
} from 'date-fns';
import styles from './quarters.scss';

const SPACING = 0;

const isDateDisabled = ({ date, min, minDate, max, maxDate }) => {
  return (
    isBefore(date, startOfMonth(min)) ||
    isBefore(date, startOfMonth(minDate)) ||
    isAfter(date, startOfMonth(max)) ||
    isAfter(date, startOfMonth(maxDate))
  );
};

const allowToSwitchYear = ({ selected, year, min, minDate, max, maxDate }) => {
  if (isRange(selected)) {
    return false;
  }

  return !isDateDisabled({
    date: new Date(selected).setYear(year),
    min,
    minDate,
    max,
    maxDate,
  });
};

const getSelected = (selected) => {
  if (isRange(selected)) {
    return {
      start: startOfMonth(selected.start),
      end: endOfMonth(selected.end),
    };
  }

  return {
    start: parse(format(selected, 'YYYY-MM-DD')),
    end: parse(format(selected, 'YYYY-MM-DD')),
  };
};

const Quarters = (props) => {
  const {
    height,
    hideOnSelect,
    locale,
    max,
    maxDate,
    min,
    minDate,
    scrollToDate,
    today,
    setDisplay,
    theme,
    handlers,
    width,
    onSelect = emptyFn,
    showQuarters = true,
    selected,
    years,
    fiscalYearStart = 1,
  } = props;
  const { start, end } = getSelected(selected);
  const selectedYearIndex = useMemo(() => {
    const yearsSliced = years.slice(0, years.length);
    return yearsSliced.indexOf(start.getFullYear());
  }, [years, start]);

  const handleClick = useCallback(
    (date, e) => {
      onSelect(date, e, (date) => scrollToDate(date));
      if (hideOnSelect) {
        window.requestAnimationFrame(() => setDisplay('quarters'));
      }
    },
    [hideOnSelect, onSelect, scrollToDate, setDisplay]
  );

  const renderMonths = useCallback(
    (chunked) => {
      return (
        <>
          <article className="quarter-label">
            {chunked.map((months, index) => {
              const isSelected = months.some((month) =>
                isWithinRange(month, start, end)
              );

              return (
                <label
                  key={`Q${index + 1}`}
                  className={classNames('label', {
                    [styles.selected]: isSelected,
                  })}
                >
                  <span>{`Q${index + 1}`}</span>
                </label>
              );
            })}
          </article>
          <article className="quarterly-view">
            {chunked.map((months) => {
              const isDisabled = months.some((month) => {
                const disabled = isDateDisabled({
                  date: month,
                  min,
                  minDate,
                  max,
                  maxDate,
                });
                return disabled;
              });
              const isSelected = months.some((month) =>
                isWithinRange(month, start, end)
              );

              return (
                <div key={`${getMonth(months[0])}`}>
                  <ol
                    className={classNames(styles.month, {
                      [styles.selected]: isSelected && !isDisabled,
                      [styles.disabled]: isDisabled,
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDisabled) {
                        handleClick(months[0], e);
                      }
                    }}
                    {...handlers}
                  >
                    {months.map((date, index) => {
                      return (
                        <li
                          key={index}
                          data-month={`${format(date, 'YYYY-MM')}`}
                          className={classNames({
                            [styles.selected]:
                              isSameMonth(date, start) ||
                              isSameMonth(date, end),
                          })}
                        >
                          <div className={styles.selection}>
                            {format(date, 'MMM', { locale })}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
            {}
          </article>
        </>
      );
    },
    [handleClick, handlers, locale, max, maxDate, min, minDate, start, end]
  );

  const currentYear = today.getFullYear();
  const yearsSliced = years.slice(0, years.length);
  const rowHeight = 164;
  const heights = yearsSliced.map((val, index) =>
    index === 0 || index === yearsSliced.length - 1
      ? rowHeight + SPACING
      : rowHeight
  );
  const isYearLess = yearsSliced.length * rowHeight < height + 40;
  const containerHeight = isYearLess
    ? yearsSliced.length * rowHeight + 2 * SPACING
    : height + 40;

  // Scroll to selected year
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    if (!isYearLess && selectedYearIndex !== -1) {
      const top = heights
        .slice(0, selectedYearIndex)
        .reduce((acc, val) => acc + val, 0);
      setScrollOffset(top);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = (scrollTop) => {
    setScrollOffset(scrollTop);
  };

  return (
    <VirtualList
      className={styles.list}
      width={width}
      height={containerHeight}
      itemCount={yearsSliced.length}
      estimatedItemSize={rowHeight}
      itemSize={(index) => heights[index]}
      scrollOffset={scrollOffset}
      onScroll={onScroll}
      renderItem={({ index, style }) => {
        const year = yearsSliced[index];
        const isActive = index === selectedYearIndex;
        const shouldAllowToSwitchYear = allowToSwitchYear({
          selected,
          year,
          min,
          minDate,
          max,
          maxDate,
        });

        const months = getMonthsForYear(year, start.getDate());

        const appendages = months
          .slice(0, fiscalYearStart - 1)
          .map((date) => addYears(date, 1));

        const fiscalYear = [
          ...months.slice(fiscalYearStart - 1, months.length),
          ...appendages,
        ];
        const chunked = chunk(fiscalYear, 4);
        return (
          <div
            key={index}
            className={classNames(styles.year, {
              [styles.active]: showQuarters && isActive,
              [styles.withQuarters]: showQuarters,
              [styles.first]: index === 0,
              [styles.last]: index === yearsSliced.length - 1,
            })}
            style={{
              ...style,
              ...{
                color:
                  typeof theme.selectionColor === 'function'
                    ? theme.selectionColor(new Date(year, 0, 1))
                    : theme.selectionColor,
              },
            }}
            onClick={(e) =>
              shouldAllowToSwitchYear &&
              handleClick(new Date(year, fiscalYearStart - 1, 1), e)
            }
          >
            <label
              className={classNames('year-label', {
                [styles.currentYear]: currentYear === year,
              })}
            >
              <span>{year}</span>
            </label>
            {showQuarters && renderMonths(chunked)}
          </div>
        );
      }}
    />
  );
};

export const defaultQuartersDisplayOptions = {
  showHeader: false,
  showWeekdays: false,
  hideYearsOnSelect: false,
};

export default Quarters;
