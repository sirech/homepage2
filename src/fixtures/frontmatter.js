const frontmatter = (options = {}) => {
  const title = options.title || 'My Post'
  const categories = options.categories || ['JavaScript', 'React']
  return {
    categories,
    date: '2018/03/01',
    layout: 'post',
    path: '/the-post',
    title,
    draft: false,
    description: 'this is the description',
  }
}
export default frontmatter
