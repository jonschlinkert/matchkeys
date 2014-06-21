/**
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var expect = require('chai').expect;
var pkg = require('../package');
var matchkeys = require('../');

/**
 * Fixtures
 */

var a = ['foo', 'chalk'];
var b = ['bar', 'baz', 'quux'];
var c = ['foo', 'bar', 'baz'];
var d = ['apple', 'blah'];

var keywords = ['pkg', 'keywords', 'blah'];

var arr = [
  {name: 'a', keywords: ['apple', 'orange', 'grape']},
  {name: 'b', keywords: ['banana', 'orange', 'pineapple']},
  {name: 'c', keywords: ['watermelon', 'strawberry', 'kiwi']},
  {name: 'd', keywords: ['watermelon', 'blah']},
  {name: 'e', keywords: ['watermelon', 'blah', 'lodash']},
];

var arr2 = [
  {name: 'a', foo: ['apple', 'orange', 'grape']},
  {name: 'b', foo: ['banana', 'orange', 'pineapple']},
  {name: 'c', foo: ['watermelon', 'strawberry', 'kiwi']},
  {name: 'd', foo: ['watermelon', 'blah']},
  {name: 'e', foo: ['watermelon', 'blah', 'lodash']},
];


/**
 * Tests
 */

describe('matchkeys()', function () {
  it('should return a an empty array when no matches are found', function () {
    var actual = matchkeys({keywords: a}, b);
    expect(actual).to.deep.equal([]);
  });

  it('should return matches', function () {
    var actual = matchkeys(arr, 'o*');
    var expected = [
      {name: 'a', keywords: ['apple', 'orange', 'grape']},
      {name: 'b', keywords: ['banana', 'orange', 'pineapple']}
    ]
    expect(actual).to.deep.equal(expected);
  });

  it('should return matches', function () {
    var actual = matchkeys(arr, 'apple');
    var expected = [{name: 'a', keywords: ['apple', 'orange', 'grape']}];
    expect(actual).to.deep.equal(expected);
  });

  it('should return matches', function () {
    var actual = matchkeys({keywords: a}, c);
    expect(actual).to.deep.equal([{keywords: ['foo', 'chalk']}]);
  });

  it('should return matches', function () {
    var actual = matchkeys([{keywords: a}], c);
    expect(actual).to.deep.equal([{keywords: ['foo', 'chalk']}]);
  });

  it('should return matches', function () {
    var actual = matchkeys(arr, ['apple', 'blah']);
    var expected = [
      {name: 'a', keywords: ['apple', 'orange', 'grape']},
      {name: 'd', keywords: ['watermelon', 'blah']},
      {name: 'e', keywords: ['watermelon', 'blah', 'lodash']},
    ];
    expect(actual).to.deep.equal(expected);
  });

  describe('when a keyword property is passed', function () {
    it('when a should return matches', function () {
      var actual = matchkeys(arr2, ['apple', 'blah'], 'foo');
      var expected = [
        {name: 'a', foo: ['apple', 'orange', 'grape']},
        {name: 'd', foo: ['watermelon', 'blah']},
        {name: 'e', foo: ['watermelon', 'blah', 'lodash']},
      ];
      expect(actual).to.deep.equal(expected);
    });
  });
});

describe('matchkeys.filter()', function () {
  it('should return a an empty array when no matches are found', function () {
    var actual = matchkeys.filter(a, b);
    expect(actual).to.deep.equal([]);
  });

  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(a, c);
    expect(actual).to.deep.equal(['foo']);
  });

  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(b, c);
    expect(actual).to.deep.equal(['bar', 'baz']);
  });

  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(pkg.keywords, keywords);
    expect(actual.sort()).to.deep.equal(['pkg', 'keywords'].sort());
  });
  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(a, c);
    expect(actual).to.deep.equal(['foo']);
  });

  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(b, c);
    expect(actual).to.deep.equal(['bar', 'baz']);
  });

  it('should return an array of matching keywords', function () {
    var actual = matchkeys.filter(pkg.keywords, keywords);
    expect(actual.sort()).to.deep.equal(['pkg', 'keywords'].sort());
  });

  it('should return false when no matches are found', function () {
    var actual = matchkeys.filter(a, b);
    expect(actual.length !== 0).to.deep.equal(false);
  });

  it('should return true when matches are found', function () {
    var actual = matchkeys.filter(a, c);
    expect(actual.length !== 0).to.deep.equal(true);
  });

  it('should return true when matches are found', function () {
    var actual = matchkeys.filter(b, c);
    expect(actual.length !== 0).to.deep.equal(true);
  });

  it('should return true when matches are found', function () {
    var actual = matchkeys.filter(pkg.keywords, keywords);
    expect(actual.length !== 0).to.deep.equal(true);
  });

  it('should return an array of keywords matching the given glob patterns', function () {
    var actual = matchkeys.filter(a, '*');
    expect(actual).to.deep.equal(['foo', 'chalk']);
  });

  it('should return an array of keywords matching the given glob patterns', function () {
    var actual = matchkeys.filter(a, 'chalk');
    expect(actual).to.deep.equal(['chalk']);
  });

  it('should return an array of keywords matching the given glob patterns', function () {
    var actual = matchkeys.filter(a, ['chalk']);
    expect(actual).to.deep.equal(['chalk']);
  });

  it('should return an empty array when no matches are found', function () {
    var actual = matchkeys.filter(a, 'bbbbbb');
    expect(actual).to.deep.equal([]);
  });
});
