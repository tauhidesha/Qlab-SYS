module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  }
};