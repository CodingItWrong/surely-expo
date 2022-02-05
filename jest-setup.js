import {en, registerTranslation} from 'react-native-paper-dates';

// Fixes "[react-native-paper-dates] en is not registered"
registerTranslation('en', en);

// Fixes "Animated: `useNativeDriver` is not supported because the native animated module is missing."
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
