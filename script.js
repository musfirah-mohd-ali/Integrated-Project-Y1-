/*FOR HAMBURGER MENU*/
document.addEventListener('DOMContentLoaded',function(){
    const menuButton = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    menuButton.addEventListener("click",function (){
        if (window.innerWidth<=768){
            navLinks.computedStyleMap.display = navLinks.style.display === "flex" ? "none" : "flex";
        }
    });
});