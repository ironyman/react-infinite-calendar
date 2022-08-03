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

storiesOf('Internationalization', module)
  .add('Locale', () => (
    <InfiniteCalendar
      locale={{
        blank: 'Aucune date sélectionnée',
        headerFormat: 'EEEE, d MMM',
        locale: require('date-fns/locale/fr'),
        todayLabel: {
          long: "Aujourd'hui",
          short: 'Auj.',
        },
        weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      }}
    />
  ))
  .add('First Day of the Week', () => (
    <InfiniteCalendar
      locale={{
        weekStartsOn: 1,
      }}
    />
  ));