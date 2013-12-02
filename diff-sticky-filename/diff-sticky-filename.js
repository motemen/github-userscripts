(function () {
    if (typeof $ === 'undefined') {
        setTimeout(arguments.callee, 100);
        return;
    }

    $('<style>').text([
        '.diff-view .file.userscript-dsf-sticky {',
        '   padding-top: 44px;',
        '}',
        '.diff-view .file.userscript-dsf-sticky .meta {',
        '   position: fixed;',
        '   top: 5px;',
        '   border-top: 1px solid #d8d8d8;',
        '}'
    ].join('\n')).appendTo(document.querySelector('head'));

    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var found = false;
        $($('.diff-view .file').toArray().reverse()).each(function () {
            var $this = $(this);
            if (!found && $this.position().top <= scrollTop + 5) {
                $this.addClass('userscript-dsf-sticky');
                $this.find('.meta').css({ width: $this.width() });
                found = true;
            } else {
                $this.removeClass('userscript-dsf-sticky');
                $this.find('.meta').css({ width: 'auto' });
            }
        });
    });
})();
