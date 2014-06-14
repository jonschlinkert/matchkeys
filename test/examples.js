// /**
//  * matchkeys <https://github.com/jonschlinkert/matchkeys>
//  *
//  * Copyright (c) 2014 Jon Schlinkert, contributors.
//  * Licensed under the MIT license.
//  */

// 'use strict';

// var chalk = require('chalk');
// var _ = require('lodash');

// // This module.
// var keys = require('../index.js');

// var multiArr = [
//   {keywords: ['A', 'B', 'C', 'D', 'E', 'F'] },
//   {keywords: ['A', 'B', 'C', 'D', 'I', 'F'] }
// ];

// var first = {
//   keywords: ['A', 'B', 'C', 'D', 'E', 'F']
// };
// var second = {
//   keywords: ['C', 'E', 'G', 'I', 'J']
// };


// var config = {
//   keywords: ['baz', 'bar', 'foo', 'node-foo']
// };


// console.log(chalk.cyan("keys.match"), keys.match(first, second));
// console.log(chalk.cyan("keys.matchPkgs"), keys.matchPkgs(pkg, pkgs));
// console.log(chalk.cyan("keys.isMatch"), keys.isMatch(first, second));
// console.log(chalk.cyan("keys.filter"), keys.filter('*', pkg));
// console.log(chalk.cyan("keys.filter"), keys.filter('*', config));
// console.log(chalk.cyan("keys.resolve"), keys.resolve('*'));
// console.log(chalk.cyan("keys.resolve"), keys.resolve('*', config));
// console.log(chalk.cyan("keys.resolveDev"), keys.resolveDev('*'));
// console.log(chalk.cyan("keys.resolveDev"), keys.resolveDev('*', config));
// console.log(chalk.cyan("keys.resolveAll"), keys.resolveAll('*'));
// console.log(chalk.cyan("keys.resolveAll"), keys.resolveAll('*', config));