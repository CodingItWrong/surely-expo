import {useWindowDimensions} from 'react-native';

export const breakpointMedium = 429;
export const breakpointLarge = 600;

export const large = 'large';
export const medium = 'medium';

const breakpointForWidth = width => (width >= breakpointLarge ? large : medium);

export function useBreakpoint() {
  const {width} = useWindowDimensions();
  return breakpointForWidth(width);
}
