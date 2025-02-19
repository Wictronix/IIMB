$(document).ready(function () {
    $('.counter').each(function () {
        var $this = $(this);
        $this.countTo({
            from: 0,
            to: $this.data('count'),
            speed: 3000,
            refreshInterval: 50
        });
    });
});

window.onload = function () {
    var video = document.getElementById('myVideo');
    video.currentTime = 1;
    //video.play();
};

document.addEventListener("DOMContentLoaded", function () {
    const topRightImage = document.querySelector(".top-right-image");
    const hamburgerMenu = document.querySelector("#menu-btn"); // Your actual menu toggle button
    const menu = document.querySelector("#mainmenu"); // The menu that opens

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function () {
            document.body.classList.toggle("menu-open"); // Toggle class on body when menu button is clicked
        });
    }

    // Detect if the menu is actually open by checking computed styles
    const observer = new MutationObserver(() => {
        if (window.getComputedStyle(menu).display !== "none") {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }
    });

    observer.observe(menu, { attributes: true, attributeFilter: ["style"] });

    // Close menu and show image when a menu link is clicked
    document.querySelectorAll("#mainmenu a").forEach(link => {
        link.addEventListener("click", function () {
            setTimeout(() => {
                document.body.classList.remove("menu-open");
            }, 200);
        });
    });
});