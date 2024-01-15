module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  modulePathIgnorePatterns: ['__tests__/utils/*'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
