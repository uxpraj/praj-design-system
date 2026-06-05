const { withNativeWind } = require("nativewind/metro");
const { withStorybook } = require("@storybook/react-native/withStorybook");
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(withStorybook(config), {
  input: "./global.css",
});
