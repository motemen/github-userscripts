(function () {
    if (typeof $ === 'undefined') {
        setTimeout(arguments.callee, 100);
        return;
    }

    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var found = false;
        $($('.diff-view .file').toArray().reverse()).each(function () {
            var $this = $(this);
            if (!found && $this.position().top <= scrollTop + 5) {
                $this.css('paddingTop', 44).find('.meta').css({
                    position: 'fixed',
                    top: 5,
                    borderTop: '1px solid #d8d8d8',
                    width: $this.width()
                });
                found = true;
            } else {
                $this.css('paddingTop', 0).find('.meta').css({
                    position: 'static',
                    top: 0,
                    borderTop: 'none',
                    width: 'auto'
                });
            }
        });
    });
})();
