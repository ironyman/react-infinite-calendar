import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { Component } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import classNames from 'classnames';
import { getMonth, getWeeksInMonth, getWeek, emptyFn } from '../utils/index.js';
import { isSameMonth, addMonths, startOfMonth } from '../utils/dateFnV2.js';
import Month from '../Month/index.js';
import styles from './MonthList.scss.js';
import { parseDate } from '../utils/parse.js';
import animate from '../utils/animate.js';

var AVERAGE_ROWS_PER_MONTH = 5;

var MonthList = /*#__PURE__*/function (_Component) {
  _inherits(MonthList, _Component);

  var _super = _createSuper(MonthList);

  function MonthList() {
    var _this;

    _classCallCheck(this, MonthList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      scrollOffset: _this.getDateOffset(_this.props.scrollDate)
    });

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    _defineProperty(_assertThisInitialized(_this), "memoize", function (param) {
      if (!this.cache[param]) {
        var weekStartsOn = this.props.locale.weekStartsOn;

        var _param$split = param.split(':'),
            _param$split2 = _slicedToArray(_param$split, 2),
            year = _param$split2[0],
            month = _param$split2[1];

        this.cache[param] = getMonth(year, month, weekStartsOn);
      }

      return this.cache[param];
    });

    _defineProperty(_assertThisInitialized(_this), "monthHeights", []);

    _defineProperty(_assertThisInitialized(_this), "scrollTop", 0);

    _defineProperty(_assertThisInitialized(_this), "currentMonth", void 0);

    _defineProperty(_assertThisInitialized(_this), "_getRef", function (instance) {
      _this.VirtualList = instance;
    });

    _defineProperty(_assertThisInitialized(_this), "getMonthHeight", function (index) {
      if (!_this.monthHeights[index]) {
        var _this$props = _this.props,
            weekStartsOn = _this$props.locale.weekStartsOn,
            months = _this$props.months,
            rowHeight = _this$props.rowHeight;
        var _months$index = months[index],
            month = _months$index.month,
            year = _months$index.year;
        var weeks = getWeeksInMonth(month, year, weekStartsOn, index === months.length - 1);
        _this.monthHeights[index] = weeks * rowHeight;
      }

      return _this.monthHeights[index];
    });

    _defineProperty(_assertThisInitialized(_this), "getTopOverscanCount", function () {
      var height = 0;
      var index = 0;

      while (_this.scrollTop > height) {
        height += _this.getMonthHeight(index);
        index++;
      }

      return index < 1 ? 0 : index - 1;
    });

    _defineProperty(_assertThisInitialized(_this), "onMonthsRendered", function (_ref) {
      var startIndex = _ref.startIndex;
      var _this$props2 = _this.props,
          months = _this$props2.months,
          min = _this$props2.min,
          overscanMonthCount = _this$props2.overscanMonthCount;
      var _months$startIndex = months[startIndex],
          month = _months$startIndex.month,
          year = _months$startIndex.year;
      var startMonth = new Date(year, month, 1);
      var topOverscanCount = overscanMonthCount; // Handler edge case when reach the top

      if (isSameMonth(startMonth, min)) {
        topOverscanCount = _this.getTopOverscanCount();
      }

      _this.currentMonth = addMonths(startMonth, topOverscanCount);

      _this.props.onRendered(startIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (scrollTop, event) {
      _this.scrollTop = scrollTop;

      _this.props.onScroll(scrollTop, event);
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToDate", function (date) {
      var _this2;

      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var offsetTop = _this.getDateOffset(date);

      for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      (_this2 = _this).scrollTo.apply(_this2, [offsetTop + offset].concat(rest));
    });

    _defineProperty(_assertThisInitialized(_this), "scrollTo", function () {
      var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var shouldAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onScrollEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : emptyFn;

      var onComplete = function onComplete() {
        return setTimeout(function () {
          _this.scrollEl.style.overflowY = 'auto';
          onScrollEnd();
        });
      }; // Interrupt iOS Momentum scroll


      _this.scrollEl.style.overflowY = 'hidden';

      if (shouldAnimate) {
        /* eslint-disable sort-keys */
        animate({
          fromValue: _this.scrollEl.scrollTop,
          toValue: scrollTop,
          onUpdate: function onUpdate(scrollTop, callback) {
            _this.scrollEl.scrollTop = scrollTop;
            callback();
          },
          onComplete: onComplete
        });
      } else {
        window.requestAnimationFrame(function () {
          _this.scrollEl.scrollTop = scrollTop;
          onComplete();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonth", function (_ref2) {
      var index = _ref2.index,
          style = _ref2.style;
      var _this$props3 = _this.props,
          DayComponent = _this$props3.DayComponent,
          disabledDates = _this$props3.disabledDates,
          disabledDays = _this$props3.disabledDays,
          locale = _this$props3.locale,
          maxDate = _this$props3.maxDate,
          minDate = _this$props3.minDate,
          months = _this$props3.months,
          passThrough = _this$props3.passThrough,
          rowHeight = _this$props3.rowHeight,
          selected = _this$props3.selected,
          showOverlay = _this$props3.showOverlay,
          theme = _this$props3.theme,
          today = _this$props3.today;
      var _months$index2 = months[index],
          month = _months$index2.month,
          year = _months$index2.year;
      var key = "".concat(year, ":").concat(month);

      var _this$memoize = _this.memoize(key),
          date = _this$memoize.date,
          rows = _this$memoize.rows;

      return /*#__PURE__*/React.createElement(Month, Object.assign({
        key: key,
        selected: selected,
        DayComponent: DayComponent,
        monthDate: date,
        disabledDates: disabledDates,
        disabledDays: disabledDays,
        maxDate: maxDate,
        minDate: minDate,
        rows: rows,
        rowHeight: rowHeight,
        isScrolling: false,
        showOverlay: showOverlay,
        today: today,
        theme: theme,
        style: style,
        locale: locale,
        passThrough: passThrough
      }, passThrough.Month));
    });

    return _this;
  }

  _createClass(MonthList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollEl = this.VirtualList.rootNode;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.scrollDate !== this.props.scrollDate) {
        this.setState({
          scrollTop: this.getDateOffset(prevProps.scrollDate)
        });
      }

      if (this.props.initialScrollDate != null && this.props.initialScrollDate !== prevProps.initialScrollDate) {
        this.setState({
          scrollTop: this.getDateOffset(this.props.initialScrollDate)
        });
      }
    }
  }, {
    key: "getDateOffset",
    value: function getDateOffset(date) {
      var _this$props4 = this.props,
          min = _this$props4.min,
          rowHeight = _this$props4.rowHeight,
          weekStartsOn = _this$props4.locale.weekStartsOn,
          height = _this$props4.height;
      var weeks = getWeek(startOfMonth(min), parseDate(date), weekStartsOn);
      return weeks * rowHeight - (height - rowHeight / 2) / 2;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          height = _this$props5.height,
          isScrolling = _this$props5.isScrolling,
          overscanMonthCount = _this$props5.overscanMonthCount,
          months = _this$props5.months,
          rowHeight = _this$props5.rowHeight,
          width = _this$props5.width;
      var scrollOffset = this.state.scrollOffset;
      return /*#__PURE__*/React.createElement(VirtualList, {
        ref: this._getRef,
        width: width,
        height: height,
        itemCount: months.length,
        itemSize: this.getMonthHeight,
        estimatedItemSize: rowHeight * AVERAGE_ROWS_PER_MONTH,
        renderItem: this.renderMonth,
        onScroll: this.onScroll,
        scrollOffset: scrollOffset,
        className: classNames(styles.root, _defineProperty({}, styles.scrolling, isScrolling)),
        style: {
          lineHeight: "".concat(rowHeight, "px")
        },
        overscanCount: overscanMonthCount,
        onItemsRendered: this.onMonthsRendered
      });
    }
  }]);

  return MonthList;
}(Component);

export default MonthList;
