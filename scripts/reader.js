const fs = require('fs')

const score = (score) => (score <= 1 ? score * 100 : score)

const parse = (pickCategory) => (fileName) => {
  const content = fs.readFileSync(fileName).toString()
  const parsed = JSON.parse(content)

  const categories = ['performance', 'accessibility', 'best-practices', 'seo']

  const results = {}
  categories.map((category) => {
    results[category] = score(pickCategory(parsed, category))
  })

  return results
}

exports.parseResults = parse(
  (parsed, category) => parsed.categories[category].score
)

exports.parseBaseline = parse((parsed, category) => parsed[category])
