// @ts-check

/** @type {import('@jest/types').Config.InitialOptions } */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    // Installing jest, ts-jest, and @types/jest in multiple packages in a monorepo apparently causes jest
    // to stop working in @ahmic/minimon-server for whatever stupid reason. The error revolves around the
    // UUID package specifically and the below fixes it for yet another stupid reason. That's 2 hours of my
    // life I'll never get back... Oh the joys of web dev...
    '^uuid$': require.resolve('uuid'),
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
