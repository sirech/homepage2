const reader = require('./reader.js')

const reportFile = './reports/homepage.report.json'
const baselineFile = './lighthouse-baseline.json'

const result = reader.parseResults(reportFile)
const baseline = reader.parseBaseline(baselineFile)

console.log('The defined baseline for the ligthouse score is', baseline)
console.log('The result from running lighthouse was: ', result)

Object.keys(result).forEach((key) => {
  const is = result[key]
  const expected = baseline[key]

  if (is < expected) {
    console.log(
      `** ERROR: The value of the category ${key} is below what we expect **`
    )
    process.exit(1)
  }
})

console.log('** Lighthouse check passed **')

process.exit(0)
