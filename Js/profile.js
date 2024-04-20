document.addEventListener('DOMContentLoaded', function() {
    // Attempt to retrieve the user's information from localStorage
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // Select the container where the profile information will be displayed
    var profileContainer = document.querySelector('.profile-container');

    // Check if userInfo exists (i.e., if the user is logged in)
    if (userInfo) {
        // If userInfo exists, create a paragraph element to display the user's email
        var emailDisplay = document.querySelector('p');
        // Set the text content of the paragraph to the user's email
        emailDisplay.textContent = userInfo.email;
        // Append the paragraph to the profile container to display it on the page
        profileContainer.appendChild(emailDisplay);
    } else {
        // If userInfo does not exist, alert the user to log in and redirect them to the login page
        alert('Vui lòng đăng nhập để xem profile.');
        window.location.href = 'login.html';
    }
});
