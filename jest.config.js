module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^.*\\.s?css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': './jest/transformer.js',
  },
  setupFiles: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.cache/'],
  globals: {
    __PATH_PREFIX__: '',
  },
}
