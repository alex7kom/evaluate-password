'use strict';

var evaluations = require('./evaluations');

function evaluatePassword(password) {
  return Object.keys(evaluations).reduce(function(sum, evName) {
    return sum + evaluations[evName](password);
  }, 0);
}

module.exports = evaluatePassword;
