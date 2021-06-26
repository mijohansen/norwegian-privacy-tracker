const nxPreset = require('@nrwl/jest/preset');
const path = require('path');
const setup = {
  setupFiles: [
    path.join(__dirname, 'test', 'setup-jest.ts'),
  ],
};

module.exports = {...setup, ...nxPreset};
