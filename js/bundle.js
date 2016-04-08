(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// js/morass.js -- library to handle pseudo-elements.
//
// A pseudo-element is specified in morass using the `data-morass-on` property.
// Its value can be a pseudo-class such as `:hover`.
// Comma-delimited values are also supported, such as `:hover, :visited`.
//
// Another property `data-morass-media` is used to specify media queries.

var sheet;
var lastId = 0;

// List of indices for each data-morass-id.

var rules = {};

function init() {
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  sheet = styleEl.sheet;
}

function getId(elt) {
  return elt.dataset.morassId || (elt.dataset.morassId = ++lastId);
}

function addRule(elt) {
  var id = getId(elt);
  var on = elt.dataset.morassOn;
  var media = elt.dataset.morassMedia;
  var ruleId = rules[id];
  var idSelector = '[data-morass-id=\'' + id + '\']';
  var cssRule;

  if (ruleId) sheet.deleteRule(ruleId);

  // For now, make on (pseudo-classes) and media queries mutually exclusive.
  if (on) cssRule = idSelector + ':not(' + on + ') { all: unset; }';else if (media)
    //    cssRule = `@media not(${media}) { ${idSelector} { all: unset; } }`;
    cssRule = '@media not all and (' + media + ') { ' + idSelector + ' { all: unset !important; } }';

  sheet.insertRule(cssRule, sheet.cssRules.length);
}

function process() {
  [].concat(_toConsumableArray(document.querySelectorAll('[data-morass-on], [data-morass-media]'))).forEach(addRule);
}

function watch() {

  function callback(mutations) {
    mutations.forEach(function (mutation) {
      return addRule(mutation.target);
    });
  }

  var observer = new MutationObserver(callback);
  var attributeFilter = ['data-morass-on', 'data-morass-media'];
  var config = { attributes: true, subtree: true, attributeFilter: attributeFilter };
  observer.observe(document, config);
}

exports.init = init;
exports.process = process;
exports.watch = watch;

},{}],2:[function(require,module,exports){
'use strict';

var _morass = require('./morass');

var morass = _interopRequireWildcard(_morass);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

morass.init(); // Test JS for test HTML page to test data-morass-on functionality.

document.addEventListener('DOMContentLoaded', function () {
  return morass.process();
});

},{"./morass":1}]},{},[2]);
