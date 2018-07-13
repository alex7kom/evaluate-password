'use strict';

module.exports = {
  length: length,
  unique: unique,
  norepeat: norepeat,
  variety: variety,
  commonSequencePenalty: commonSequencePenalty
};

function length(password) {
  return Math.floor(Math.pow(password.length, 2) / 50);
}

function unique(password) {
  var hash = {};
  password.split('').forEach(function(char) {
    hash[char] = 1;
  });

  var uniqueLength = Object.keys(hash).length;

  if (uniqueLength === 0) {
    return 0;
  }

  return Math.floor(10 * Math.log10(uniqueLength));
}

function norepeat(password) {
  var norepeatLength = password.replace(/(.)\1{1,}/g, function(r) {
    return r[0];
  }).length;

  if (norepeatLength === 0) {
    return 0;
  }

  return Math.floor(10 * Math.log10(norepeatLength));
}

function variety(password) {
  var multiplier = 0;

  if (/[0-9]/.test(password)) {
    multiplier += 0.1;
  }

  if (/[A-Z]/.test(password)) {
    multiplier += 0.1;
  }

  if (/[a-z]/.test(password)) {
    multiplier += 0.1;
  }

  if (/[\x20-\x7E]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    multiplier += 0.3;
  }

  if (/[^\x20-\x7E]/.test(password)) {
    multiplier += 1;
  }

  return Math.floor(password.length * (multiplier - 0.1));
}

function commonSequencePenalty(password) {
  var strings = [
    'abcdefghijklmnopqrstuvwxyz',
    'qwertyuiopasdfghjklzxcvbnm',
    '01234567890'
  ];

  var calculate = function(str) {
    var pattern = new RegExp(str.split('').join('?') + '?', 'gi');

    return (password.match(pattern) || [])
      .filter(function(comb) {
        return comb.length >= 3;
      })
      .filter(function(comb) {
        return new RegExp(comb, 'i').test(str);
      })
      .reduce(function(prev, curr) {
        return prev - curr.length;
      }, 0);
  };

  var penalty = strings.reduce(function(sum, str) {
    return (
      sum +
      calculate(str) +
      calculate(
        str
          .split('')
          .reverse()
          .join('')
      )
    );
  }, 0);

  return Math.ceil(penalty);
}
