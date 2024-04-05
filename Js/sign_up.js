document.addEventListener('DOMContentLoaded', function() {
    var signUp = document.querySelector('.signup');
    var emailInput = document.querySelector('.input-signup-username');
    var passwordInput = document.querySelector('.input-signup-password');

    signUp.addEventListener('submit', function(event) {
        event.preventDefault();

        var email = emailInput.value;
        var password = passwordInput.value;

        if (email.trim() !== '' && password.trim() !== '') {
            var userInfo = {
                email: email,
                password: password
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            alert('Đăng ký thành công!');

            emailInput.value = '';
            passwordInput.value = '';
            window.location.href = 'login.html';
        } else {
            alert('Vui lòng nhập địa chỉ email và mật khẩu.');
        }
    });
});
