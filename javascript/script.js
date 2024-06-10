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
    $('.signup-button').click(function () {
        $('#modal-container').load('signUp.html #registerModal', function () {
            $('#registerModal').modal('show');
        });
    });
});


