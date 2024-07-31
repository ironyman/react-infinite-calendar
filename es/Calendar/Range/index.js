import { getSortedDate } from '../../utils/index.js';

var EVENT_TYPE = {
  END: 3,
  HOVER: 2,
  START: 1
};
function getSortedSelection(_ref) {
  var start = _ref.start,
      end = _ref.end;
  return getSortedDate(start, end);
}
function getInitialDate(_ref2) {
  var selected = _ref2.selected;
  return selected && selected.start || new Date();
}

export { EVENT_TYPE, getInitialDate, getSortedSelection };
