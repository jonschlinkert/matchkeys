/**
 * matchkeys <https://github.com/jonschlinkert/matchkeys>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matched = require('matched');
var _ = require('lodash');


var arrayify = function(val) {
  return !Array.isArray(val) ? [val] : val;
};



/**
 * ## matchkeys(array, patterns, property)
 *
 * Return an array of objects that contain arrays with matching strings. `patterns` may
 * be glob patterns, strings, or an array of glob patterns or strings.
 *
 * **Example:**:
 *
 * ```js
 * var arr = [
 *   {name: 'a', keywords: ['apple', 'orange', 'grape']},
 *   {name: 'b', keywords: ['banana', 'orange', 'pineapple']},
 *   {name: 'c', keywords: ['watermelon', 'strawberry', 'kiwi']},
 *   {name: 'd', keywords: ['watermelon', 'blah']},
 *   {name: 'e', keywords: ['watermelon', 'blah', 'lodash']},
 * ];
 * console.log(matchkeys(arr, 'apple'));
 * //=> [{name: 'a', keywords: ['apple', 'orange', 'grape']}]
 *
 * console.log(matchkeys(arr, 'o*'));
 * //=>
 * // [
 * //   {name: 'a', keywords: ['apple', 'orange', 'grape']},
 * //   {name: 'b', keywords: ['banana', 'orange', 'pineapple']}
 * // ]
 * ```
 *
 * **Params:**
 *
 * @method  matchkeys
 * @param   {Object|Array} `array`
 * @param   {String|Array} `patterns` The glob patterns or strings to use for matching.
 * @param   {String} `prop` Optionally pass the name of the property to search.
 * @return  {Array} Array of objects with matching strings.
 */

var matchkeys = module.exports = function matchkeys(arr, patterns, prop) {
	var matches = [];
	prop = prop || 'keywords';
	arrayify(arr).forEach(function(obj) {
		if (obj[prop]) {
			if (matched(obj[prop], patterns).length) {
				matches.push(obj);
			}
		}	else {
			console.warn('Property: "' + prop + '" not found.');
		}
	});
	return matches;
};


/**
 * ## matchkeys.filter(array, patterns)
 *
 * Wrapper around [matched](https://github.com/jonschlinkert/matched). Returns
 * an array of matching strings, from an array or arrays of strings.
 *
 * **Example:**
 *
 * ```js
 * var keywords = [
 *   ['apple', 'orange', 'grape'],
 *   ['banana', 'orange', 'pineapple'],
 *   ['watermelon', 'strawberry', 'kiwi'],
 *   ['watermelon', 'blah'],
 *   ['watermelon', 'blah', 'lodash'],
 * ];
 *
 * console.log(matchkeys.filter(keywords, '{p,b}*'));
 * //=> ['banana', 'pineapple', 'blah']
 * ```
 *
 * **Params:**
 *
 * @method  filter
 * @param   {Array} `array` Can be an array or an _array of arrays_.
 * @param   {Array|String} `pattern` The glob pattern to use.
 * @return  {Array}
 */

matchkeys.filter = function(arr, pattern) {
  return matched(arr, pattern);
};
