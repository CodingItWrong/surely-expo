// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;
const baseSourceExts = [...defaultSourceExts, 'cjs'];

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    sourceExts:
      process.env.MOCK_API === 'true'
        ? ['mock.js', ...baseSourceExts]
        : baseSourceExts,
  },
};
