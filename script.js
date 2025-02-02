/*HAMBURGER MENU*/ 
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-link");

    menuButton.addEventListener("click", function (event) {
        event.stopPropagation();
        navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
    });
    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target)&& !menuButton.contains(event.target)){
            navLinks.style.display = "none";
        }
    });
});