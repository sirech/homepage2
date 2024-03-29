import { last, groupWith } from 'ramda'

export const talks = [
  [
    'https://github.com/sirech/talks/raw/master/2016-02-rubygroupmunich-mediumapps.pdf',
    'Ruby at XING',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2016-04-rubygroupmunich-rubocop.pdf',
    'Using RuboCop',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2017-03-es2017.pdf',
    'Intro to ES2017',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2017-04-rubygroupmunich-yai.pdf',
    'Assign PRs automatically with YAI',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2017-11-tw-onboarding.pdf',
    'Welcoming new developers into a team',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2018-01-rubyonice-maintainingrailsapps.pdf',
    'Ruby on Ice 2018 - Maintaining Rails Applications through the years',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2018-02-tdd_infrastructure.pdf',
    'TDD for Infrastructure',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2018-08-angular_state.pdf',
    'Angular state management',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2019-01-tw-concourse_ci.pdf',
    'Concourse CI',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2019-01-tw-tdd_containers.pdf',
    'TDD for Containers',
  ],
  [
    'https://github.com/sirech/talks/raw/master/2019-04-tw-build_pipelines.pdf',
    "Build pipelines that don't suck",
  ],
  [
    'https://github.com/sirech/talks/raw/master/2019-06-cd_as_business_advantage.pdf',
    'Continuous Delivery as a business advantage',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2019-07-tw-kotlin_microservices.pdf',
    'Building microservices in Kotlin',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2019-09-tw-kotlin_microservices_why.pdf',
    'Kotlin for microservices, why?',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2019-10-get_hooked_react_hooks.pdf',
    'Get hooked on React hooks',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2019-10-continuous_delivery_myths_and_realities.pdf',
    'Continuous delivery, myths and realities',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-02-codedays-lean_functional_backends_kotlin.pdf',
    'Code Days 2020 - Lean backends using functional Kotlin',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-03-l8-introduction_to_microfrontends.pdf',
    'Introduction to Microfrontends',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-03-codeconf-tdd_against_the_odds.pdf',
    'TDD against the odds',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-06-xconf-moving_away_from_null_and_exceptions.pdf',
    'XConf - Moving away from null and exceptions: An alternative way of error handling',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-07-parametrized_concourse_pipelines_with_jsonnet.pdf',
    'Parametrized Concourse pipelines using jsonnet',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2020-09-hackerkiste-moving_away_from_null_and_exceptions.pdf',
    'Hackerkiste - Moving away from null and exceptions: An alternative way of error handling',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2021-02-codedays-pipelines_as_code_for_infrastructure_at_scale.pdf',
    'Code Days 2021 - Pipelines as code for infrastructure at scale',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2021-03-tw-human_on_call.pdf',
    'Humane on Call',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2021-11-devoxx-humane_on_call_alerting_doesnt_have_to_be_painful.pdf',
    "DevoxxUK 2021 - Humane On-Call: Alerting doesn't have to be painful",
  ],
  [
    'https://github.com/sirech/talks/blob/master/2022-02-oop-applications_instead_of_libraries.pdf',
    'OOP Digital - Applications instead of libraries',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2022-03-burda_iaas-resilience-against-downstream-failures.pdf',
    'Burda IaaS - Resilience against downstream failures',
  ],
  [
    'https://github.com/sirech/talks/blob/master/2022-05-voxxed-applications_instead_of_libraries.pdf',
    'Voxxed Days Zurich - Applications instead of libraries',
  ],
].reverse()

const extractYear = (item) => {
  const path = last(item.split('/'))
  return path.split('-')[0]
}

export const groupedTalks = () =>
  groupWith((x, y) => x.year === y.year)(
    talks.map(([url, title]) => ({
      year: extractYear(url),
      url,
      title,
    }))
  )
