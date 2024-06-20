// // Function to load translation file
// function loadTranslationFile(language) {
//     return axios.get(`./languages/${language}.json`)
//         .then(response => response.data)
//         .catch(error => {
//             console.error(`Could not load ${language}.json.`);
//             console.error(error);
//         });
// }

// // Load translation files and initialize i18next
// Promise.all([loadTranslationFile('vi'), loadTranslationFile('ja')]).then(([viTranslation, jaTranslation]) => {
//     i18next.init({
//         lng: 'vi', // Default language
//         resources: {
//             vi: {
//                 translation: viTranslation
//             },
//             ja: {
//                 translation: jaTranslation
//             }
//         }
//     }, function (err, t) {
//         if (err) {
//             console.error('i18next initialization error:', err);
//         } else {
//             jqueryI18next.init(i18next, $);
//             $('body').localize();
//         }
//     });
// });

// // Add click event listeners for language change buttons
// $(document).ready(function () {
//     $('#change-to-vi').click(() => changeLanguage('vi'));
//     $('#change-to-ja').click(() => changeLanguage('ja'));
// });


// function changeLanguage(language) {

//     i18next.changeLanguage(language, () => {
//         $('body').localize();

//     });
// }



// $(document).ready(function () {
//     $("#navbar-container").load("nav.html");
// });

// function showDropdown(element) {
//     var dropdownContent = element.querySelector('.dropdown-content');
//     dropdownContent.style.display = "block";
// }

// function hideDropdown(element) {
//     var dropdownContent = element.querySelector('.dropdown-content');
//     dropdownContent.style.display = "none";
// }



$(document).ready(function () {
    // Load and open the signup modal when the link in the signin modal is clicked
    $(document).on('click', '#openSignupFromSignin', function () {
        $('#loginModal').modal('hide');
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
        });
    });

    // Load and open the signin modal when the link in the signup modal is clicked
    $(document).on('click', '#openSigninFromSignup', function () {
        $('#registerModal').modal('hide');
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show');
        });
    });
});


$(document).ready(function () {
    $('#openSignupModal').click(function () {
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');

            // Thêm event listener sau khi form đăng ký được tải và hiển thị
            document.querySelector('#registerForm').addEventListener('submit', function (event) {
                // Ngăn chặn hành vi mặc định của form
                event.preventDefault();

                // Lấy dữ liệu từ form
                const firstName = document.querySelector('#firstName').value;
                const lastName = document.querySelector('#lastName').value;
                const email = document.querySelector('#email').value;
                const password = document.querySelector('#password').value;
                const confirmPassword = document.querySelector('#confirmPassword').value;


                // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp không
                if (password !== confirmPassword) {
                    alert('Mật khẩu và mật khẩu xác nhận không khớp!');
                    return;
                }

                // Gọi API
                // fetch('http://localhost:3000/api/signup', {
                // fetch('https://webtiengnhat-be.onrender.com/api/signup', {
                fetch('http://localhost:3000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        $('#registerModal').modal('hide');

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        });
    });
});


$(document).ready(function () {
    // Kiểm tra localStorage khi tải trang
    var loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser) {
        // Nếu có thông tin đăng nhập trong localStorage
        var successButton = document.getElementById('success');
        var textSpan = successButton.querySelector('.text');
        textSpan.innerHTML = `<i class="fas fa-user-circle"></i> ${loggedInUser.firstName} ${loggedInUser.lastName}`;

        // Hiển thị nút #success và ẩn nút #openSignupModal và #openSigninModal
        successButton.style.display = 'block';
        $('#openSignupModal').hide();
        $('#openSigninModal').hide();
    } else {
        // Nếu không có thông tin đăng nhập trong localStorage
        $('#success').hide();
        $('#openSignupModal').show();
        $('#openSigninModal').show();
    }

    $('#openSigninModal').click(function () {
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show');

            // Thêm event listener sau khi form đăng nhập được tải và hiển thị
            document.querySelector('#loginForm').addEventListener('submit', function (event) {
                // Ngăn chặn hành vi mặc định của form
                event.preventDefault();

                // Lấy dữ liệu từ form
                const email = document.querySelector('#email').value;
                const password = document.querySelector('#password').value;

                // Gọi API
                // fetch('https://webtiengnhat-be.onrender.com/api/login', {
                fetch('http://localhost:3000/api/login', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        console.log(data.user.firstName);

                        // Đóng modal sau khi đăng nhập thành công
                        $('#loginModal').modal('hide');

                        // Lưu thông tin người dùng vào localStorage
                        localStorage.setItem('user', JSON.stringify({
                            firstName: data.user.firstName,
                            lastName: data.user.lastName
                        }));

                        // Cập nhật nội dung của nút #success với icon account và tên người dùng
                        var successButton = document.getElementById('success');
                        var textSpan = successButton.querySelector('.text');
                        textSpan.innerHTML = `<i class="fas fa-user-circle"></i> ${data.user.firstName} ${data.user.lastName}`;

                        // Hiển thị nút #success và ẩn nút #openSignupModal và #openSigninModal
                        successButton.style.display = 'block';
                        $('#openSignupModal').hide();
                        $('#openSigninModal').hide();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        });
    });

    // Xử lý sự kiện click vào nút đăng xuất
    $('#logoutButton').click(function () {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');

        // Ẩn nút #success và hiển thị lại nút #openSignupModal và #openSigninModal
        $('#success').hide();
        $('#openSignupModal').show();
        $('#openSigninModal').show();
    });

});

