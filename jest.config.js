const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.spec.ts', '**/__tests__/**/*.spec.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/fixtures/', '<rootDir>/src/validation/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/validation/', '<rootDir>/src/pages/api/auth/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
