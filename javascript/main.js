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
            // const response = await fetch(`https://webtiengnhat-be.onrender.com/api/type/posts?type=${type}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const posts = data.posts.slice(0, 12); // Giới hạn số lượng bài viết là 12

            // Lấy phần tử cha của .posts-container trong section tương ứng
            const section = document.getElementById(sectionId);
            const postsContainer = section.querySelector('.posts-container');

            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postHTML = `
                    <a href="post-detail.html?id=${post.id}"  style="text-decoration: none; color: black">
                        <div class="post">
                            <h2 class="post-title">${post.title}</h2>
                            <img class="post-image" src="${post.img}" alt="post-image" />
                            <p class="post-content">${post.content}</p>
                        </div>
                    </a>
                `;

                postsContainer.insertAdjacentHTML('beforeend', postHTML);
            });

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // Load các bài post theo loại khi trang được tải
    loadPostsByType('KH', 'courses');       // 'KH' là khóa học
    loadPostsByType('DH', 'study-abroad');  // 'DH' là tin du học
    loadPostsByType('KS', 'engineer-news'); // 'KS' là tin kỹ sư
    loadPostsByType('XKLD', 'labor-export');// 'XKLD' là tin xuất khẩu lao động
    loadPostsByType('TD', 'job-openings');  // 'TD' là tin tuyển dụng
});


// document.addEventListener('DOMContentLoaded', function () {
//     const type = 'KH'; // Thay đổi 'courses' thành loại bài post bạn muốn lấy

//     // Gọi API từ backend để lấy danh sách bài post theo 'type'
//     fetch(`http://localhost:3000/api/type/posts?type=${type}`)
//         .then(response => response.json())
//         .then(data => {
//             const posts = data.posts; // Lấy danh sách bài post từ dữ liệu nhận được

//             const postsContainer = document.querySelector('.posts-container');

//             // Xóa nội dung hiện tại của postsContainer (nếu có)
//             postsContainer.innerHTML = '';

//             // Duyệt qua danh sách bài post và tạo HTML để hiển thị lên giao diện
//             posts.forEach(post => {
//                 const postHTML = `
//                     <div class="post">
//                         <h2 class="post-title">${post.title}</h2>
//                         <img class="post-image" src="${post.img}" alt="post-image" />
//                         <p class="post-content">${post.content}</p>
//                     </div>
//                 `;
//                 postsContainer.insertAdjacentHTML('beforeend', postHTML);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching posts:', error);
//             // Xử lý lỗi khi gọi API không thành công
//         });
// });


