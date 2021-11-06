function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getHorizontalMonthOffset, getIndexFromVerticalOffset, getMonthHeight, getVerticalMonthsOffset, montHeaderHeight } from './Month';
import { useYearChange } from './SwiperUtils';
import { beginOffset, estimatedMonthHeight, totalMonths } from './dateUtils';
import AutoSizer from './AutoSizer';
const styles = StyleSheet.create({
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
  return /*#__PURE__*/React.createElement(AutoSizer, null, _ref2 => {
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

    const offset = isHorizontal ? getHorizontalMonthOffset(index, width) : getVerticalMonthsOffset(index) - montHeaderHeight;

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
    const newIndex = isHorizontal ? Math.floor(contentOffset.x / viewSize.width) : getIndexFromVerticalOffset(contentOffset.y - beginOffset);

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
  useYearChange(newIndex => {
    if (newIndex) {
      scrollTo(newIndex, false);
    }
  }, {
    selectedYear,
    currentIndexRef: idx
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollView, {
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
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.inner, {
      height: isHorizontal ? height : estimatedMonthHeight * totalMonths,
      width: isHorizontal ? width * totalMonths : width
    }]
  }, visibleIndexes ? new Array(visibleIndexes.length).fill(undefined).map((_, vi) => /*#__PURE__*/React.createElement(View, {
    key: vi,
    style: {
      top: isHorizontal ? 0 : getVerticalMonthsOffset(visibleIndexes[vi]),
      left: isHorizontal ? getHorizontalMonthOffset(visibleIndexes[vi], width) : 0,
      right: isHorizontal ? undefined : 0,
      bottom: isHorizontal ? 0 : undefined,
      position: 'absolute',
      width: isHorizontal ? width : undefined,
      height: isHorizontal ? undefined : getMonthHeight(scrollMode, visibleIndexes[vi])
    }
  }, renderItem({
    index: visibleIndexes[vi],
    onPrev: onPrev,
    onNext: onNext
  }))) : null)), renderHeader && renderHeader(renderProps), renderFooter && renderFooter(renderProps));
}

export default /*#__PURE__*/React.memo(Swiper);
//# sourceMappingURL=Swiper.native.js.map