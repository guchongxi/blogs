---
---

// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };
}

//backTop
Math.easeout = function (A, B, rate, callback) {
    if (A == B || typeof A != 'number') {
        return;
    }
    B = B || 0;
    rate = rate || 2;

    var step = function () {
        A = A + (B - A) / rate;

        if (A < 1) {
            callback(B, true);
            return;
        }
        callback(A, false);
        requestAnimationFrame(step);
    };
    step();
};

    $(function() {
        var toc     = $('.toc-link'),
            sidebar = $('#sidebar'),
            main    = $('#main'),
            menu    = $('#menu'),
            toTop    = $('#toTop'),
            x1, y1;

        // run this function after pjax load.
        var afterPjax = function() {
            // open links in new tab.
            $('#main').find('a').filter(function() {
                return this.hostname != window.location.hostname;
            }).attr('target', '_blank');

            // discus comment.
            {% if site.disqus_shortname %}
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//{{ site.disqus_shortname }}' + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
            {% endif %}

            // your scripts
        };
        afterPjax();


        // NProgress
        NProgress.configure({ showSpinner: false });


        // Pjax
        $(document).pjax('#sidebar-avatar, .toc-link', '#main', {
            fragment: '#main',
            timeout: 3000
        });

        $(document).on({
            'pjax:click': function() {
                NProgress.start();
                main.removeClass('fadeIn');
            },
            'pjax:end': function() {
                afterPjax();
                NProgress.done();
                main.scrollTop(0).addClass('fadeIn');
                menu.add(sidebar).removeClass('open');
                {% if site.google_analytics %}
                ga('set', 'location', window.location.href);
                ga('send', 'pageview');
                {% endif %}
            }
        });


        // Tags Filter
        $('#sidebar-tags').on('click', '.sidebar-tag', function() {
            var filter = $(this).data('filter');
            if (filter === 'all') {
                toc.fadeIn(350);
            } else {
                toc.hide();
                $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
            }
            $(this).addClass('active').siblings().removeClass('active');
        });


        // Menu
        menu.on('click', function() {
            $(this).add(sidebar).toggleClass('open');
        });

        //Search  at 2017/1/22
        $allLink = $('.toc-link');//所有链接
        $('#search-input').on('input', function(){
            var value = this.value;
            $allLink.hide();
            $.each($allLink, function(k, v){
                $(v).filter(":contains('"+value+"')").fadeIn(350);
            });
        });

        //backTop
        toTop.on('click',function () {
            console.log(11);
            Math.easeout(main[0].scrollTop, 0, 4, function (value) {
                main[0].scrollTop = value;
            });
        });

    });


