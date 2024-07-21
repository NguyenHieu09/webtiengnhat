
# Project The New Foreign Language Center

## 1. Kiến trúc tổng thể
- Frontend: Sử dụng Html/css, javascript để tạo giao diện người dùng.
- Backend: Sử dụng Node.js với Express để tạo API xử lý dữ liệu.
- Database: Sử dụng MySQL để lưu trữ dữ liệu.

## 2. Chức năng người dùng
- **Thông tin trung tâm**: Trang giới thiệu về trung tâm ngoại ngữ.
- **Các bài viết**: Người dùng có thể xem các bài viết về du học, xuất khẩu lao động, kỹ sư, và các khóa học Nhật, Hàn.
- **Tuyển dụng**: Người dùng có thể xem các bài viết tuyển dụng.

## 3. Chức năng Admin
- **Quản lý bài viết**: Admin có thể thêm, xóa, sửa và xem các bài viết về du học, xuất khẩu lao động, các khóa học liên quan.
- **Đăng tin tuyển dụng**: Admin có thể đăng và quản lý tin tuyển dụng.

## 4. Các bảng cơ sở dữ liệu
- **Users**: Lưu thông tin người dùng (id, firstname, lastname, email, password, role).
- **Posts**: Lưu thông tin bài viết (id, title, type, subtype, img, content, user_id, created_at).
- **registration_form**: Lưu trữ thông tin đăng ký tư vấn của người dùng (id, topic, fullName, phone, address, question, user_id).

## Tech Stack

**Front-end:** Html/css, javascript, bootstrap

**Back-end:** Node.js, Express


## Running Tests

https://trungtamngoaingumoiyd.vercel.app/

```bash
  admin
  email: john.doe@example.com
  password: password123
```
```bash
  user
  email: hieu@gmail.com
  password: hieu123
```



## Authors

- [@NguyenHieu09](https://github.com/NguyenHieu09) - Full stack

