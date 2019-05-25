const config = {
  babelrc: false,
  presets: ['babel-preset-gatsby'],
}

module.exports = require('babel-jest').createTransformer(config)
