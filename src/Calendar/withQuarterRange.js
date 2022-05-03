import {
  min,
  max,
  getMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';
import { compose, withProps, withState } from 'recompose';
import { withDefaultProps } from './';
import { withImmutableProps } from '../utils';
import { EVENT_TYPE, getInitialDate, getSortedSelection } from './Range';

let isTouchDevice = false;

export const withQuarterRange = compose(
  withDefaultProps,
  withState('scrollDate', 'setScrollDate', getInitialDate),
  withState('selectionStart', 'setSelectionStart', null),
  withImmutableProps(({ QuartersComponent }) => ({
    QuartersComponent: QuartersComponent,
  })),
  withState('hoveredDate', 'setHoveredDate', getInitialDate),
  withProps(({ passThrough, selected, hoveredDate, ...props }) => ({
    /* eslint-disable sort-keys */
    passThrough: {
      ...passThrough,
      Quarters: {
        hoveredDate: hoveredDate,
        onSelect: (date) => {
          if (props.selectionStart) {
            return handleSelect(endOfMonth(addMonths(date, 2)), {
              selected,
              ...props,
            });
          }

          return handleSelect(date, { selected, ...props });
        },
        handlers: {
          onMouseOver:
            !isTouchDevice && props.selectionStart
              ? (e) => handleMouseOver(e, { selected, ...props })
              : null,
        },
      },
      Years: {
        onSelect: (date) => handleSelect(date, { selected, ...props }),
        handlers: {
          onMouseOver:
            !isTouchDevice && props.selectionStart
              ? (e) => handleMouseOver(e, { selected, ...props })
              : null,
        },
      },
    },
    selected: {
      start: selected && selected.start,
      end: selected && selected.end,
    },
  }))
);

function handleSelect(
  date,
  {
    onSelect,
    selectionStart,
    setSelectionStart,
    min,
    max,
    minDate,
    maxDate,
    fiscalYearStart,
  }
) {
  if (selectionStart) {
    onSelect({
      eventType: EVENT_TYPE.END,
      ...getMonthRangeDate({
        start: selectionStart,
        end: date,
        minSelected: minDate,
        maxSelected: maxDate,
        fiscalYearStart,
      }),
    });
    setSelectionStart(null);
  } else {
    onSelect({
      eventType: EVENT_TYPE.START,
      ...getMonthRangeDate({
        start: date,
        end: date,
        minSelected: minDate,
        maxSelected: maxDate,
        fiscalYearStart,
      }),
    });
    setSelectionStart(date);
  }
}

function handleMouseOver(e, { onSelect, selectionStart, fiscalYearStart }) {
  e.stopPropagation();
  const month = e.target.getAttribute('data-month');
  if (!month) {
    return;
  }
  onSelect({
    eventType: EVENT_TYPE.HOVER,
    ...getMonthRangeDate({
      start: selectionStart,
      end: month,
      fiscalYearStart,
    }),
  });
}

function startOfQuarter(date, fiscalYearStart) {
  const month = getMonth(date);
  const offset = (month + 12 - fiscalYearStart) % 4;
  const startQuarterMonth = startOfMonth(addMonths(date, -offset));
  return startQuarterMonth;
}

function endOfQuarter(date, fiscalYearStart) {
  const month = getMonth(date);
  const offset = 2 - ((month + 12 - fiscalYearStart) % 4);
  const endQuarterMonth = endOfMonth(addMonths(date, offset));
  return endQuarterMonth;
}

function getMonthRangeDate({
  start,
  end,
  minSelected,
  maxSelected,
  fiscalYearStart,
}) {
  const sortedDate = getSortedSelection({ start, end });
  const compareStartDate = [];
  const compareEndDate = [];
  if (sortedDate.start) {
    compareStartDate.push(startOfQuarter(sortedDate.start, fiscalYearStart));
    minSelected && compareStartDate.push(minSelected);
  }
  if (sortedDate.end) {
    compareEndDate.push(endOfQuarter(sortedDate.end, fiscalYearStart));
    maxSelected && compareEndDate.push(maxSelected);
  }
  return {
    start:
      compareStartDate.length > 0 ? max(...compareStartDate) : sortedDate.start,
    end: compareEndDate.length > 0 ? min(...compareEndDate) : sortedDate.end,
  };
}

if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', function onTouch() {
    isTouchDevice = true;

    window.removeEventListener('touchstart', onTouch, false);
  });
}
