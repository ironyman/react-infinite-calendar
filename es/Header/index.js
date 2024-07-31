import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';
import { emptyFn } from '../utils/index.js';
import defaultSelectionRenderer from './defaultSelectionRenderer.js';
import classNames from 'classnames';
import styles from './Header.scss.js';

var Header = function Header(props) {
  var layout = props.layout,
      blank = props.locale.blank,
      selected = props.selected,
      renderSelection = props.renderSelection,
      theme = props.theme;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.root, _defineProperty({}, styles.landscape, layout === 'landscape')),
    style: {
      backgroundColor: theme.headerColor,
      color: theme.textColor.active
    }
  }, selected && renderSelection(selected, props) || /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.wrapper, styles.blank)
  }, blank));
};
Header.defaultProps = {
  onYearClick: emptyFn,
  renderSelection: defaultSelectionRenderer
};

export default Header;
