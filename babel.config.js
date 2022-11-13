module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@contexts': './contexts',
            '@core': './core',
            '@libs': './libs',
            '@navigation': './navigation',
            '@screens': './screens',
            '@hooks': './hooks',
            '@utils': './utils',
          },
        },
      ],
    ],
  };
};
