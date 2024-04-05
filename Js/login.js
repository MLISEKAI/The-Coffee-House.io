document.addEventListener('DOMContentLoaded', function(){
    var loginForm = document.querySelector('.login');
    var emailLoginInput = document.querySelector('.input-login-username');
    var passwordLoginInput = document.querySelector('.input-login-password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var email = emailLoginInput.value;
        var password = passwordLoginInput.value;

        if (email.trim() !== '' && password.trim() !== '') {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.email === email && userInfo.password === password) {
                alert('Đăng nhập thành công!');
                window.location.href = "index.html";
            }
            else {
                alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
            };
        } else {
            alert('Vui lòng nhập địa chỉ email và mật khẩu.');
        }
    });
});


