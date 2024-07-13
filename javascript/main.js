// main.js

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// document.addEventListener('DOMContentLoaded', () => {
//     async function loadPostsByType(type, sectionId) {
//         try {
//             const response = await fetch(`http://localhost:3000/api/type/posts?type=${type}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             const data = await response.json();
//             const posts = data.posts;
//             const section = document.getElementById(sectionId);

//             // Clear old posts while keeping the <h1> element
//             section.querySelectorAll('.post').forEach(post => post.remove());

//             posts.forEach(post => {
//                 const postElement = document.createElement('div');
//                 postElement.classList.add('post');
//                 postElement.innerHTML = `
//                     <h2 class="post-title">${post.title}</h2>
//                     <img class="post-image" src="${post.img}" alt="${post.title}" />
//                     <p class="post-content">${post.content}</p>
//                 `;
//                 section.appendChild(postElement);
//             });
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     }

//     // Load các bài post theo loại khi trang được tải
//     loadPostsByType('KH', 'courses');
//     loadPostsByType('DH', 'study-abroad');
//     loadPostsByType('KS', 'engineer-news');
//     loadPostsByType('XKLD', 'labor-export');
//     loadPostsByType('TD', 'job-openings');
// });

// document.addEventListener('DOMContentLoaded', () => {
//     async function loadPostsByType(type, sectionId) {
//         try {
//             const response = await fetch(`http://localhost:3000/api/type/posts?type=${type}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             const data = await response.json();
//             const posts = data.posts.slice(0, 6); // Giới hạn số lượng bài viết là 6
//             const section = document.getElementById(sectionId);

//             // Clear old posts while keeping the <h1> element
//             section.querySelectorAll('.post').forEach(post => post.remove());

//             let row;
//             posts.forEach((post, index) => {
//                 if (index % 3 === 0) {
//                     row = document.createElement('div');
//                     row.classList.add('row');
//                 }

//                 const postElement = document.createElement('div');
//                 postElement.classList.add('col-md-4', 'post'); // Sử dụng col-md-4 để mỗi bài post chiếm 1/3 phần của row
//                 postElement.innerHTML = `
//                     <h2 class="post-title">${post.title}</h2>
//                     <img class="post-image" src="${post.img}" alt="${post.title}" />
//                     <p class="post-content">${post.content}</p>
//                 `;

//                 row.appendChild(postElement);

//                 // Nếu là bài viết cuối cùng của hàng hoặc là bài viết cuối cùng trong danh sách, thêm row vào section
//                 if ((index + 1) % 3 === 0 || index === posts.length - 1) {
//                     section.appendChild(row);
//                 }
//             });
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     }

//     // Load các bài post theo loại khi trang được tải
//     loadPostsByType('KH', 'courses');
//     loadPostsByType('DH', 'study-abroad');
//     loadPostsByType('KS', 'engineer-news');
//     loadPostsByType('XKLD', 'labor-export');
//     loadPostsByType('TD', 'job-openings');
// });

document.addEventListener('DOMContentLoaded', () => {
    async function loadPostsByType(type, sectionId) {
        try {
            const response = await fetch(`http://localhost:3000/api/type/posts?type=${type}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const posts = data.posts.slice(0, 12); // Giới hạn số lượng bài viết là 6
            const section = document.getElementById(sectionId);

            // Clear old posts while keeping the <h1> element
            section.querySelectorAll('.post').forEach(post => post.remove());

            let row;
            posts.forEach((post, index) => {
                // Tạo một hàng mới sau khi đã thêm 6 bài post
                if (index % 6 === 0) {
                    row = document.createElement('div');
                    row.classList.add('row', 'clearfix'); // Thêm lớp clearfix để xóa float
                }

                // Tạo phần tử cho mỗi bài post
                const postElement = document.createElement('div');
                postElement.classList.add('col-md-2', 'post'); // Đặt chiều rộng cơ bản của mỗi bài post
                postElement.innerHTML = `
                    <h2 class="post-title">${post.title}</h2>
                    <img class="post-image" src="${post.img}" alt="${post.title}" />
                    <p class="post-content">${post.content}</p>
                `;

                // Thêm bài post vào hàng hiện tại
                row.appendChild(postElement);

                // Thêm hàng vào section khi đã đủ 6 bài post hoặc là bài post cuối cùng
                if ((index + 1) % 6 === 0 || index === posts.length - 1) {
                    section.appendChild(row);
                }
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // Load các bài post theo loại khi trang được tải
    loadPostsByType('KH', 'courses');
    loadPostsByType('DH', 'study-abroad');
    loadPostsByType('KS', 'engineer-news');
    loadPostsByType('XKLD', 'labor-export');
    loadPostsByType('TD', 'job-openings');
});

