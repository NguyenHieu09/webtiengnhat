// main.js

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         // Fetch số lượng bài viết theo từng loại
//         // const responseCount = await fetch('http://localhost:3000/api/count-post-by-type');
//         const responseCount = await fetch('https:webtiengnhat-be.onrender.com/api/count-post-by-type')
//         const dataCount = await responseCount.json();
//         console.log(dataCount);

//         if (dataCount.counts && Array.isArray(dataCount.counts)) {
//             updateButtonContent(dataCount.counts);
//         }

//         // Load các bài post theo từng loại khi trang được tải
//         await loadPostsByType('KH', 'courses');       // 'KH' là khóa học
//         await loadPostsByType('DH', 'study-abroad');  // 'DH' là tin du học
//         await loadPostsByType('KS', 'engineer-news'); // 'KS' là tin kỹ sư
//         await loadPostsByType('XKLD', 'labor-export');// 'XKLD' là tin xuất khẩu lao động
//         await loadPostsByType('TD', 'job-openings');  // 'TD' là tin tuyển dụng

//         // Sự kiện click vào các button để chuyển hướng đến trang tạo bài viết
//         document.querySelectorAll('.new-post-btn').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const type = btn.id.replace('btn-', '').toUpperCase(); // Lấy loại bài viết từ id của button và chuyển thành in hoa
//                 createNewPost(type);
//             });
//         });


//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// });


// async function updateButtonContent(counts) {
//     counts.forEach(item => {
//         const type = item.type.toLowerCase();
//         const count = item.total_posts;
//         let iconClass = '';
//         let typePost = '';

//         // Ánh xạ từng loại bài viết với một icon cụ thể
//         switch (type) {
//             case 'kh':
//                 iconClass = 'fa-book';
//                 typePost = 'khóa học';
//                 break;
//             case 'dh':
//                 iconClass = 'fa-plane';
//                 typePost = 'du học';
//                 break;
//             case 'ks':
//                 iconClass = 'fa-cogs';
//                 typePost = 'kỹ sư';
//                 break;
//             case 'xkld':
//                 iconClass = 'fa-briefcase';
//                 typePost = 'xuất khẩu lao động';
//                 break;
//             case 'td':
//                 iconClass = 'fa-user-tie';
//                 typePost = 'tuyển dụng'
//                 break;
//             default:
//                 iconClass = 'fa-question'; // Hoặc sử dụng một icon mặc định
//                 break;
//         }

//         // Sử dụng querySelector để lấy nút button và cập nhật nội dung
//         const button = document.querySelector(`#btn-${type}`);
//         if (button) {
//             button.innerHTML = `
//                 <div>
//                     <i class="fas ${iconClass}"></i>
//                     <p>${count} bài viết ${typePost}</p>
//                 </div>
//                 <div class="post-info">
//                     Thêm mới <i class="fas fa-arrow-right"></i>
//                 </div>
//             `;
//         } else {
//             console.error(`Button #btn-${type} not found`);
//         }
//     });
// }


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const responseCount = await fetch('https://webtiengnhat-be.onrender.com/api/count-post-by-type');

        // Kiểm tra nội dung phản hồi
        const textResponse = await responseCount.text();
        console.log(textResponse);

        // Chuyển phản hồi thành JSON nếu nội dung không phải là HTML
        if (responseCount.ok) {
            const dataCount = JSON.parse(textResponse);
            console.log(dataCount);

            if (dataCount.counts && Array.isArray(dataCount.counts)) {
                updateButtonContent(dataCount.counts);
            }

            await loadPostsByType('KH', 'courses');       // 'KH' là khóa học
            await loadPostsByType('DH', 'study-abroad');  // 'DH' là tin du học
            await loadPostsByType('KS', 'engineer-news'); // 'KS' là tin kỹ sư
            await loadPostsByType('XKLD', 'labor-export');// 'XKLD' là tin xuất khẩu lao động
            await loadPostsByType('TD', 'job-openings');  // 'TD' là tin tuyển dụng

            document.querySelectorAll('.new-post-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.id.replace('btn-', '').toUpperCase();
                    createNewPost(type);
                });
            });
        } else {
            console.error('Network response was not ok ' + responseCount.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function loadPostsByType(type, sectionId) {
    try {
        const response = await fetch(`https://webtiengnhat-be.onrender.com/api/type/posts?type=${type}`);
        const textResponse = await response.text();
        console.log(textResponse);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = JSON.parse(textResponse);
        const posts = data.posts.slice(0, 12);

        const section = document.getElementById(sectionId);
        const postsContainer = section.querySelector('.posts-container');

        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postHTML = `
                <div class="post">
                    <a href="post-detail.html?id=${post.id}" class="post-detail">
                        <h2 class="post-title">${post.title}</h2>
                        <img class="post-image" src="${post.img}" alt="post-image" />
                        <div class="post-content">${post.content}</div>
                    </a>
                    <div class="post-buttons">
                        <button class="edit-button" onclick="editPost(${post.id})">Sửa</button>
                        <button class="delete-button" onclick="deletePost(${post.id})">Xóa</button>
                    </div>
                </div>
            `;

            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function updateButtonContent(counts) {
    // Mặc định số lượng bài viết là 0 nếu không có dữ liệu
    if (!counts || !Array.isArray(counts)) {
        counts = [];
    }

    counts.forEach(item => {
        const type = item.type.toLowerCase();
        const count = item.total_posts || 0; // Nếu không có bài viết, sử dụng số lượng là 0
        let iconClass = '';
        let typePost = '';

        // Ánh xạ từng loại bài viết với một icon cụ thể
        switch (type) {
            case 'kh':
                iconClass = 'fa-book';
                typePost = 'khóa học';
                break;
            case 'dh':
                iconClass = 'fa-plane';
                typePost = 'du học';
                break;
            case 'ks':
                iconClass = 'fa-cogs';
                typePost = 'kỹ sư';
                break;
            case 'xkld':
                iconClass = 'fa-briefcase';
                typePost = 'xuất khẩu lao động';
                break;
            case 'td':
                iconClass = 'fa-user-tie';
                typePost = 'tuyển dụng'
                break;
            default:
                iconClass = 'fa-question'; // Hoặc sử dụng một icon mặc định
                break;
        }

        // Sử dụng querySelector để lấy nút button và cập nhật nội dung
        const button = document.querySelector(`#btn-${type}`);
        if (button) {
            button.innerHTML = `
                <div>
                    <i class="fas ${iconClass}"></i>
                    <p>${count} bài viết ${typePost}</p>
                </div>
                <div class="post-info">
                    Thêm mới <i class="fas fa-arrow-right"></i>
                </div>
            `;
        } else {
            console.error(`Button #btn-${type} not found`);
        }
    });
}



// async function loadPostsByType(type, sectionId) {
//     try {
//         // const response = await fetch(`http://localhost:3000/api/type/posts?type=${type}`);
//         const response = await fetch(`https://webtiengnhat-be.onrender.com/api/type/posts?type=${type}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         const data = await response.json();
//         const posts = data.posts.slice(0, 12); // Giới hạn số lượng bài viết là 12

//         // Lấy phần tử cha của .posts-container trong section tương ứng
//         const section = document.getElementById(sectionId);
//         const postsContainer = section.querySelector('.posts-container');

//         postsContainer.innerHTML = '';

//         posts.forEach(post => {
//             const postHTML = `

//                    <div class="post">
//                     <a href="post-detail.html?id=${post.id}" class="post-detail">
//                         <h2 class="post-title">${post.title}</h2>
//                         <img class="post-image" src="${post.img}" alt="post-image" />
//                         <div class="post-content">${post.content}</div>
//                     </a>
//                     <div class="post-buttons">
//                         <button class="edit-button" onclick="editPost(${post.id})">Sửa</button>
//                         <button class="delete-button" onclick="deletePost(${post.id})">Xóa</button>
//                     </div>
//                 </div>

//             `;

//             postsContainer.insertAdjacentHTML('beforeend', postHTML);
//         });

//     } catch (error) {
//         console.error('Error fetching posts:', error);
//     }
// }

function createNewPost(type) {

    window.location.href = `create-post.html?type=${type}`;
}

function editPost(postId) {
    // Chuyển hướng người dùng đến trang cập nhật bài viết với postId được gắn vào URL
    window.location.href = `update-post.html?id=${postId}`;
}

async function deletePost(postId) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa bài viết này?');
    if (!confirmDelete) return;

    try {
        // const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        const response = await fetch(`https://webtiengnhat-be.onrender.com/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Remove the post from the DOM
        const postElement = document.querySelector(`.post a[href="post-detail.html?id=${postId}"]`).closest('.post');
        postElement.remove();

        alert('Bài viết đã được xóa thành công');
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Không thể xóa bài viết');
    }
}
