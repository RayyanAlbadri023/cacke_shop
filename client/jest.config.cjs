module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // correct for v6+
  moduleFileExtensions: ["js", "jsx", "json"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
