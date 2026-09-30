// stencil-library/jest.config.ts
import { Config } from '@stencil/core';

export const config: Config = {
  testing: {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testEnvironment: 'jest-environment-jsdom'
  },
};
