// // // Function to load translation file
// // function loadTranslationFile(language) {
// //     return axios.get(`./languages/${language}.json`)
// //         .then(response => response.data)
// //         .catch(error => {
// //             console.error(`Could not load ${language}.json.`);
// //             console.error(error);
// //         });
// // }

// // // Load translation files and initialize i18next
// // Promise.all([loadTranslationFile('vi'), loadTranslationFile('ja')]).then(([viTranslation, jaTranslation]) => {
// //     i18next.init({
// //         lng: 'vi', // Default language
// //         resources: {
// //             vi: {
// //                 translation: viTranslation
// //             },
// //             ja: {
// //                 translation: jaTranslation
// //             }
// //         }
// //     }, function (err, t) {
// //         if (err) {
// //             console.error('i18next initialization error:', err);
// //         } else {
// //             jqueryI18next.init(i18next, $);
// //             $('body').localize();
// //         }
// //     });
// // });

// // // Add click event listeners for language change buttons
// // $(document).ready(function () {
// //     $('#change-to-vi').click(() => changeLanguage('vi'));
// //     $('#change-to-ja').click(() => changeLanguage('ja'));
// // });


// // function changeLanguage(language) {

// //     i18next.changeLanguage(language, () => {
// //         $('body').localize();

// //     });
// // }



$(document).ready(function () {
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

    // Xử lý sự kiện click vào nút đăng xuất
    $('#logoutButton').click(function () {
        localStorage.removeItem('user'); // Xóa thông tin người dùng từ localStorage

        // Hiển thị lại nút đăng ký và đăng nhập
        $('#success').hide();
        $('#openSignupModal').show();
        $('#openSigninModal').show();
    });

    // Xử lý sự kiện click vào nút mở form đăng ký từ modal đăng nhập
    $(document).on('click', '#openSignupFromSignin', function () {
        $('#loginModal').modal('hide');
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
            setupRegisterFormSubmitEvent(); // Thiết lập sự kiện submit cho form đăng ký
        });
    });

    // Xử lý sự kiện click vào nút mở form đăng ký từ modal đăng nhập
    $(document).on('click', '#openSignupFromSignin', function () {
        $('#loginModal').modal('hide');
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
            setupRegisterFormSubmitEvent(); // Thiết lập sự kiện submit cho form đăng ký
        });
    });

    // Xử lý sự kiện click vào nút mở form đăng nhập từ modal đăng ký
    $(document).on('click', '#openSigninFromSignup', function () {
        $('#registerModal').modal('hide');
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show');
            setupLoginFormSubmitEvent(); // Thiết lập sự kiện submit cho form đăng nhập
        });
    });

    // Xử lý sự kiện click vào nút mở modal đăng ký từ ngoài
    $('#openSignupModal').click(function () {
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
            setupRegisterFormSubmitEvent(); // Thiết lập sự kiện submit cho form đăng ký
        });
    });

    // Xử lý sự kiện click vào nút mở modal đăng nhập từ ngoài
    $('#openSigninModal').click(function () {
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show');
            setupLoginFormSubmitEvent(); // Thiết lập sự kiện submit cho form đăng nhập
        });
    });

    // Hàm thiết lập sự kiện submit cho form đăng ký
    function setupRegisterFormSubmitEvent() {
        $('#registerForm').off('submit').on('submit', function (event) {
            event.preventDefault();

            const firstName = $('#firstName').val().trim();
            const lastName = $('#lastName').val().trim();
            const email = $('#email').val().trim();
            const password = $('#password').val().trim();
            const confirmPassword = $('#confirmPassword').val().trim();

            // Basic validation for empty fields
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill out all fields.');
                return;
            }

            // Validate email format using a regular expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Check if password and confirm password match
            if (password !== confirmPassword) {
                alert('Password and confirm password do not match.');
                return;
            }

            // Call the signup API
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
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(error => { throw new Error(error.message); });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Registration successful:', data);
                    $('#registerModal').modal('hide');
                    alert('User registered successfully. Please log in.');
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    alert('An error occurred during registration. Please try again.');
                });
        });
    }

    // Hàm thiết lập sự kiện submit cho form đăng nhập
    function setupLoginFormSubmitEvent() {
        $('#loginForm').off('submit').on('submit', function (event) {
            event.preventDefault();

            const email = $('#email').val();
            const password = $('#password').val();


            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            // Call login API
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
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(error => { throw new Error(error.message); });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Login successful:', data);
                    $('#loginModal').modal('hide');

                    localStorage.setItem('user', JSON.stringify({
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        role: data.user.role
                    }));

                    var successButton = document.getElementById('success');
                    var textSpan = successButton.querySelector('.text');
                    textSpan.innerHTML = `<i class="fas fa-user-circle"></i> ${data.user.firstName} ${data.user.lastName}`;

                    successButton.style.display = 'block';
                    $('#openSignupModal').hide();
                    $('#openSigninModal').hide();
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin.html';
                    }
                    if (data.user.role === 'user') {
                        window.location.href = 'home.html';
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    alert('Email hoặc mật khẫu chưa đúng. Vui lòng nhập lại!');
                });

        });
    }

});



