document.addEventListener("DOMContentLoaded", function () {
    // Grab the toggle form link to switch between "Sign Up" and "Log In"
    const toggleForm = document.getElementById('toggleForm');
    const formTitle = document.getElementById('form-title');
    const emailFields = document.getElementsByClassName('email'); // Get all email input fields
    const authButton = document.getElementById('auth-btn');
    const authForm = document.getElementById('auth-form');

    // This listener is responsible for switching between Sign Up and Log In
    toggleForm.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default action of the link (e.g., page reload)

        // If the form title is "Sign Up", switch to "Log In"
        if (formTitle.innerText === "Sign Up") {
            formTitle.innerText = "Log In";
            for (let i = 0; i < emailFields.length; i++) {
                emailFields[i].style.display = "none"; // Hide email field for login
            }
    
            authButton.innerText = "Log In"; // Change the button text to "Log In"
            authButton.setAttribute("data-auth", "login"); // Mark the button for login action
            toggleForm.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>"; // Change toggle link text to sign up
        } else {
            // If the form title is "Log In", switch back to "Sign Up"
            formTitle.innerText = "Sign Up";
            for (let i = 0; i < emailFields.length; i++) {
                emailFields[i].style.display = "block"; // Show email field for sign up
            }
            authButton.innerText = "Sign Up"; // Change the button text to "Sign Up"
            authButton.setAttribute("data-auth", "signup"); // Mark the button for sign up action
            toggleForm.innerHTML = "Already have an account? <a href='#'>Log In</a>"; // Change toggle link text to log in
        }
    });

    // Handle form submission when either Sign Up or Log In is clicked
    authForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload on form submission
        console.log("Form submitted!"); // Debugging the form submission

        const action = authButton.getAttribute("data-auth"); // Determine if it's login or signup
        console.log(`Action: ${action}`); // Debugging the action type

        // If it's a signup action, call the signUp() function
        if (action === "signup") {
            signUp();
        } else {
            // If it's a login action, call the login() function
            login();
        }
    });
});

// LOG IN
function login() {
    const username = document.getElementById("full-name").value;
    const password = document.getElementById("password").value;
    
    console.log("Login Username:", username); // Debugging the entered username
    console.log("Login Password:", password); // Debugging the entered password
    
    // If username or password is empty, show an alert and stop the process
    if (!username || !password) {
        alert("Please enter username and password.");
        return;
    }

    // AJAX request to check if the entered username and password match any user
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://muslitravels-cac3.restdb.io/rest/contact",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "67a38794babf100271ec9b92", // Ensure this API key is correct
            "cache-control": "no-cache"
        }
    }).done(function (response) {
        console.log("Login Response:", response); // Log the response from the server
        let user = response.find(u => u.username === username && u.password === password);
        console.log("Found User:", user); // Log the user found (if any)

        if (user) {
            window.location.href = "index.html"; // Redirect to home page after successful login
            alert("Login successful!");
        } else {
            alert("Invalid username or password."); // Show error if user not found
        }
    }).fail(function () {
        alert("Error logging in. Please try again."); // Handle AJAX errors
    });
}

// SIGN UP
function signUp() {
    const username = document.getElementById("full-name").value;
    const email = document.getElementsByClassName("email")[1].value; // Select the email input
    const password = document.getElementById("password").value;

    // Debugging the form values
    console.log("Sign Up Username:", username);
    console.log("Sign Up Email:", email);
    console.log("Sign Up Password:", password);

    // Check if all fields are filled out, if not, alert the user
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return; // Stop the sign-up process if any field is empty
    }

    // Create a new user object with the entered data
    const newUser = {
        username: username,
        email: email,
        password: password,
    };

    console.log("New User Data to Send:", newUser); // Debugging the data to be sent

    // AJAX request to send the new user data to the server
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://muslitravels-cac3.restdb.io/rest/contact",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "67a38794babf100271ec9b92", // Ensure this API key is correct
            "cache-control": "no-cache"
        },
        "data": JSON.stringify(newUser), // Send the user data as a JSON string
    }).done(function (response) {
        console.log("Sign Up Response:", response); // Log the response from the server
        alert("Sign-up successful! Redirecting to home page..."); // Alert the user of success
        window.location.href = "index.html"; // Redirect to the home page after successful sign-up
    }).fail(function () {
        alert("Error signing up. Please try again."); // Handle AJAX errors
    });
}
