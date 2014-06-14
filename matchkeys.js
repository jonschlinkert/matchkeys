/**
 * matchkeys <https://github.com/jonschlinkert/matchkeys>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var resolveDep = require('resolve-dep');
var minimatch = require('minimatch');
var pkg = require('load-pkg');
var _ = require('lodash');

// Export the matchkeys object.
var matchkeys = module.exports = {};

var toArray = function(val) {
  return !Array.isArray(val) ? [val] : val;
};

var matches = function(arr, patterns, options) {
  if (!arr || !patterns) {
    return [];
  }

  var opts = options || {}, matches = [], omissions = [];
  arr = toArray(arr), patterns = toArray(patterns);

  _.flatten(patterns.map(function(pattern) {
    if (/!/.test(pattern)) {
      pattern = pattern.replace('!', '');
      omissions = omissions.concat(minimatch.match(arr, pattern, opts));
    }
    matches = matches.concat(minimatch.match(arr, pattern, opts));
  }));

  return _.difference(matches, omissions);
};

// console.log(matches(['foo', 'bar', 'baz'], ['f*', '*z']));
console.log(matches(['foo', 'bar', 'baz'], ['!*z', 'f*']));


// Check config for keywords
function loadKeywords(config) {
  // Allow an array to be passed in directly
  if (Array.isArray(config)) {
    return config;
  }

  config = config || {};
  var keywords = config.keywords || pkg.keywords || [];

  if (!Array.isArray(keywords)) {
    throw new Error('  [matchkeys]: keywords must be an array');
  }

  if (keywords.length < 1) {
    throw new Error('  [matchkeys]: no keywords found.');
  }

  return keywords;
}


/**
 * Compare two arrays of keywords
 * @param  {[type]} keywords [description]
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */

matchkeys.find = function(a, b) {
  a = loadKeywords(a);
  b = loadKeywords(b);
  return _.intersection(a, b);
};


/**
 * Compare two arrays of keywords and return true if ANY keywords match.
 * @param  {Array}  a  Array of keywords to test against.
 * @param  {Array}  b  Array of keywords to search for matches.
 * @return {Boolean}   Return true if keywords match, otherwise false.
 */

matchkeys.hasMatch = function(a, b) {
  return matchkeys.find(a, b).length > 0;
};


/**
 * Return any keywords in the given list that match keywords in config.keywords.
 * @param  {[type]} pattern [description]
 * @param  {[type]} config  [description]
 * @return {[type]}         [description]
 */

matchkeys.filter = function(config, pattern, options) {
  var keywords = loadKeywords(config);
  return minimatch.match(keywords, pattern, options);
};


/**
 * Resolve paths to npm modules based on keyword matches
 * @param  {[type]} keys   [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */

matchkeys.resolve = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.dep(pattern).join();
  })));
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */

matchkeys.resolveDev = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.dev(pattern).join();
  })));
};


/**
 * Return the resolved filepaths to any npm modules that match the given list of keywords.
 * @param  {[type]} patterns [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */

matchkeys.resolveAll = function (patterns, config, options) {
  var keywords = loadKeywords(config);
  return _.compact(_.flatten(matchkeys.filter(patterns, keywords, options).map(function (pattern) {
    return resolveDep.all(pattern).join();
  })));
};