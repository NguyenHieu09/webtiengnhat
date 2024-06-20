$(document).ready(function () {
    // Thêm sự kiện click vào nút #openSigninModal
    $('#openSigninModal').click(function () {
        // Load nội dung của modal từ signIn.html và hiển thị
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show'); // Hiển thị modal sau khi load thành công
        });
    });

    // Xử lý submit form đăng nhập (nếu cần)
    $(document).on('submit', '#loginForm', function (event) {
        event.preventDefault();
        // Thực hiện xử lý đăng nhập tại đây nếu cần
        // Ví dụ: Gọi API đăng nhập và xử lý kết quả
    });

    // Xử lý sự kiện đăng ký từ trong modal đăng nhập
    $(document).on('click', '#openSignupFromSignin', function () {
        // Đóng modal đăng nhập
        $('#loginModal').modal('hide');
        // Load và hiển thị modal đăng ký từ signUp.html
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
        });
    });
});
