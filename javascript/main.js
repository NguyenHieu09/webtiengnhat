// main.js

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch số lượng bài viết theo từng loại
        // const responseCount = await fetch('http://localhost:3000/api/count-post-by-type');
        const responseCount = await fetch('https:webtiengnhat-be.onrender.com/api/count-post-by-type')
        const dataCount = await responseCount.json();
        console.log(dataCount);

        if (dataCount.counts && Array.isArray(dataCount.counts)) {
            updateButtonContent(dataCount.counts);
        }

        // Load các bài post theo từng loại khi trang được tải
        await loadPostsByType('KH', 'courses');       // 'KH' là khóa học
        await loadPostsByType('DH', 'study-abroad');  // 'DH' là tin du học
        await loadPostsByType('KS', 'engineer-news'); // 'KS' là tin kỹ sư
        await loadPostsByType('XKLD', 'labor-export');// 'XKLD' là tin xuất khẩu lao động
        await loadPostsByType('TD', 'job-openings');  // 'TD' là tin tuyển dụng

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function updateButtonContent(counts) {
    counts.forEach(item => {
        const type = item.type;
        const count = item.total_posts;

        // Sử dụng querySelector để lấy nút button và cập nhật nội dung
        const button = document.querySelector(`#btn-${type.toLowerCase()}`);
        if (button) {
            button.textContent = `Thêm mới bài viết ${type} (${count})`;
        } else {
            console.error(`Button #btn-${type.toLowerCase()} not found`);
        }
    });
}


async function loadPostsByType(type, sectionId) {
    try {
        // const response = await fetch(`http://localhost:3000/api/type/posts?type=${type}`);
        const response = await fetch(`https://webtiengnhat-be.onrender.com/api/type/posts?type=${type}`);
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
                <a href="post-detail.html?id=${post.id}" style="text-decoration: none; color: black">
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
