import React, { Component } from 'react';
import Calendar from './Calendar';
import { withDateSelection } from './Calendar/withDateSelection';

export { default as Calendar } from './Calendar';
export { withDateSelection } from './Calendar/withDateSelection';
export { withKeyboardSupport } from './Calendar/withKeyboardSupport';
export {
  withMultipleDates,
  defaultMultipleDateInterpolation,
} from './Calendar/withMultipleDates';
export { withRange } from './Calendar/withRange';
export { EVENT_TYPE } from './Calendar/Range';
export { withMonthRange } from './Calendar/withMonthRange';
export { withQuarterRange } from './Calendar/withQuarterRange';

// https://github.com/acdlite/recompose/issues/640
// const withForwardingRef = <Props extends {[_: string]: any}>(BaseComponent: React.ReactType<Props>) =>
//   React.forwardRef((props, ref) => <BaseComponent {...props} forwardedRef={ref} />);

const withForwardingRef = (BaseComponent) =>
  React.forwardRef((props, ref) => <BaseComponent {...props} forwardedRef={ref} />);


/*
 * By default, Calendar is a controlled component.
 * Export a sensible default for minimal setup
 */
export default class DefaultCalendar extends Component {
  static defaultProps = {
    // Component:  React.forwardRef(function (props, ref) { return withDateSelection(Calendar)({...props, ref}) }),
    // Component: withDateSelection(Calendar),
    Component: withForwardingRef(withDateSelection(Calendar)),

    interpolateSelection: (selected) => selected,
  };
  state = {
    selected:
      typeof this.props.selected !== 'undefined'
        ? this.props.selected
        : new Date(),
  };

  _getRef = (ref) => {
    this.calendar = ref;
  };
  componentDidUpdate({ selected }) {
    if (selected !== this.props.selected) {
      this.setState({ selected });
    }
  }
  handleSelect = (selected, reason) => {
    const { onSelect, interpolateSelection } = this.props;

    if (typeof onSelect === 'function') {
      onSelect(selected, reason);
    }

    this.setState({
      selected: interpolateSelection(selected, this.state.selected),
    });
  };
  scrollToDate = (date) => {
    this.calendar && this.calendar.scrollToDate(date, -40);
  };
  render() {
    // eslint-disable-next-line no-unused-vars
    const { Component, interpolateSelection, ...props } = this.props;

    return (
      <Component
        {...props}
        ref={this._getRef}
        onSelect={this.handleSelect}
        selected={this.state.selected}
      />
    );
  }
}
