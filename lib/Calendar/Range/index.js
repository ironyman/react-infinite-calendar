'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../utils/index.js');

var EVENT_TYPE = {
  END: 3,
  HOVER: 2,
  START: 1
};
function getSortedSelection(_ref) {
  var start = _ref.start,
      end = _ref.end;
  return index.getSortedDate(start, end);
}
function getInitialDate(_ref2) {
  var selected = _ref2.selected;
  return selected && selected.start || new Date();
}

exports.EVENT_TYPE = EVENT_TYPE;
exports.getInitialDate = getInitialDate;
exports.getSortedSelection = getSortedSelection;
