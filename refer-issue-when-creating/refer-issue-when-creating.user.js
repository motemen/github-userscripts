// ==UserScript==
// @name      GitHub Refer Issue When Creating One From An Issue Page
// @namespace http://motemen.github.io/
// @match     https://github.com/*
// ==/UserScript==

(function () {

var observer = new MutationObserver(function (mutations) {
  update();
});
observer.observe(document.body, { childList: true, subtree: true });

var rxIssuePRNumber = /\/(?:issues|pull)\/(\d+)$/;

function update () {
  var m = rxIssuePRNumber.exec(location.pathname);
  if (!m) return;

  var number = m[1];

  var newButton = document.querySelector('.gh-header-actions a[href$="/issues/new"]');
  if (!newButton) return;

  if (newButton.getAttribute('data-userscript-refer-issue-listener-set')) {
    return;
  }

  newButton.addEventListener('click', function () {
    var titleElem = document.querySelector('.gh-header-title span');
    if (!titleElem) return;

    var title = titleElem.textContent + ': ' + document.getSelection().toString(),
        body  = '#' + number;

    this.href = this.href + '?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
  }, true);

  newButton.setAttribute('data-userscript-refer-issue-listener-set', true);
}

update();

})();
