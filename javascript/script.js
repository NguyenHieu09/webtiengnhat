// Function to load translation file
function loadTranslationFile(language) {
    return axios.get(`./languages/${language}.json`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Could not load ${language}.json.`);
            console.error(error);
        });
}

// Load translation files and initialize i18next
Promise.all([loadTranslationFile('vi'), loadTranslationFile('ja')]).then(([viTranslation, jaTranslation]) => {
    i18next.init({
        lng: 'vi', // Default language
        resources: {
            vi: {
                translation: viTranslation
            },
            ja: {
                translation: jaTranslation
            }
        }
    }, function (err, t) {
        if (err) {
            console.error('i18next initialization error:', err);
        } else {
            jqueryI18next.init(i18next, $);
            $('body').localize();
        }
    });
});

// Add click event listeners for language change buttons
$(document).ready(function () {
    $('#change-to-vi').click(() => changeLanguage('vi'));
    $('#change-to-ja').click(() => changeLanguage('ja'));
});


function changeLanguage(language) {

    i18next.changeLanguage(language, () => {
        $('body').localize();

    });
}

function showDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "block";
}

function hideDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "none";
}



$(document).ready(function () {
    $('#openSignupModal').click(function () {
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
        });
    });
});

$(document).ready(function () {
    $('#openSigninModal').click(function () {
        $('#modal-container').load('signIn.html #loginModal', function () {
            $('#loginModal').modal('show');
        });
    });
});


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





