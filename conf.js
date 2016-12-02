// conf.js
exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  //seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
  specs: ['specs/*spec.js'],

  // restartBrowserBetweenTests: true,

  onPrepare: function(){
      var caps = browser.getCapabilities()
  },

  multiCapabilities: [{
    browserName: 'firefox',
    version: 'latest',
    platform: 'OS X 10.10',
    name: "firefox-tests",
    shardTestFiles: true,
    maxInstances: 25
  }, {
    browserName: 'chrome',
    version: 'latest',
    platform: 'Windows 7',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 25
  }],

  onComplete: function() {

    var printSessionId = function(jobName){
      browser.getSession().then(function(session) {
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
      });
    }
    printSessionId("Insert Job Name Here");
  }
}

if (process.env.SAUCE_ONDEMAND_BROWSERS) {
  exports.config.multiCapabilities = JSON.parse(process.env.SAUCE_ONDEMAND_BROWSERS).map(function(browser) {
    return {
      browserName: browser.browser,
      version: browser['browser-version'],
      platform: browser.platform,
      name: browser['long-name'],
      shardTestFiles: true,
      maxInstances: 25
    }
  });
}
