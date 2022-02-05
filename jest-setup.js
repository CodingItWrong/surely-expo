// Fixes "Animated: `useNativeDriver` is not supported because the native animated module is missing."
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
