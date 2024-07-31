'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _createSuper = require('@babel/runtime/helpers/createSuper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var VirtualList = require('react-tiny-virtual-list');
var classNames = require('classnames');
var index = require('../utils/index.js');
var dateFnV2 = require('../utils/dateFnV2.js');
var index$1 = require('../Month/index.js');
var MonthList$1 = require('./MonthList.scss.js');
var parse = require('../utils/parse.js');
var animate = require('../utils/animate.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _createSuper__default = /*#__PURE__*/_interopDefaultLegacy(_createSuper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var VirtualList__default = /*#__PURE__*/_interopDefaultLegacy(VirtualList);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

var AVERAGE_ROWS_PER_MONTH = 5;

var MonthList = /*#__PURE__*/function (_Component) {
  _inherits__default['default'](MonthList, _Component);

  var _super = _createSuper__default['default'](MonthList);

  function MonthList() {
    var _this;

    _classCallCheck__default['default'](this, MonthList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "state", {
      scrollOffset: _this.getDateOffset(_this.props.scrollDate)
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "cache", {});

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "memoize", function (param) {
      if (!this.cache[param]) {
        var weekStartsOn = this.props.locale.weekStartsOn;

        var _param$split = param.split(':'),
            _param$split2 = _slicedToArray__default['default'](_param$split, 2),
            year = _param$split2[0],
            month = _param$split2[1];

        this.cache[param] = index.getMonth(year, month, weekStartsOn);
      }

      return this.cache[param];
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "monthHeights", []);

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "scrollTop", 0);

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "currentMonth", void 0);

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "_getRef", function (instance) {
      _this.VirtualList = instance;
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "getMonthHeight", function (index$1) {
      if (!_this.monthHeights[index$1]) {
        var _this$props = _this.props,
            weekStartsOn = _this$props.locale.weekStartsOn,
            months = _this$props.months,
            rowHeight = _this$props.rowHeight;
        var _months$index = months[index$1],
            month = _months$index.month,
            year = _months$index.year;
        var weeks = index.getWeeksInMonth(month, year, weekStartsOn, index$1 === months.length - 1);
        _this.monthHeights[index$1] = weeks * rowHeight;
      }

      return _this.monthHeights[index$1];
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "getTopOverscanCount", function () {
      var height = 0;
      var index = 0;

      while (_this.scrollTop > height) {
        height += _this.getMonthHeight(index);
        index++;
      }

      return index < 1 ? 0 : index - 1;
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "onMonthsRendered", function (_ref) {
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

      if (dateFnV2.isSameMonth(startMonth, min)) {
        topOverscanCount = _this.getTopOverscanCount();
      }

      _this.currentMonth = dateFnV2.addMonths(startMonth, topOverscanCount);

      _this.props.onRendered(startIndex);
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "onScroll", function (scrollTop, event) {
      _this.scrollTop = scrollTop;

      _this.props.onScroll(scrollTop, event);
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "scrollToDate", function (date) {
      var _this2;

      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var offsetTop = _this.getDateOffset(date);

      for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      (_this2 = _this).scrollTo.apply(_this2, [offsetTop + offset].concat(rest));
    });

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "scrollTo", function () {
      var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var shouldAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onScrollEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : index.emptyFn;

      var onComplete = function onComplete() {
        return setTimeout(function () {
          _this.scrollEl.style.overflowY = 'auto';
          onScrollEnd();
        });
      }; // Interrupt iOS Momentum scroll


      _this.scrollEl.style.overflowY = 'hidden';

      if (shouldAnimate) {
        /* eslint-disable sort-keys */
        animate['default']({
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

    _defineProperty__default['default'](_assertThisInitialized__default['default'](_this), "renderMonth", function (_ref2) {
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

      return /*#__PURE__*/React__default['default'].createElement(index$1['default'], Object.assign({
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

  _createClass__default['default'](MonthList, [{
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
      var weeks = index.getWeek(dateFnV2.startOfMonth(min), parse.parseDate(date), weekStartsOn);
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
      return /*#__PURE__*/React__default['default'].createElement(VirtualList__default['default'], {
        ref: this._getRef,
        width: width,
        height: height,
        itemCount: months.length,
        itemSize: this.getMonthHeight,
        estimatedItemSize: rowHeight * AVERAGE_ROWS_PER_MONTH,
        renderItem: this.renderMonth,
        onScroll: this.onScroll,
        scrollOffset: scrollOffset,
        className: classNames__default['default'](MonthList$1['default'].root, _defineProperty__default['default']({}, MonthList$1['default'].scrolling, isScrolling)),
        style: {
          lineHeight: "".concat(rowHeight, "px")
        },
        overscanCount: overscanMonthCount,
        onItemsRendered: this.onMonthsRendered
      });
    }
  }]);

  return MonthList;
}(React.Component);

exports.default = MonthList;
