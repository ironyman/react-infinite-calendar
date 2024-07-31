'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dateFn = require('date-fns');

var parseDate = function parseDate(date) {
  if (date instanceof Date) {
    return date;
  } // Note ParseISO is not gonna work with 2020-1-1 format. yyyy-MM-dd ONLY


  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return dateFn.parseISO(date);
  }

  return new Date(date);
};

exports.parseDate = parseDate;
