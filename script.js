// HAMBURGER MENU
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-link");
    menuButton.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        }
    });
});

// FUNCTION TO TOGGLE BETWEEN SIGN UP AND LOG IN
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

// LOG IN API #1
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
        "url": "https://muslitravlesdb-2cac.restdb.io/rest/contact",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "67a77bb54d8744b75b82803c", // Ensure this API key is correct
            "cache-control": "no-cache"
        }
    }).done(function (response) {
        console.log("Login Response:", response); // Log the response from the server
        let user = response.find(u => u.username === username && u.password === password);
        console.log("Found User:", user); // Log the user found (if any)

        if (user) {
            window.location.href = "index.html"; // Redirect to home page after successful login
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
        "url": "https://muslitravlesdb-2cac.restdb.io/rest/contact",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "67a77bb54d8744b75b82803c", // Ensure this API key is correct
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

// LIST OF PRODUCTS API #2  
function productList() {
    var settings = {
        "async": true, // Allow AJAX request to run asynchronously
        "crossDomain": true, // Required for cross-origin requests
        "url": "https://muslitravlesdb-2cac.restdb.io/rest/products", // API endpoint for fetching product data
        "method": "GET", // HTTP method to retrieve data
        "headers": {
            "content-type": "application/json", // Ensure response is in JSON format
            "x-apikey": "67a77bb54d8744b75b82803c", // API key for authentication
            "cache-control": "no-cache" // Prevent cached responses
        }
    };

    // Fetch product data from API
    $.ajax(settings).done(function (response) {
        console.log("Products API Response:", response); // Debugging: Log response to console

        const shopContainer = $(".shop-items"); // Select the shop container where products will be displayed
        shopContainer.empty(); // Clear any existing products before loading new ones

        // Ensure response is an array before looping to prevent errors
        if (!Array.isArray(response)) {
            console.error("Unexpected API response format:", response);
            return;
        }

        // Loop through product data and dynamically create product cards
        response.forEach(product => {
            let productCard = `
                <div class="shop-card">
                    <img src="${product.image_url}" alt="${product.name}"> <!-- Product image -->
                    <h2>${product.name}</h2> <!-- Product name -->
                    <p class="price">$${parseFloat(product.price).toFixed(2)}</p> <!-- Display price with 2 decimal places -->
                    <button onclick="window.location.href='itemDetail.html?id=${product._id}'">Explore</button> <!-- Redirect to itemDetail page -->
                </div>
            `;
            shopContainer.append(productCard); // Append generated product card to shop container
        });
    }).fail(function (error) {
        console.error("Error fetching products:", error); // Debugging: Log error in console
    });
}

// LOAD PRODUCTS WHEN PAGE LOADS
$(document).ready(function() {
    productList(); // Call function to fetch and display products
});

// PRODUCT DETAIL API #3
function fetchProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get the product ID from the URL
    
    if (!productId) {
        console.error("Product ID is missing");
        return; // Exit if there's no product ID
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://muslitravlesdb-2cac.restdb.io/rest/products/${productId}`, // Add product ID to URL
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "67a77bb54d8744b75b82803c",
            "cache-control": "no-cache"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log("Product details:", response); // Debugging: log the response

        // Populate the page with product data
        $('#item-name').text(response.name);
        $('#item-price').text(`$${parseFloat(response.price).toFixed(2)}`);
        $('#item-description').text(response.description);
        $('#item-image').attr('src', response.image_url);
    }).fail(function (error) {
        console.error("Error fetching product details:", error);
    });
}

// Load product details when the page is ready
$(document).ready(function() {
    fetchProductDetails(); // Call the function to load product details
});

let itemsData = []; // This will store the JSON data loaded from the file

//TO CALL JSON FILE
fetch('items.json')
    .then(response => response.json())
    .then(data => {
        itemsData = data.items; // Store the items in the global variable
    })
    .catch(error => console.error("Error loading items JSON:", error));

// FUNCTION TO ADD TO CART
function addToCart() {
    let name = document.getElementById("item-name").textContent; // Get item name from the page
    let quantity = parseInt(document.getElementById("quantity").value); // Get quantity from input

    // Find the item in the JSON data
    let item = itemsData.find(item => item.name === name);

    if (!item) {
        alert("Item not found in inventory.");
        return;
    }

    let price = item.price; // Get the price from the JSON data

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(itemInCart => itemInCart.name === name);

    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if the item exists in the cart
    } else {
        cart.push({ name, price, quantity }); // Add new item if it doesn't exist
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart to localStorage
    console.log("Cart after adding item:", cart); // Debugging: log the updated cart

    alert("Item added to cart!");
}

// FUNCTION TO DISPLAY CART
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotalContainer = document.getElementById("cart-total");
    
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} (Qty: ${item.quantity}) - $${itemTotal.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalContainer.textContent = `$${total.toFixed(2)}`;
}

// FUNCION FOR PAYMENT
function handlePaymentSubmission(event) {
    event.preventDefault(); // Prevent form submission

    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Show payment success popup
    alert("Payment successful! You will be redirected to the homepage.");

    // Redirect to index.html
    window.location.href = "index.html";
}

// Handle Payment Submission on page load
document.addEventListener("DOMContentLoaded", () => {
    let paymentForm = document.querySelector(".payment-container form");

    if (paymentForm) {
        paymentForm.addEventListener("submit", handlePaymentSubmission);
    }
});
