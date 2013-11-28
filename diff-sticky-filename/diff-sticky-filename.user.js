// ==UserScript==
// @name      GitHub diff sticky filename
// @namespace http://motemen.github.io/
// @match     https://github.com/*/*/commit/*
// @match     https://github.com/*/*/pull/*
// @match     https://github.com/*/*/pull/*/files
// @match     https://github.com/*/*/compare/*
// ==/UserScript==

var s = document.createElement('script');
s.src = 'https://raw.github.com/motemen/github-userscripts/master/diff-sticky-filename/diff-sticky-filename.js';
document.body.appendChild(s);
