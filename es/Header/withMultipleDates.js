import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import { withImmutableProps } from '../utils/index.js';
import defaultSelectionRenderer from './defaultSelectionRenderer.js';
import Slider from './Slider/index.js';
import { format } from '../utils/dateFnV2.js';
import { parseDate } from '../utils/parse.js';

var enhanceHeader = withImmutableProps(function (_ref) {
  var setDisplayDate = _ref.setDisplayDate;
  return {
    renderSelection: function renderSelection(values, _ref2) {
      var scrollToDate = _ref2.scrollToDate,
          displayDate = _ref2.displayDate,
          props = _objectWithoutProperties(_ref2, ["scrollToDate", "displayDate"]);

      if (!values.length) {
        return null;
      }

      var dates = values.sort();
      var index = values.indexOf(format(parseDate(displayDate), 'yyyy-MM-dd'));
      return /*#__PURE__*/React.createElement(Slider, {
        index: index !== -1 ? index : dates.length - 1,
        onChange: function onChange(index) {
          return setDisplayDate(dates[index], function () {
            return setTimeout(function () {
              return scrollToDate(dates[index], 0, true);
            }, 50);
          });
        }
      }, dates.map(function (value) {
        return defaultSelectionRenderer(value, _objectSpread(_objectSpread({}, props), {}, {
          key: index,
          scrollToDate: scrollToDate,
          shouldAnimate: false
        }));
      }));
    }
  };
});

export default enhanceHeader;
