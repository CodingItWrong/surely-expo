import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { getIndexFromVerticalOffset, getMonthHeight, getVerticalMonthsOffset, montHeaderHeight } from './Month';
import { beginOffset, estimatedMonthHeight, totalMonths } from './dateUtils';
import { useLatest } from '../utils';
import { useYearChange } from './SwiperUtils';
import AutoSizer from './AutoSizer';

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
  const indexRef = useLatest(index);
  useYearChange(newIndex => {
    if (newIndex) {
      setIndex(newIndex);
    }
  }, {
    selectedYear,
    currentIndexRef: indexRef
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderHeader && renderHeader(renderProps), isHorizontal ? /*#__PURE__*/React.createElement(View, {
    style: styles.flex1
  }, renderItem({
    index,
    onPrev,
    onNext
  })) : /*#__PURE__*/React.createElement(AutoSizer, null, _ref2 => {
    let {
      width,
      height
    } = _ref2;
    return /*#__PURE__*/React.createElement(VerticalScroller, {
      width: width,
      height: height,
      initialIndex: initialIndex,
      estimatedHeight: estimatedMonthHeight,
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

    const top = getVerticalMonthsOffset(idx.current) - montHeaderHeight;
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

    const offset = top - beginOffset;
    const index = getIndexFromVerticalOffset(offset);

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
      height: estimatedHeight * totalMonths,
      position: 'relative'
    }
  }, [0, 1, 2, 3, 4].map(vi => /*#__PURE__*/React.createElement("div", {
    key: vi,
    style: {
      willChange: 'transform',
      transform: `translateY(${getVerticalMonthsOffset(visibleIndexes[vi])}px)`,
      left: 0,
      right: 0,
      position: 'absolute',
      height: getMonthHeight('vertical', visibleIndexes[vi]) // transform: `translateY(${getMonthsOffset('vertical', vi)}px)`,

    }
  }, renderItem({
    index: visibleIndexes[vi],
    onPrev: empty,
    onNext: empty
  })))));
}

const empty = () => null;

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  }
});
export function useDebouncedCallback(callback) {
  const mounted = React.useRef(true);
  const latest = useLatest(callback);
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
export default /*#__PURE__*/React.memo(Swiper);
//# sourceMappingURL=Swiper.js.map