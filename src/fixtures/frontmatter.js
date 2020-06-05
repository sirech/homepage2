const frontmatter = (
  { categories } = { categories: ['JavaScript', 'React'] }
) => ({
  categories,
  date: '2018/03/01',
  layout: 'post',
  path: '/the-post',
  title: 'My Post',
  draft: false,
  description: 'this is the description',
})
export default frontmatter
