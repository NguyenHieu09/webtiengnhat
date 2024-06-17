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

function showDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "block";
}

function hideDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "none";
}



// $(document).ready(function () {
//     $('#openSignupModal').click(function () {
//         $('#modal-container').load('signUp.html #registerModal', function () {
//             $('#registerModal').modal('show');
//         });
//     });
// });

// $(document).ready(function () {
//     $('#openSigninModal').click(function () {
//         $('#modal-container').load('signIn.html #loginModal', function () {
//             $('#loginModal').modal('show');
//         });
//     });
// });


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
                fetch('https://webtiengnhat-be.onrender.com/api/signup', {

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
                // fetch('http://localhost:3000/api/login', {
                fetch('https://webtiengnhat-be.onrender.com/api/login', {
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
                        $('#loginModal').modal('hide');
                        localStorage.setItem('username', data.user.firstName + ' ' + data.user.lastName);

                        // Thay đổi nút "Đăng nhập" và "Đăng kí" thành "Xin chào, [Tên người dùng]"
                        $('#openSigninModal').hide();
                        $('#openSignupModal').hide();

                        // var greeting = $('<div>').text('Xin chào, ' + data.user.firstName + ' ' + data.user.lastName);
                        // $('.d-flex').append(greeting);

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        });
    });
});



