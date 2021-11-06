"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Month = require("./Month");

var _SwiperUtils = require("./SwiperUtils");

var _dateUtils = require("./dateUtils");

var _AutoSizer = _interopRequireDefault(require("./AutoSizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const styles = _reactNative.StyleSheet.create({
  viewPager: {
    flex: 1
  },
  inner: {
    position: 'relative'
  }
});

function getVisibleArray(i, _ref) {
  let {
    isHorizontal,
    height
  } = _ref;

  if (isHorizontal || height < 700) {
    return [i - 1, i, i + 1];
  }

  return [i - 2, i - 1, i, i + 1, i + 2];
}

function Swiper(props) {
  return /*#__PURE__*/React.createElement(_AutoSizer.default, null, _ref2 => {
    let {
      width,
      height
    } = _ref2;
    return /*#__PURE__*/React.createElement(SwiperInner, _extends({}, props, {
      width: width,
      height: height
    }));
  });
}

function SwiperInner(_ref3) {
  let {
    scrollMode,
    renderItem,
    renderHeader,
    renderFooter,
    selectedYear,
    initialIndex,
    width,
    height
  } = _ref3;
  const idx = React.useRef(initialIndex);
  const isHorizontal = scrollMode === 'horizontal';
  const [visibleIndexes, setVisibleIndexes] = React.useState(getVisibleArray(initialIndex, {
    isHorizontal,
    height
  }));
  const parentRef = React.useRef(null);
  const scrollTo = React.useCallback((index, animated) => {
    idx.current = index;
    setVisibleIndexes(getVisibleArray(index, {
      isHorizontal,
      height
    }));

    if (!parentRef.current) {
      return;
    }

    const offset = isHorizontal ? (0, _Month.getHorizontalMonthOffset)(index, width) : (0, _Month.getVerticalMonthsOffset)(index) - _Month.montHeaderHeight;

    if (isHorizontal) {
      parentRef.current.scrollTo({
        y: 0,
        x: offset,
        animated
      });
    } else {
      parentRef.current.scrollTo({
        y: offset,
        x: 0,
        animated
      });
    }
  }, [parentRef, isHorizontal, width, height]);
  const onPrev = React.useCallback(() => {
    scrollTo(idx.current - 1, true);
  }, [scrollTo, idx]);
  const onNext = React.useCallback(() => {
    scrollTo(idx.current + 1, true);
  }, [scrollTo, idx]);
  const scrollToInitial = React.useCallback(() => {
    scrollTo(idx.current, false);
  }, [scrollTo]);
  const onMomentumScrollEnd = React.useCallback(e => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const newIndex = isHorizontal ? Math.floor(contentOffset.x / viewSize.width) : (0, _Month.getIndexFromVerticalOffset)(contentOffset.y - _dateUtils.beginOffset);

    if (newIndex === 0) {
      return;
    }

    if (idx.current !== newIndex) {
      idx.current = newIndex;
      setVisibleIndexes(getVisibleArray(newIndex, {
        isHorizontal,
        height
      }));
    }
  }, [idx, height, isHorizontal]);
  const renderProps = {
    index: 0,
    onPrev,
    onNext
  };
  (0, _SwiperUtils.useYearChange)(newIndex => {
    if (newIndex) {
      scrollTo(newIndex, false);
    }
  }, {
    selectedYear,
    currentIndexRef: idx
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    ref: parentRef,
    horizontal: isHorizontal,
    pagingEnabled: isHorizontal,
    style: styles.viewPager,
    onMomentumScrollEnd: onMomentumScrollEnd,
    onScrollEndDrag: onMomentumScrollEnd,
    onLayout: scrollToInitial,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    decelerationRate: "fast",
    scrollEventThrottle: 10
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.inner, {
      height: isHorizontal ? height : _dateUtils.estimatedMonthHeight * _dateUtils.totalMonths,
      width: isHorizontal ? width * _dateUtils.totalMonths : width
    }]
  }, visibleIndexes ? new Array(visibleIndexes.length).fill(undefined).map((_, vi) => /*#__PURE__*/React.createElement(_reactNative.View, {
    key: vi,
    style: {
      top: isHorizontal ? 0 : (0, _Month.getVerticalMonthsOffset)(visibleIndexes[vi]),
      left: isHorizontal ? (0, _Month.getHorizontalMonthOffset)(visibleIndexes[vi], width) : 0,
      right: isHorizontal ? undefined : 0,
      bottom: isHorizontal ? 0 : undefined,
      position: 'absolute',
      width: isHorizontal ? width : undefined,
      height: isHorizontal ? undefined : (0, _Month.getMonthHeight)(scrollMode, visibleIndexes[vi])
    }
  }, renderItem({
    index: visibleIndexes[vi],
    onPrev: onPrev,
    onNext: onNext
  }))) : null)), renderHeader && renderHeader(renderProps), renderFooter && renderFooter(renderProps));
}

var _default = /*#__PURE__*/React.memo(Swiper);

exports.default = _default;
//# sourceMappingURL=Swiper.native.js.map