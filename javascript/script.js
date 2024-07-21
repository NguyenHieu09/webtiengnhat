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
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));

    if (loggedInUser) {
        // Nếu có thông tin đăng nhập trong sessionStorage
        var successButton = document.getElementById('success');
        var textSpan = successButton.querySelector('.text');
        textSpan.innerHTML = `<i class="fas fa-user-circle"></i> ${loggedInUser.firstName} ${loggedInUser.lastName}`;

        // Hiển thị nút #success và ẩn nút #openSignupModal và #openSigninModal
        successButton.style.display = 'block';
        $('#openSignupModal').hide();
        $('#openSigninModal').hide();
    } else {
        // Nếu không có thông tin đăng nhập trong sessionStorage
        $('#success').hide();
        $('#openSignupModal').show();
        $('#openSigninModal').show();
    }

    // Xử lý sự kiện click vào nút đăng xuất
    $('#logoutButton').click(function () {
        sessionStorage.removeItem('user'); // Xóa thông tin người dùng từ sessionStorage

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
                alert('Vui lòng điền đầy đủ tất cả các trường.');
                return;
            }

            // Validate email format using a regular expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ.');
                return;
            }

            // Check if password and confirm password match
            if (password !== confirmPassword) {
                alert('Mật khẩu và mật khẩu xác nhận không khớp.');
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
                    alert('Chúc mừng bạn đã đăng kí thành công. Vui lòng đăng nhập để sử dụng dịch vụ!');
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    alert('Việc đăng kí tài khoản đang gặp gián đoạn. Vui lòng thử lại lần nữa!');
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
                alert('Vui lòng nhập mật khẩu và email để đăng nhập.');
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

                    sessionStorage.setItem('user', JSON.stringify({
                        id: data.user.id,
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

                    // Điều hướng người dùng dựa trên vai trò sau khi đăng nhập
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else if (data.user.role === 'user') {
                        window.location.href = 'home.html';
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    alert('Email hoặc mật khẫu chưa đúng. Vui lòng nhập lại!');
                });
        });
    }


    // Hàm thiết lập menu
    const typeMapping = {
        'KH': 'Khóa học',
        'DH': 'Du học',
        'XKLD': 'Xuất khẩu lao động',
        'KS': 'Kỹ sư',
        'TD': 'Tuyển dụng'
    };

    const typeOrder = ['KH', 'DH', 'XKLD', 'KS', 'TD'];

    function loadSubtypes(type) {
        return fetch(`https://webtiengnhat-be.onrender.com/api/subtypes/${type}`)
            .then(response => response.json())
            .then(subtypes => subtypes.map(subtype => subtype.subtype))
            .catch(error => {
                console.error(`Error loading subtypes for type ${type}:`, error);
                return [];
            });
    }

    // function loadMenu() {
    //     typeOrder.forEach(type => {
    //         // const fullTypeName = typeMapping[type] || type;
    //         const dropdownMenu = document.getElementById(type);

    //         loadSubtypes(type).then(subtypes => {
    //             dropdownMenu.innerHTML = '';  // Xóa các mục con cũ

    //             subtypes.forEach(subtype => {
    //                 const dropdownItem = document.createElement('li');
    //                 const dropdownLink = document.createElement('a');
    //                 dropdownLink.className = 'dropdown-item';
    //                 dropdownLink.href = '#';
    //                 dropdownLink.textContent = subtype;
    //                 dropdownItem.appendChild(dropdownLink);
    //                 dropdownMenu.appendChild(dropdownItem);
    //             });
    //         });
    //     });
    // }
    function loadMenu() {
        typeOrder.forEach(type => {
            const dropdownMenu = document.getElementById(type);

            loadSubtypes(type).then(subtypes => {
                // dropdownMenu.innerHTML = '';  // Xóa các mục con cũ

                subtypes.forEach(subtype => {
                    const dropdownItem = document.createElement('li');
                    const dropdownLink = document.createElement('a');
                    dropdownLink.className = 'dropdown-item';
                    dropdownLink.href = `posts-by-subtype.html?subtype=${encodeURIComponent(subtype)}`;
                    dropdownLink.textContent = subtype;
                    dropdownItem.appendChild(dropdownLink);
                    dropdownMenu.appendChild(dropdownItem);
                });
            });
        });
    }


    loadMenu();


    $('#consultationForm').on('submit', function (e) {
        e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

        // Lấy giá trị của các trường input
        const topic = $('#topic').val();
        const name = $('#name').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const message = $('#message').val();

        // Kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
        if (!topic || !name || !phone || !address || !message) {
            // Nếu thiếu trường nào, hiển thị thông báo lỗi
            alert('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
        } else {
            // Nếu tất cả các trường đã được điền đầy đủ
            alert('Đăng ký tư vấn thành công!');

            // Xóa nội dung form sau khi gửi thành công (tùy chọn)
            $('#consultationForm')[0].reset();
        }
    });
});


