document.addEventListener('DOMContentLoaded', function() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var profileContainer = document.querySelector('.profile-container');

    if (userInfo) {
        var emailDisplay = document.querySelector('p');
        emailDisplay.textContent = userInfo.email;
        profileContainer.appendChild(emailDisplay);
    } else {
        alert('Vui lòng đăng nhập để xem profile.');
        window.location.href = 'login.html';
    }
});
