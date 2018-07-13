/* eslint-env jest */
'use strict';

var evaluatePassword = require('../');

var passwords = require('./passwords');

test.each(passwords)('%s', password => {
  expect(evaluatePassword(password)).toMatchSnapshot();
});
