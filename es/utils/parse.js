import { parseISO } from 'date-fns';

var parseDate = function parseDate(date) {
  if (date instanceof Date) {
    return date;
  } // Note ParseISO is not gonna work with 2020-1-1 format. yyyy-MM-dd ONLY


  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return parseISO(date);
  }

  return new Date(date);
};

export { parseDate };
