<<<<<<< HEAD
// @ts-check
=======
>>>>>>> e20b0b2c12cc6e6a7eeb1248a52f702c0c50c3e7
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

<<<<<<< HEAD
/**
 * @type { import("protractor").Config }
 */
=======
>>>>>>> e20b0b2c12cc6e6a7eeb1248a52f702c0c50c3e7
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
<<<<<<< HEAD
      project: require('path').join(__dirname, './tsconfig.json')
=======
      project: require('path').join(__dirname, './tsconfig.e2e.json')
>>>>>>> e20b0b2c12cc6e6a7eeb1248a52f702c0c50c3e7
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};