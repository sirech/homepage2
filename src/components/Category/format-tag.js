import { kebabCase } from 'lodash'

export default (tag) => {
  return kebabCase(tag.toLowerCase())
}
