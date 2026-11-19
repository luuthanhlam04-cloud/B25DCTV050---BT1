# Bài Thực Hành 03: Sổ Chi Tiêu Cá Nhân

- **Sinh viên:** Lưu Thanh Lâm
- **Mã sinh viên:** B25DCTV050
- **Lớp:** D25CQTV02-B
- **Học phần:** Lập trình Web (RIPT1306-20261-08)
- **Giảng viên:** ThS. Ngô Văn Nhận

---

## 1. Cấu trúc thư mục

Bài làm được chia thành 2 thư mục riêng biệt theo yêu cầu của đề bài:

```text
TH3/
├── part-a-class/          # Phiên bản viết bằng Class Component
│   ├── src/
│   │   ├── components/    # Header, Clock, ExpenseForm, ExpenseList, Filter, Total
│   │   ├── App.jsx        # Quản lý state danh sách chi tiêu và bộ lọc
│   │   ├── index.css      # CSS thuần
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── part-b-hooks/          # Phiên bản viết bằng Function Component + Hooks
│   ├── src/
│   │   ├── components/    # Form, List, Filter, Search, Stats, Header
│   │   ├── context/       # ThemeContext quản lý giao diện sáng/tối
│   │   ├── hooks/         # Custom hook useFetch, useClock
│   │   ├── services/      # Cấu hình MockAPI
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 2. Hướng dẫn cài đặt và chạy

### Phần A (Class Component)
```bash
cd part-a-class
npm install
npm run dev
```
Truy cập ứng dụng tại `http://localhost:5173`.

### Phần B (Function Component + Hooks)
```bash
cd part-b-hooks
npm install
npm run dev
```
Truy cập ứng dụng tại `http://localhost:5173` (hoặc cổng hiển thị trên terminal).

---

## 3. Các chức năng đã triển khai

### Phần A - Class Component
1. **Phân chia Component:** Tách nhỏ các thành phần giao diện gồm `Header`, `Clock`, `ExpenseForm`, `ExpenseFilter`, `ExpenseList`, `ExpenseItem`, `TotalSummary`.
2. **Quản lý State tại App:** Mảng `expenses` lưu dữ liệu khởi tạo, `filterCategory` lưu loại đang lọc.
3. **Đồng hồ thời gian thực:** Khởi tạo `setInterval` trong `componentDidMount`, dọn dẹp bằng `clearInterval` trong `componentWillUnmount`. Có nút ẩn/hiện đồng hồ để kiểm chứng unmount.
4. **Form và Validate:** Kiểm tra nội dung không để trống, số tiền phải lớn hơn 0 và ngày chi hợp lệ.
5. **Xác nhận xóa:** Sử dụng `window.confirm` trước khi xóa khỏi danh sách. Mỗi phần tử có `key` duy nhất.
6. **Lọc và tính tổng:** Cho phép lọc theo từng loại chi tiêu hoặc xem tất cả; tính tổng chi tiêu tự động.
7. **Tiêu đề trang:** Tự động đồng bộ `document.title` bằng `componentDidUpdate` khi danh sách chi tiêu thay đổi.
8. **Chức năng nâng cao:** Thống kê tổng tiền theo từng loại chi tiêu và ô tìm kiếm có debounce 350ms (dùng `setTimeout` và cleanup `clearTimeout` trong Class).

### Phần B - Function Component + Hooks
1. **Chuyển đổi hoàn toàn sang Function Component:** Sử dụng `useState`, `useEffect`.
2. **Custom Hook `useFetch`:** Quản lý lấy, thêm, xóa dữ liệu chi tiêu qua MockAPI; có xử lý trạng thái đang tải (`loading`) và thông báo lỗi (`error`).
3. **Focus với `useRef`:** Sau khi thêm khoản chi thành công, tự động trỏ focus chuột vào ô nhập tên chi tiêu.
4. **Giao diện Sáng / Tối với `useContext`:** `ThemeContext` cung cấp trạng thái theme và hàm chuyển đổi cho toàn bộ ứng dụng.
5. **Yêu cầu nâng cao:**
   - Custom hook `useClock` tự cập nhật thời gian và dọn dẹp timer.
   - Thống kê tổng tiền đã chi riêng biệt theo từng danh mục.
   - Ô tìm kiếm có debounce 350ms bằng `useEffect` và `setTimeout`.

---

## 4. So sánh: Hooks đã giúp khắc phục các thách thức của Class như thế nào?

1. **Khắc phục sự phân mảnh vòng đời (Lifecycle):**
   - Trong Class Component, một chức năng như đồng hồ hoặc cập nhật tiêu đề tab phải viết rải rác ở 3 nơi: `componentDidMount`, `componentDidUpdate` và `componentWillUnmount`.
   - Trong Function Component, toàn bộ logic khởi tạo, cập nhật và dọn dẹp (cleanup) được gom gọn trong một hook `useEffect`.

2. **Dễ dàng tái sử dụng logic bằng Custom Hooks:**
   - Trong Class Component, việc tái sử dụng logic gọi API hoặc đếm giờ rất phức tạp (phải dùng Higher-Order Component hoặc Render Props làm code bị lồng nhau nhiều tầng).
   - Với Hooks, ta chỉ cần viết các hàm `useFetch`, `useClock` là có thể tái sử dụng sạch sẽ ở bất kỳ component nào.

3. **Không cần bận tâm về từ khóa `this`:**
   - Class Component bắt buộc phải hiểu cơ chế `this`, cần bind hàm trong constructor (`this.handleAdd = this.handleAdd.bind(this)`) hoặc dùng cú pháp arrow function.
   - Function Component dùng các hàm bình thường, đóng gói qua closure, dễ đọc và ít lỗi phát sinh hơn.

4. **Tránh truyền props qua nhiều tầng (Prop Drilling):**
   - Với các trạng thái dùng chung toàn app như Theme sáng/tối, `useContext` giúp component con lấy dữ liệu trực tiếp mà không cần truyền qua các component trung gian.
