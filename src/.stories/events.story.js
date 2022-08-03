/* eslint-disable sort-keys */
import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withDateSelection,
  withKeyboardSupport,
  withMultipleDates,
  withRange,
  withMonthRange,
} from '..';
import styles from './stories.scss';

// Date manipulation utils
import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addMonths,
  endOfMonth,
  format,
  isBefore,
  subMonths,
} from '../utils/dateFnV2';

const today = new Date();

storiesOf('Events', module)
  .add('On Select', () => (
    <InfiniteCalendar
      onSelect={(date) =>
        alert(`You selected: ${format(date, 'ddd, MMM do yyyy')}`)
      }
    />
  ))
  .add('On Scroll', () => [
    <label key="label">Check your console logs.</label>,
    <InfiniteCalendar
      key="calendar"
      onScroll={(scrollTop) =>
        console.info('onScroll() – Scroll top:', scrollTop)
      }
    />,
  ]);