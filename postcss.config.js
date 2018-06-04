/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */

module.exports = {
  map: { inline: false },
  plugins: [
    require('postcss-easy-import')({ extensions: '.pcss' }),
    require('postcss-preset-env')({
      stage: 2,
      features: {'custom-media-queries': true, 'nesting-rules': true},
    }),
    require('autoprefixer')({ }),
    require('cssnano')({ preset: 'default' }),
  ],
};
