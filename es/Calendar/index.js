import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { Component } from 'react';
import classNames from 'classnames';
import { emptyFn, ScrollSpeed, debounce, getValidSelection, range } from '../utils/index.js';
import { defaultProps } from 'recompose';
import displayOptions from '../utils/defaultDisplayOptions.js';
import defaultLocale from '../utils/defaultLocale.js';
import defaultTheme from '../utils/defaultTheme.js';
import Today, { DIRECTION_UP, DIRECTION_DOWN } from '../Today/index.js';
import CurrentMonth from '../CurrentMonth/index.js';
import Header from '../Header/index.js';
import MonthList from '../MonthList/index.js';
import Weekdays from '../Weekdays/index.js';
import Quarters, { defaultQuartersDisplayOptions } from '../Quarters/index.js';
import Years from '../Years/index.js';
import Day from '../Day/index.js';
import { format, startOfDay } from '../utils/dateFnV2.js';
import { parseDate } from '../utils/parse.js';
import containerStyles from './Container.scss.js';

var withDefaultProps = defaultProps({
  autoFocus: true,
  DayComponent: Day,
  display: 'days',
  displayOptions: {},
  HeaderComponent: Header,
  height: 500,
  isWeeklySelection: false,
  isQuarterlySelection: false,
  keyboardSupport: true,
  max: new Date(2050, 11, 31),
  maxDate: new Date(2050, 11, 31),
  min: new Date(1980, 0, 1),
  minDate: new Date(1980, 0, 1),
  onHighlightedDateChange: emptyFn,
  onScroll: emptyFn,
  onScrollEnd: emptyFn,
  onSelect: emptyFn,
  onRendered: emptyFn,
  passThrough: {},
  rowHeight: 40,
  tabIndex: 1,
  width: 400,
  YearsComponent: Years,
  QuartersComponent: Quarters,
  fiscalYearStart: 1
});

var Calendar = /*#__PURE__*/function (_Component) {
  _inherits(Calendar, _Component);

  var _super = _createSuper(Calendar);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.apply(this, arguments);

    _defineProperty(_assertThisInitialized(_this), "_displayOptions", {});

    _defineProperty(_assertThisInitialized(_this), "_locale", {});

    _defineProperty(_assertThisInitialized(_this), "_theme", {});

    _defineProperty(_assertThisInitialized(_this), "getCurrentOffset", function () {
      return _this.scrollTop;
    });

    _defineProperty(_assertThisInitialized(_this), "getDateOffset", function (date) {
      return _this._MonthList && _this._MonthList.current && _this._MonthList.current.getDateOffset(date);
    });

    _defineProperty(_assertThisInitialized(_this), "scrollTo", function (offset) {
      return _this._MonthList && _this._MonthList.current && _this._MonthList.current.scrollTo(offset);
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToDate", function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
      var offset = arguments.length > 1 ? arguments[1] : undefined;
      var shouldAnimate = arguments.length > 2 ? arguments[2] : undefined;
      var display = _this.props.display;
      return _this._MonthList && _this._MonthList.current && _this._MonthList.current.scrollToDate(date, offset, shouldAnimate && display === 'days', function () {
        return _this.setState({
          isScrolling: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollSpeed", new ScrollSpeed().getScrollSpeed);

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function (scrollTop, e) {
      var _this$props = _this.props,
          onScroll = _this$props.onScroll,
          rowHeight = _this$props.rowHeight;
      var isScrolling = _this.state.isScrolling;

      var _this$getDisplayOptio = _this.getDisplayOptions(),
          showCurrentMonth = _this$getDisplayOptio.showCurrentMonth,
          showTodayHelper = _this$getDisplayOptio.showTodayHelper,
          showOverlay = _this$getDisplayOptio.showOverlay;

      var scrollSpeed = Math.abs(_this.getScrollSpeed(scrollTop));
      _this.scrollTop = scrollTop; // We only want to display the months overlay if the user is rapidly scrolling

      if (showOverlay && scrollSpeed > rowHeight && !isScrolling) {
        _this.setState({
          isScrolling: true
        });
      }

      if (showCurrentMonth) {
        _this.updateCurrentMonth();
      }

      if (showTodayHelper) {
        _this.updateTodayHelperPosition(scrollSpeed);
      }

      onScroll(scrollTop, e);

      _this.handleScrollEnd();
    });

    _defineProperty(_assertThisInitialized(_this), "handleScrollEnd", debounce(function () {
      var onScrollEnd = _this.props.onScrollEnd;
      var isScrolling = _this.state.isScrolling;

      var _this$getDisplayOptio2 = _this.getDisplayOptions(),
          showTodayHelper = _this$getDisplayOptio2.showTodayHelper;

      if (isScrolling) {
        _this.setState({
          isScrolling: false
        });
      }

      if (showTodayHelper) {
        _this.updateTodayHelperPosition(0);
      }

      onScrollEnd(_this.scrollTop);
    }, 150));

    _defineProperty(_assertThisInitialized(_this), "handleRendered", function (startIndex) {
      var onRendered = _this.props.onRendered; // startIndex is months from Jan 1980.

      onRendered(startIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "updateCurrentMonth", function () {
      _this._MonthList && _this._MonthList.current && _this.setState({
        currentMonth: _this._MonthList.current.currentMonth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateTodayHelperPosition", function (scrollSpeed) {
      var today = _this.today;
      var scrollTop = _this.scrollTop;
      var showToday = _this.state.showToday;
      var _this$props2 = _this.props,
          height = _this$props2.height,
          rowHeight = _this$props2.rowHeight;

      var _this$getDisplayOptio3 = _this.getDisplayOptions(),
          todayHelperRowOffset = _this$getDisplayOptio3.todayHelperRowOffset;

      var newState;

      if (!_this._todayOffset) {
        _this._todayOffset = _this.getDateOffset(today);
      } // Today is above the fold


      if (scrollTop >= _this._todayOffset + (height - rowHeight) / 2 + rowHeight * todayHelperRowOffset) {
        if (showToday !== DIRECTION_UP) newState = DIRECTION_UP;
      } // Today is below the fold
      else if (scrollTop <= _this._todayOffset - height / 2 - rowHeight * (todayHelperRowOffset + 1)) {
          if (showToday !== DIRECTION_DOWN) newState = DIRECTION_DOWN;
        } else if (showToday && scrollSpeed <= 1) {
          newState = false;
        }

      if (scrollTop === 0) {
        newState = false;
      }

      if (newState != null) {
        _this.setState({
          showToday: newState
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setDisplay", function (display) {
      _this.setState({
        display: display
      });
    });

    _this.updateYears(props);

    _this.state = {
      display: props.display
    };
    _this._MonthList = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var autoFocus = this.props.autoFocus;

      var _this$getDisplayOptio4 = this.getDisplayOptions(),
          showCurrentMonth = _this$getDisplayOptio4.showCurrentMonth;

      if (autoFocus) {
        this.node.focus();
      }

      if (showCurrentMonth) {
        this.updateCurrentMonth();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(nextProps) {
      var _this$props3 = this.props,
          min = _this$props3.min,
          minDate = _this$props3.minDate,
          max = _this$props3.max,
          maxDate = _this$props3.maxDate;

      if (nextProps.min !== min || nextProps.minDate !== minDate || nextProps.max !== max || nextProps.maxDate !== maxDate) {
        this.updateYears(nextProps);
      }

      if (nextProps.display !== this.props.display) {
        this.setState({
          display: nextProps.display
        });
      }
    }
  }, {
    key: "updateYears",
    value: function updateYears() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      this._min = parseDate(props.min);
      this._max = parseDate(props.max);
      this._minDate = parseDate(props.minDate);
      this._maxDate = parseDate(props.maxDate);

      var min = this._min.getFullYear();

      var minMonth = this._min.getMonth();

      var max = this._max.getFullYear();

      var maxMonth = this._max.getMonth();

      var months = [];
      var year, month;

      for (year = min; year <= max; year++) {
        for (month = 0; month < 12; month++) {
          if (year === min && month < minMonth || year === max && month > maxMonth) {
            continue;
          }

          months.push({
            month: month,
            year: year
          });
        }
      }

      this.months = months;
    }
  }, {
    key: "getDisabledDates",
    value: function getDisabledDates(disabledDates) {
      return disabledDates && disabledDates.map(function (date) {
        return format(parseDate(date), 'yyyy-MM-dd');
      });
    }
  }, {
    key: "getDisplayOptions",
    value: function getDisplayOptions() {
      var displayOptions$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.displayOptions;
      return Object.assign(this._displayOptions, displayOptions, displayOptions$1, this.props.display === 'quarters' ? defaultQuartersDisplayOptions : {});
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return Object.assign(this._locale, defaultLocale, this.props.locale);
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      return Object.assign(this._theme, defaultTheme, this.props.theme);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          className = _this$props4.className,
          passThrough = _this$props4.passThrough,
          DayComponent = _this$props4.DayComponent,
          disabledDays = _this$props4.disabledDays,
          displayDate = _this$props4.displayDate,
          height = _this$props4.height,
          HeaderComponent = _this$props4.HeaderComponent,
          rowHeight = _this$props4.rowHeight,
          scrollDate = _this$props4.scrollDate,
          initialScrollDate = _this$props4.initialScrollDate,
          selected = _this$props4.selected,
          tabIndex = _this$props4.tabIndex,
          width = _this$props4.width,
          YearsComponent = _this$props4.YearsComponent,
          QuartersComponent = _this$props4.QuartersComponent,
          minDate = _this$props4.minDate,
          maxDate = _this$props4.maxDate,
          min = _this$props4.min,
          max = _this$props4.max,
          fiscalYearStart = _this$props4.fiscalYearStart;

      var _this$getDisplayOptio5 = this.getDisplayOptions(),
          hideYearsOnSelect = _this$getDisplayOptio5.hideYearsOnSelect,
          layout = _this$getDisplayOptio5.layout,
          overscanMonthCount = _this$getDisplayOptio5.overscanMonthCount,
          shouldHeaderAnimate = _this$getDisplayOptio5.shouldHeaderAnimate,
          showCurrentMonth = _this$getDisplayOptio5.showCurrentMonth,
          showHeader = _this$getDisplayOptio5.showHeader,
          showMonthsForYears = _this$getDisplayOptio5.showMonthsForYears,
          showOverlay = _this$getDisplayOptio5.showOverlay,
          showTodayHelper = _this$getDisplayOptio5.showTodayHelper,
          showWeekdays = _this$getDisplayOptio5.showWeekdays;

      var _this$state = this.state,
          display = _this$state.display,
          isScrolling = _this$state.isScrolling,
          showToday = _this$state.showToday,
          currentMonth = _this$state.currentMonth;
      var disabledDates = this.getDisabledDates(this.props.disabledDates);
      var locale = this.getLocale();
      var theme = this.getTheme();
      var today = this.today = startOfDay(new Date());
      var validSelection = getValidSelection(selected, minDate || min, maxDate || max);
      return /*#__PURE__*/React.createElement("div", Object.assign({
        tabIndex: tabIndex,
        className: classNames(className, containerStyles.root, _defineProperty({}, containerStyles.landscape, layout === 'landscape')),
        style: {
          color: theme.textColor["default"],
          width: width
        },
        "aria-label": "Calendar",
        ref: function ref(node) {
          _this2.node = node;
        }
      }, passThrough.rootNode), showHeader && /*#__PURE__*/React.createElement(HeaderComponent, Object.assign({
        selected: validSelection,
        shouldAnimate: Boolean(shouldHeaderAnimate && display !== 'years'),
        layout: layout,
        theme: theme,
        locale: locale,
        scrollToDate: this.scrollToDate,
        setDisplay: this.setDisplay,
        dateFormat: locale.headerFormat,
        display: display,
        displayDate: displayDate
      }, passThrough.Header)), /*#__PURE__*/React.createElement("div", {
        className: containerStyles.wrapper
      }, showWeekdays && /*#__PURE__*/React.createElement(Weekdays, {
        weekdays: locale.weekdays,
        weekStartsOn: locale.weekStartsOn,
        theme: theme
      }), /*#__PURE__*/React.createElement("div", {
        className: containerStyles.listWrapper
      }, showCurrentMonth && /*#__PURE__*/React.createElement(CurrentMonth, {
        currentMonth: currentMonth,
        theme: theme
      }), showTodayHelper && /*#__PURE__*/React.createElement(Today, {
        scrollToDate: this.scrollToDate,
        show: showToday,
        today: today,
        theme: theme,
        todayLabel: locale.todayLabel["long"]
      }), display !== 'quarters' && /*#__PURE__*/React.createElement(MonthList, {
        ref: this._MonthList,
        DayComponent: DayComponent,
        disabledDates: disabledDates,
        disabledDays: disabledDays,
        height: height,
        isScrolling: isScrolling,
        locale: locale,
        maxDate: this._maxDate,
        min: this._min,
        minDate: this._minDate,
        months: this.months,
        onScroll: this.handleScroll,
        onRendered: this.handleRendered,
        overscanMonthCount: overscanMonthCount,
        passThrough: passThrough,
        theme: theme,
        today: today,
        rowHeight: rowHeight,
        selected: validSelection,
        scrollDate: scrollDate,
        showOverlay: showOverlay,
        width: width,
        initialScrollDate: initialScrollDate
      })), display === 'quarters' && /*#__PURE__*/React.createElement(QuartersComponent, Object.assign({
        height: height,
        locale: locale,
        max: this._max,
        maxDate: this._maxDate,
        min: this._min,
        minDate: this._minDate,
        scrollToDate: this.scrollToDate,
        selected: validSelection,
        setDisplay: this.setDisplay,
        theme: theme,
        today: today,
        width: width,
        years: range(this._min.getFullYear(), this._max.getFullYear() + 1),
        fiscalYearStart: fiscalYearStart
      }, passThrough.Quarters)), display === 'years' && /*#__PURE__*/React.createElement(YearsComponent, Object.assign({
        height: height,
        hideOnSelect: hideYearsOnSelect,
        locale: locale,
        max: this._max,
        maxDate: this._maxDate,
        min: this._min,
        minDate: this._minDate,
        scrollToDate: this.scrollToDate,
        selected: validSelection,
        setDisplay: this.setDisplay,
        showMonths: showMonthsForYears,
        theme: theme,
        today: today,
        width: width,
        years: range(this._min.getFullYear(), this._max.getFullYear() + 1)
      }, passThrough.Years))));
    }
  }]);

  return Calendar;
}(Component);

export default Calendar;
export { withDefaultProps };
