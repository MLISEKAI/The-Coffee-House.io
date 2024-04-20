document.addEventListener('DOMContentLoaded', function() {
    // Select the sign-up form and input fields for email and password
    var signUp = document.querySelector('.signup');
    var emailInput = document.querySelector('.input-signup-username');
    var passwordInput = document.querySelector('.input-signup-password');

    // Add an event listener to handle the form submission
    signUp.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve the values entered in the email and password fields
        var email = emailInput.value;
        var password = passwordInput.value;

        // Check if both email and password fields are not empty
        if (email.trim() !== '' && password.trim() !== '') {
            // Create an object to store the user's email and password
            var userInfo = {
                email: email,
                password: password
            };
            // Store the user information in localStorage after converting it to a string
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Notify the user of successful registration
            alert('Successful registration!');
            // Clear the input fields
            emailInput.value = '';
            passwordInput.value = '';
            // Redirect the user to the login page
            window.location.href = 'login.html';
        } else {
            // Alert the user to enter both email and password
            alert('Please enter email address and password.');
        }
    });
});