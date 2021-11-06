import { useLatest } from '../utils';
import * as React from 'react';
import { addMonths, differenceInMonths, getRealIndex, startAtIndex } from './dateUtils';
export function useYearChange(onChange, _ref) {
  let {
    selectedYear,
    currentIndexRef
  } = _ref;
  const onChangeRef = useLatest(onChange);
  React.useEffect(() => {
    if (selectedYear) {
      const currentIndex = currentIndexRef.current || 0;
      const currentDate = addMonths(new Date(), getRealIndex(currentIndex));
      currentDate.setFullYear(selectedYear);
      const today = new Date();
      const months = differenceInMonths(today, currentDate);
      const newIndex = startAtIndex + months;

      if (currentIndex !== newIndex) {
        onChangeRef.current(newIndex);
      }
    }
  }, [currentIndexRef, onChangeRef, selectedYear]);
}
//# sourceMappingURL=SwiperUtils.js.map