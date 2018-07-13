/* eslint-env jest */
'use strict';

var evaluations = require('../evaluations');

var passwords = require('./passwords');

describe.each(Object.keys(evaluations))('%s', evName => {
  test.each(passwords)('%s', password => {
    expect(evaluations[evName](password)).toMatchSnapshot();
  });
});
