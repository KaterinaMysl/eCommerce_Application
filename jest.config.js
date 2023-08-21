module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|png)$': 'identity-obj-proxy',
  },
};
