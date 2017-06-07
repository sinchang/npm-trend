const path = require('path')
const pkg = require('./package')

module.exports = {
  entry: 'src/index.js',
  html: {
    title: pkg.productName,
    description: pkg.descrption,
    template: path.join(__dirname, 'index.ejs')
  },
  presets: [
    require('poi-preset-eslint-react')({ mode: '*' })
  ],
  extendWebpack(config) {
    config.entry('client').prepend('react-hot-loader/patch')
  }
}
