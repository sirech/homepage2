const _ = require('lodash')

export default (tag) => {
  return _.kebabCase(tag.toLowerCase())
}
