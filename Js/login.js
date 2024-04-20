// This event listener waits for the entire HTML document to be loaded before executing the enclosed code.
document.addEventListener('DOMContentLoaded', function(){
    // Selects the login form and input fields for email and password using their class names.
    var loginForm = document.querySelector('.login');
    var emailLoginInput = document.querySelector('.input-login-username');
    var passwordLoginInput = document.querySelector('.input-login-password');

    // Adds an event listener to the login form that triggers when the form is submitted.
    loginForm.addEventListener('submit', function(event) {
        // Prevents the default form submission action, which typically refreshes the page.
        event.preventDefault();

        // Retrieves the values entered in the email and password input fields.
        var email = emailLoginInput.value;
        var password = passwordLoginInput.value;

        // Checks if both email and password fields are not empty after trimming whitespace.
        if (email.trim() !== '' && password.trim() !== '') {
            // Attempts to retrieve the user information from localStorage and parse it from a string to an object.
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // Checks if the retrieved userInfo exists and matches the entered email and password.
            if (userInfo && userInfo.email === email && userInfo.password === password) {
                // Alerts the user of successful login and redirects them to the index page.
                alert('Logged in successfully!');
                window.location.href = "index.html";
            }
            else {
                // Alerts the user if the entered email or password does not match the stored information.
                alert('Incorrect username or password.');
            };
        } else {
            // Alerts the user to enter both email and password if either field is left empty.
            alert('Please enter email address and password.');
        }
    });
});

