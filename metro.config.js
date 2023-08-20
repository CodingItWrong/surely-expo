// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    sourceExts:
      process.env.MOCK_API === 'true'
        ? ['mock.js', ...defaultSourceExts]
        : defaultSourceExts,
  },
};
