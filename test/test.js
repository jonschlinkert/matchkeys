/**
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var expect = require('chai').expect;
var pkg = require('load-pkg');
var matchkeys = require('../');

console.log(matchkeys)

var a = ['foo', 'chalk'];
var b = ['bar', 'baz', 'quux'];
var c = ['foo', 'bar', 'baz'];

var keywords = ['pkg', 'keywords', 'blah'];

describe('matchkeys.match()', function () {
  it('should return a an empty array when no matches are found', function (done) {
    var actual = matchkeys.find(a, b);
    expect(actual).to.deep.equal([]);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find(a, c);
    expect(actual).to.deep.equal(['foo']);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find(b, c);
    expect(actual).to.deep.equal(['bar', 'baz']);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find(pkg.keywords, keywords);
    expect(actual.sort()).to.deep.equal(['pkg', 'keywords'].sort());
    done();
  });

  it('should return a an empty array when no matches are found', function (done) {
    var actual = matchkeys.find({keywords: a}, b);
    expect(actual).to.deep.equal([]);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find({keywords: a}, {keywords: c});
    expect(actual).to.deep.equal(['foo']);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find({keywords: b}, {keywords: c});
    expect(actual).to.deep.equal(['bar', 'baz']);
    done();
  });

  it('should return an array of matching keywords', function (done) {
    var actual = matchkeys.find(pkg.keywords, keywords);
    expect(actual.sort()).to.deep.equal(['pkg', 'keywords'].sort());
    done();
  });
});


describe('matchkeys.hasMatch()', function () {
  it('should return false when no matches are found', function (done) {
    var actual = matchkeys.hasMatch(a, b);
    expect(actual).to.deep.equal(false);
    done();
  });

  it('should return true when matches are found', function (done) {
    var actual = matchkeys.hasMatch(a, c);
    expect(actual).to.deep.equal(true);
    done();
  });

  it('should return true when matches are found', function (done) {
    var actual = matchkeys.hasMatch(b, c);
    expect(actual).to.deep.equal(true);
    done();
  });

  it('should return true when matches are found', function (done) {
    var actual = matchkeys.hasMatch(pkg.keywords, keywords);
    expect(actual).to.deep.equal(true);
    done();
  });
});


// describe('matchkeys.filter()', function () {
//   it('should return an array of keywords matching the given glob patterns', function (done) {
//     var actual = matchkeys.filter(a, '*');
//     expect(actual).to.deep.equal(['foo', 'chalk']);
//     done();
//   });

//   it('should return an array of keywords matching the given glob patterns', function (done) {
//     var actual = matchkeys.filter(a, 'chalk');
//     expect(actual).to.deep.equal(['chalk']);
//     done();
//   });

//   it('should return an array of keywords matching the given glob patterns', function (done) {
//     var actual = matchkeys.filter(a, ['chalk']);
//     expect(actual).to.deep.equal(['chalk']);
//     done();
//   });

//   it('should return an empty array when no matches are found', function (done) {
//     var actual = matchkeys.filter(a, 'bbbbbb');
//     expect(actual).to.deep.equal([]);
//     done();
//   });
// });
