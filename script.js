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

/*LOGIN.HTML to switch between Sign Up and Log In dynamically*/
const toggleForm = document.getElementById('toggleForm');
const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const nameField = document.getElementById('name-field');
const authButton = document.getElementById('.auth-btn');
toggleForm.addEventListener('click', (e) => {
    e.preventDefault(); // prevent the link from changing to another page
    if (formTitle.innerText === "Sign Up") {
        //switching to login
        formTitle.innerText = "Log In"; //changes the heading
        nameField.style.display = "none"; //hide full name field
        authButton.innerText = "Log In"; //changes the submit button text
        toggleForm.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>"; //update the toggle link
    } else {
        //switching to sign up
        formTitle.innerText = "Sign Up"; //changes the heading
        nameField.style.display = "block"; //show full name field
        authButton.innerText = "Sign Up"; //changes the submit button text
        toggleForm.innerHTML = "Already have an account? <a href='#'>Log In</a>"; //update the toggle link
    }
});