(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// js/morass.js -- library to handle pseudo-elements.
//
// A pseudo-element is specified in morass using a pseudo-element class such as `hover`.
// A media query is similary specified using a class such as `desktop`.
//
// Initialize with a call to the default export, with a
// `opts` parameter is a hash which may include a `mediaQueries` or `pseudoElements`.

var sheet;
var lastId = 0;
var mediaQueries = {}; // media query synonyms
var pseudoElements = {}; // aliases for pseudo-elements

// List of indices for each data-morass-id.
var rules = {};

// Decipher and store options.
function setOptions() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  mediaQueries = opts.mediaQueries || defaultMediaQueries;
  pseudoElements = opts.pseudoElements || defaultPseudoElements;
}

var _pseudos = ['checked', 'default', 'disabled', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'focus', 'hover', 'indeterminate', 'in-range', 'invalid', 'last-child', 'last-of-type', 'only-child', 'only-of-type', 'optional', 'out-of-range', 'read-only', 'read-write', 'required', 'target', 'valid', 'visited'];

// This is a default list of pseudo-elements, suitable for use as the value of the
// 'pseudoElements' property of the `opts` parameter passed to `init`.
var defaultPseudoElements = _pseudos.reduce(function (result, x) {
  result[x] = x;
  return result;
}, {});

// This is a default list of media queries, suitable for use as the value of the
// 'mediaQueries' property of the `opts` parameter passed to `init`.
var defaultMediaQueries = {
  tablet: '(min-width: 768px) and (max-width: 1023)',
  desktop: 'min-width: 1024px',
  mobile: 'max-width: 767px'
};

function init(opts) {
  setOptions(opts);
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  sheet = styleEl.sheet;
  process();
  watch();
}

function getId(elt) {
  return elt.dataset.morassId || (elt.dataset.morassId = ++lastId);
}

function addRule(elt) {
  var id = getId(elt);
  var classes = elt.classList;
  var media = [].concat(_toConsumableArray(classes)).filter(function (cls) {
    return Object.keys(mediaQueries).indexOf(cls) > -1;
  });
  var pseudo = [].concat(_toConsumableArray(classes)).filter(function (cls) {
    return Object.keys(pseudoElements).indexOf(cls) > -1;
  });
  var ruleId = rules[id];
  var idSelector = '[data-morass-id=\'' + id + '\']';
  var cssRule;

  if (ruleId !== undefined) {
    sheet.deleteRule(ruleId);
    delete rules[id];
  }

  // For now, make on (pseudo-classes) and media queries mutually exclusive.
  if (pseudo.length) {
    cssRule = '' + idSelector + pseudo.map(function (p) {
      return ':not(:' + p + ')';
    }) + ' { all: unset; }';
  } else if (media.length) cssRule = '@media not all and ' + media.map(function (m) {
    return '(' + mediaQueries[m];
  }).join(' or ') + ') { ' + idSelector + ' { all: unset !important; } }';

  if (cssRule) rules[id] = sheet.insertRule(cssRule, sheet.cssRules.length);
}

function process() {
  var elt = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  var classes = Object.keys(mediaQueries).concat(Object.keys(pseudoElements));
  var elements = elt.querySelectorAll(classes.map(function (c) {
    return '.' + c;
  }).join(','));
  [].concat(_toConsumableArray(elements)).forEach(addRule);
}

function watch() {

  function callback(mutations) {
    mutations.forEach(function (mutation) {
      return addRule(mutation.target);
    });
  }

  var observer = new MutationObserver(callback);
  var attributeFilter = ['class'];
  var config = { attributes: true, subtree: true, attributeFilter: attributeFilter };
  observer.observe(document, config);
}

exports.default = init;
exports.process = process;
exports.watch = watch;

},{}],2:[function(require,module,exports){
'use strict';

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _2.default); // Test JS for test HTML page to test data-morass-on functionality.

},{"..":1}]},{},[2]);
