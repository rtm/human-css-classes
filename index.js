// js/morass.js -- library to handle pseudo-elements.
//
// A pseudo-element is specified in morass using a pseudo-element class such as `hover`.
// A media query is similary specified using a class such as `desktop`.
//
// Initialize with a call to the default export, with a
// `opts` parameter is a hash which may include a `mediaQueries` or `pseudoElements`.

var sheet;
var lastId = 0;
var mediaQueries = {};     // media query synonyms
var pseudoElements = {};   // aliases for pseudo-elements

// List of indices for each data-morass-id.
var rules = {};

// Decipher and store options.
function setOptions(opts = {}) {
  mediaQueries = opts.mediaQueries || defaultMediaQueries;
  pseudoElements = opts.pseudoElements || defaultPseudoElements;
}

const _pseudos = [
  'checked', 'default', 'disabled', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'focus',
  'hover', 'indeterminate', 'in-range', 'invalid', 'last-child', 'last-of-type',
  'only-child', 'only-of-type', 'optional', 'out-of-range', 'read-only', 'read-write',
  'required', 'target', 'valid', 'visited'];

// This is a default list of pseudo-elements, suitable for use as the value of the
// 'pseudoElements' property of the `opts` parameter passed to `init`.
const defaultPseudoElements = _pseudos.reduce((result, x) => {
  result[x] = x;
  return result;
}, {});

// This is a default list of media queries, suitable for use as the value of the
// 'mediaQueries' property of the `opts` parameter passed to `init`.
const defaultMediaQueries = {
  tablet:  '(min-width: 768px) and (max-width: 1023)',
  desktop: 'min-width: 1024px',
  mobile:   'max-width: 767px'
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
  var media  = [...classes].filter(cls => Object.keys(mediaQueries).indexOf(cls) > -1);
  var pseudo = [...classes].filter(cls => Object.keys(pseudoElements).indexOf(cls) > -1);
  var ruleId = rules[id];
  var idSelector = `[data-morass-id='${id}']`;
  var cssRule;

  if (ruleId !== undefined) {
    sheet.deleteRule(ruleId);
    delete rules[id];
  }

  // For now, make on (pseudo-classes) and media queries mutually exclusive.
  if (pseudo.length) {
    cssRule = `${idSelector}${pseudo.map(p => `:not(:${p})`)} { all: unset; }`;
  } else if (media.length)
    cssRule = `@media not all and ${media.map(m => `(${mediaQueries[m]}`) . join(' or ')}) { ${idSelector} { all: unset !important; } }`;

  if (cssRule) rules[id] = sheet.insertRule(cssRule, sheet.cssRules.length);
}

function process(elt = document) {
  var classes = Object.keys(mediaQueries).concat(Object.keys(pseudoElements));
  var elements = elt.querySelectorAll(classes . map(c => '.' + c) . join(','));
  [...elements] . forEach(addRule);
}

function watch() {

  function callback(mutations) {
    mutations.forEach(mutation => addRule(mutation.target));
  }

  var observer = new MutationObserver(callback);
  var attributeFilter = ['class'];
  var config = {attributes: true, subtree: true, attributeFilter};
  observer.observe(document, config);
}

export {init as default, process, watch};
