// File: main.js

document.addEventListener('DOMContentLoaded', function () {
    adjustSearchVisibility();
    window.addEventListener('resize', adjustSearchVisibility);
});

function adjustSearchVisibility() {
    var searchIcon = document.getElementById('searchIcon');
    var searchInput = document.getElementById('tnb-google-search-input');
    var searchButton = document.getElementById('search-button');
    var logoAndButtons = document.querySelectorAll('.navbar-brand, .signup-button, .signin-button');

    // Kiểm tra kích thước màn hình
    if (window.innerWidth < 768) { // Màn hình nhỏ hơn 768px
        searchIcon.classList.remove('d-none'); // Hiển thị icon tìm kiếm
        searchInput.classList.add('d-none'); // Ẩn ô input tìm kiếm
        searchButton.classList.add('d-none'); // Ẩn nút tìm kiếm
    } else { // Màn hình lớn hơn hoặc bằng 768px
        searchIcon.classList.add('d-none'); // Ẩn icon tìm kiếm
        searchInput.classList.remove('d-none'); // Hiển thị ô input tìm kiếm
        searchButton.classList.remove('d-none'); // Hiển thị nút tìm kiếm
    }

    // Hiển thị hoặc ẩn logo và nút button tùy thuộc vào trạng thái của ô input
    logoAndButtons.forEach(function (item) {
        item.classList.toggle('d-none', !searchInput.classList.contains('d-none'));
    });
}

$(document).on('click', '#searchIcon', function () {
    toggleSearch();
});

function toggleSearch() {
    var searchIcon = document.getElementById('searchIcon');
    var searchInput = document.getElementById('tnb-google-search-input');
    var searchButton = document.getElementById('search-button');
    var logoAndButtons = document.querySelectorAll('.navbar-brand, .signup-button, .signin-button');

    searchIcon.classList.toggle('d-none'); // Toggle hiển thị/ẩn icon tìm kiếm
    searchInput.classList.toggle('d-none'); // Toggle hiển thị/ẩn ô input tìm kiếm
    searchButton.classList.toggle('d-none'); // Toggle hiển thị/ẩn nút tìm kiếm

    // Ẩn hoặc hiển thị các logo và nút button tùy thuộc vào trạng thái của ô input
    logoAndButtons.forEach(function (item) {
        item.classList.toggle('d-none', !searchInput.classList.contains('d-none'));
    });
}

function searchWithSuggestions(inputElement) {
    var inputValue = inputElement.value.trim();
    if (inputValue.length > 0) {
        console.log('Searching with suggestions for: ' + inputValue);
        // Thực hiện tìm kiếm và gợi ý tại đây
    } else {
        console.log('No input value');
    }
}

function searchFieldLostFocus(event) {
    console.log('Search field lost focus');
}

function performSearch() {
    var inputValue = document.getElementById('tnb-google-search-input').value.trim();
    if (inputValue.length > 0) {
        console.log('Performing search for: ' + inputValue);
        // Thực hiện hành động tìm kiếm tại đây (ví dụ: gửi request tìm kiếm)
    } else {
        console.log('No input value to search');
    }
}
