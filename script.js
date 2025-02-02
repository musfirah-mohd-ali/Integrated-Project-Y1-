document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-link");

    menuButton.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        }
    });
});
