module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/app"],
  injectGlobals: true,
  preset: "ts-jest",
  transformIgnorePatterns: ["/node_modules/(?!.*\\.mjs$|.*\\.cjs$|.*\\.jsx?$)/"],
};
