document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".carousel-item");

    images.forEach(function(image) {
        const overlay = image.querySelector(".overlay");

        image.addEventListener("mouseenter", function() {
            overlay.style.opacity = "1";
        });

        image.addEventListener("mouseleave", function() {
            overlay.style.opacity = "0";
        });
    });
});
