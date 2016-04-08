// js/morass.js -- library to handle pseudo-elements.
//
// A pseudo-element is specified in morass using the `data-morass-on` property.
// Its value can be a pseudo-class such as `:hover`.
// Comma-delimited values are also supported, such as `:hover, :visited`.
//
// Another property `data-morass-media` is used to specify media queries.
//
// Initialize with a call to `init`.
// The `opts` parameter is a hash which may include a `media`, property,
// a hash mapping media names to media queries.

var sheet;
var lastId = 0;
var medias = {};   // media query synonyms
var atts = {};     // attributes corresponding to pseudo-classes

// List of indices for each data-morass-id.

var rules = {};

function setOptions(opts = {}) {
  medias = opts.medias || {};
  atts = opts.atts || {};
}

function init(opts) {
  setOptions(opts);
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  sheet = styleEl.sheet;
}

function getId(elt) {
  return elt.dataset.morassId || (elt.dataset.morassId = ++lastId);
}

// Given a selector as specified by `data-morass-on`,
// create a selector to turn on `all: unset` for case where it does **not** apply.
function makeOnSelector(sel) {

}

function addRule(elt) {
  var id = getId(elt);
  var on = elt.dataset.morassOn;

  var media = elt.dataset.morassMedia;
  var ruleId = rules[id];
  var idSelector = `[data-morass-id='${id}']`;
  var cssRule;

  // Find media abbreviation if specified, as in
  // `init({media: {phone: 'max-width: 360'}})`.
  media = medias[media] || media;

  if (ruleId) sheet.deleteRule(ruleId);

  // For now, make on (pseudo-classes) and media queries mutually exclusive.
  if (on)
    cssRule = `${idSelector}:not(${on}) { all: unset; }`;
  else if (media)
    cssRule = `@media not all and (${media}) { ${idSelector} { all: unset !important; } }`;

  sheet.insertRule(cssRule, sheet.cssRules.length);
}

function process(elt = document) {
  [...elt.querySelectorAll('[data-morass-on], [data-morass-media]')] . forEach(addRule);
}

function watch() {

  function callback(mutations) {
    mutations.forEach(mutation => addRule(mutation.target));
  }

  var observer = new MutationObserver(callback);
  var attributeFilter = ['data-morass-on', 'data-morass-media'];
  var config = {attributes: true, subtree: true, attributeFilter};
  observer.observe(document, config);
}

export {init, process, watch};
