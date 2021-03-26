module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^.*\\.s?css$': 'identity-obj-proxy',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^fixtures/(.*)': '<rootDir>/src/fixtures/$1',
  },
  transform: {
    '^.+\\.jsx?$': './jest/transformer.js',
  },
  setupFiles: ['<rootDir>/setupTests.js'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.cache/'],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: '',
  },
}
