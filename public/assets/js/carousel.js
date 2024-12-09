function initializeCarousel() {
    $(".testimonial-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1, // Mobile: 1 item per slide
            },
            864: {
                items: 1, // Tablets: 2 items per slide
            },
            1024: {
                items: 2, // Desktop: 2 items per slide
            },
            1230: {
                items: 2,
            },
            1496: {
                items: 3,
            }
        }
    });
}

$(document).ready(function() {
    initializeCarousel();
});
