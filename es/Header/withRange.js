import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import React from 'react';
import { withImmutableProps } from '../utils/index.js';
import defaultSelectionRenderer from './defaultSelectionRenderer.js';
import styles from './Header.scss.js';

var enhanceHeader = withImmutableProps(function () {
  return {
    renderSelection: function renderSelection(values, props) {
      if (!values || !values.start && !values.end) {
        return null;
      }

      if (values.start === values.end) {
        return defaultSelectionRenderer(values.start, props);
      }

      var dateFormat = props.locale && props.locale.headerFormat || 'MMM do';
      return /*#__PURE__*/React.createElement("div", {
        className: styles.range,
        style: {
          color: props.theme.headerColor
        }
      }, defaultSelectionRenderer(values.start, _objectSpread(_objectSpread({}, props), {}, {
        dateFormat: dateFormat,
        key: 'start',
        shouldAnimate: false
      })), defaultSelectionRenderer(values.end, _objectSpread(_objectSpread({}, props), {}, {
        dateFormat: dateFormat,
        key: 'end',
        shouldAnimate: false
      })));
    }
  };
});

export default enhanceHeader;
