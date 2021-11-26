import throttle from 'lodash/throttle';
import {useCallback, useMemo, useRef} from 'react';

export default function useRateLimit({
  intervalInMs,
  maxCallsPerInterval,
  callback,
}) {
  const callCount = useRef(0);
  const resetCountAfterInterval = useMemo(
    () =>
      throttle(() => {
        console.log('refreshing rate limit');
        callCount.current = 0;
      }, intervalInMs),
    [intervalInMs],
  );

  const rateLimitedCall = useCallback(
    (...args) => {
      if (callCount.current < maxCallsPerInterval) {
        callCount.current += 1;
        callback(...args);
        resetCountAfterInterval();
      } else {
        console.log('prevented call until rate limit refreshes');
      }
    },
    [callback, maxCallsPerInterval, resetCountAfterInterval],
  );

  return rateLimitedCall;
}
