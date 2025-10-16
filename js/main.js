(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    // Set active nav link based on current page
    $(document).ready(function () {
        try {
            var currentFile = window.location.pathname.split('/').pop();
            if (!currentFile) currentFile = 'index.html';
            // Normalize to lower case for comparison
            currentFile = currentFile.toLowerCase();

            // Remove active from all and add to matching link
            var $links = $('.navbar-nav .nav-link');
            $links.each(function () {
                var href = $(this).attr('href') || '';
                // Resolve filename portion of href
                var hrefFile = href.split('/').pop() || 'index.html';
                hrefFile = hrefFile.toLowerCase();
                if (hrefFile === currentFile) {
                    $links.removeClass('active');
                    $(this).addClass('active');
                    return false; // stop loop
                }
            });
        } catch (e) {
            // fail silently if something unexpected happens
            console && console.warn && console.warn('Error setting active nav link', e);
        }
    });
    
    // Hide specific header blocks in mobile: 'Atención general' and 'Envíanos un Correo'
    (function () {
        var hideLabels = ['atención general', 'envíanos un correo'];

        function updateVisibility() {
            var isMobile = $(window).width() <= 576;
            var $blocks = $('.container-fluid > .row.py-3.px-lg-5 .col-lg-8 .d-inline-flex.flex-column');
            $blocks.each(function () {
                var $h6 = $(this).find('h6').first();
                if (!$h6.length) return;
                var text = $h6.text().trim().toLowerCase();
                if (hideLabels.indexOf(text) !== -1) {
                    if (isMobile) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                }
            });
        }

        // Debounced resize handler
        var resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateVisibility, 120);
        });

        // Run now and on ready (covers different load timings)
        try { updateVisibility(); } catch (e) {}
        $(document).ready(updateVisibility);
    })();
    
})(jQuery);

