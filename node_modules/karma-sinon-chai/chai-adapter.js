var should;

(function(window) {
  window.should = window.chai.should();
  window.expect = window.chai.expect;
  window.assert = window.chai.assert;

  var chaiConfig = window.__karma__.config.chai;
  if (chaiConfig) {
    for (var key in chaiConfig) {
      if (chaiConfig.hasOwnProperty(key)) {
        window.chai.config[key] = chaiConfig[key];
      }
    }
  }

})(window);
