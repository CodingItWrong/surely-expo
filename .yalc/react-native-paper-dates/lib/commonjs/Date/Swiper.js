"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useDebouncedCallback = useDebouncedCallback;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Month = require("./Month");

var _dateUtils = require("./dateUtils");

var _utils = require("../utils");

var _SwiperUtils = require("./SwiperUtils");

var _AutoSizer = _interopRequireDefault(require("./AutoSizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Swiper(_ref) {
  let {
    scrollMode,
    renderItem,
    renderHeader,
    renderFooter,
    selectedYear,
    initialIndex
  } = _ref;
  const isHorizontal = scrollMode === 'horizontal';
  const [index, setIndex] = React.useState(initialIndex);
  const onPrev = React.useCallback(() => {
    setIndex(prev => prev - 1);
  }, [setIndex]);
  const onNext = React.useCallback(() => {
    setIndex(prev => prev + 1);
  }, [setIndex]);
  const renderProps = {
    index,
    onPrev,
    onNext
  };
  const indexRef = (0, _utils.useLatest)(index);
  (0, _SwiperUtils.useYearChange)(newIndex => {
    if (newIndex) {
      setIndex(newIndex);
    }
  }, {
    selectedYear,
    currentIndexRef: indexRef
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderHeader && renderHeader(renderProps), isHorizontal ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.flex1
  }, renderItem({
    index,
    onPrev,
    onNext
  })) : /*#__PURE__*/React.createElement(_AutoSizer.default, null, _ref2 => {
    let {
      width,
      height
    } = _ref2;
    return /*#__PURE__*/React.createElement(VerticalScroller, {
      width: width,
      height: height,
      initialIndex: initialIndex,
      estimatedHeight: _dateUtils.estimatedMonthHeight,
      renderItem: renderItem
    });
  }), renderFooter && renderFooter(renderProps));
}

const visibleArray = i => [i - 2, i - 1, i, i + 1, i + 2];

function VerticalScroller(_ref3) {
  let {
    width,
    height,
    initialIndex,
    estimatedHeight,
    renderItem
  } = _ref3;
  const idx = React.useRef(initialIndex);
  const [visibleIndexes, setVisibleIndexes] = React.useState(visibleArray(initialIndex)); // eslint-disable-next-line no-undef

  const parentRef = React.useRef(null);
  useIsomorphicLayoutEffect(() => {
    const element = parentRef.current;

    if (!element) {
      return;
    }

    const top = (0, _Month.getVerticalMonthsOffset)(idx.current) - _Month.montHeaderHeight;

    element.scrollTo({
      top
    });
  }, [parentRef, idx]);
  const setVisibleIndexesThrottled = useDebouncedCallback(setVisibleIndexes);
  const onScroll = React.useCallback(e => {
    const top = e.currentTarget.scrollTop;

    if (top === 0) {
      return;
    }

    const offset = top - _dateUtils.beginOffset;
    const index = (0, _Month.getIndexFromVerticalOffset)(offset);

    if (idx.current !== index) {
      idx.current = index;
      setVisibleIndexesThrottled(visibleArray(index));
    }
  }, [setVisibleIndexesThrottled]);
  return /*#__PURE__*/React.createElement("div", {
    ref: parentRef,
    style: {
      height,
      width,
      overflow: 'auto'
    },
    onScroll: onScroll
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: estimatedHeight * _dateUtils.totalMonths,
      position: 'relative'
    }
  }, [0, 1, 2, 3, 4].map(vi => /*#__PURE__*/React.createElement("div", {
    key: vi,
    style: {
      willChange: 'transform',
      transform: `translateY(${(0, _Month.getVerticalMonthsOffset)(visibleIndexes[vi])}px)`,
      left: 0,
      right: 0,
      position: 'absolute',
      height: (0, _Month.getMonthHeight)('vertical', visibleIndexes[vi]) // transform: `translateY(${getMonthsOffset('vertical', vi)}px)`,

    }
  }, renderItem({
    index: visibleIndexes[vi],
    onPrev: empty,
    onNext: empty
  })))));
}

const empty = () => null;

const styles = _reactNative.StyleSheet.create({
  flex1: {
    flex: 1
  }
});

function useDebouncedCallback(callback) {
  const mounted = React.useRef(true);
  const latest = (0, _utils.useLatest)(callback);
  const timerId = React.useRef(null);
  React.useEffect(() => {
    return () => {
      mounted.current = false;

      if (timerId.current) {
        window.cancelAnimationFrame(timerId.current);
      }
    };
  }, [mounted, timerId]);
  return React.useCallback(args => {
    if (timerId.current) {
      window.cancelAnimationFrame(timerId.current);
    }

    timerId.current = window.requestAnimationFrame(function () {
      if (mounted.current) {
        latest.current(args);
      }
    });
  }, [mounted, timerId, latest]);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

var _default = /*#__PURE__*/React.memo(Swiper);

exports.default = _default;
//# sourceMappingURL=Swiper.js.map