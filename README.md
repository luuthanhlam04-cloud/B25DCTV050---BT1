# BÀI THỰC HÀNH 03 (N1) - SỔ CHI TIÊU CÁ NHÂN

> **Học phần:** Lập trình Web (RIPT1306-20261-08)  
> **Giảng viên:** ThS. Ngô Văn Nhận  
> **Sinh viên thực hiện:** Lưu Thanh Lâm  
> **Mã sinh viên:** B25DCTV050  
> **Lớp:** D25CQTV01-B  

---

## 🎯 Danh Sách Tiêu Chí Đạt Được

| Hạng mục | Yêu cầu đề bài | Hiện thực trong bài | Trạng thái |
| :--- | :--- | :--- | :---: |
| **Phần A (Class)** | Chia component, state danh sách & bộ lọc tại `App` | `App` quản lý state mảng chi tiêu mẫu và `filterCategory`. | ✅ Hoàn thành |
| **Phần A (Class)** | Đồng hồ chạy mỗi giây & hủy khi bị ẩn | `componentDidMount` chạy interval, `componentWillUnmount` huỷ timer (có nút Ẩn/Hiện). | ✅ Hoàn thành |
| **Phần A (Class)** | Form thêm có validate, xóa có xác nhận | Validate rỗng, số tiền > 0, ngày; `window.confirm` khi xóa; danh sách dùng `key`. | ✅ Hoàn thành |
| **Phần A (Class)** | Lọc theo loại và hiển thị tổng tiền | Bộ lọc 4 loại + Tất cả; tính tổng chi tiêu bằng `reduce`. | ✅ Hoàn thành |
| **Phần A (Class)** | Tiêu đề tab hiển thị tổng chi qua `componentDidUpdate` | `componentDidUpdate` so sánh state và cập nhật `document.title`. | ✅ Hoàn thành |
| **Phần B (Hooks)** | Viết lại bằng Function Component + Hooks | 100% Function Component với `useState`, `useEffect`. | ✅ Hoàn thành |
| **Phần B (Hooks)** | MockAPI CRUD qua custom hook `useFetch` | `useFetch` xử lý GET, POST, DELETE, có trạng thái `loading` và `error`. | ✅ Hoàn thành |
| **Phần B (Hooks)** | Focus ô nhập sau khi thêm bằng `useRef` | `nameInputRef.current.focus()` tự động kích hoạt sau khi thêm thành công. | ✅ Hoàn thành |
| **Phần B (Hooks)** | Chế độ sáng / tối bằng `useContext` | `ThemeContext` + `ThemeProvider` chuyển đổi màu nền/chữ tức thì. | ✅ Hoàn thành |
| **Yêu cầu nâng cao** | Custom hook `useClock` | Tách logic đồng hồ độc lập có cleanup trong `useEffect`. | ✅ Hoàn thành |
| **Yêu cầu nâng cao** | Thống kê tổng tiền theo từng loại | Thẻ thống kê chi tiết theo Ăn uống, Đi lại, Học tập, Giải trí. | ✅ Hoàn thành |
| **Yêu cầu nâng cao** | Ô tìm kiếm có độ trễ (debounce) | Debounce 350ms với `setTimeout` trong `useEffect`. | ✅ Hoàn thành |

---

## 📁 Cấu Trúc Dự Án

Repo gồm 2 thư mục chính theo đúng yêu cầu đề bài:

```text
TH3/
├── part-a-class/          # Phiên bản xây dựng bằng Class Component
│   ├── src/
│   │   ├── components/    # Header, Clock, ExpenseForm, ExpenseList, Filter, Total
│   │   ├── App.jsx        # Component chính quản lý state
│   │   ├── index.css      # CSS thuần
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── part-b-hooks/          # Phiên bản xây dựng bằng Function Component + Hooks
│   ├── src/
│   │   ├── components/    # Header, Clock, ExpenseForm, ExpenseList, Filter, Total, Search
│   │   ├── context/       # ThemeContext (Sáng / Tối)
│   │   ├── hooks/         # useFetch.js, useClock.js
│   │   ├── App.jsx        # Component chính quản lý hooks & state
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md              # Báo cáo và hướng dẫn
```

---

## 🚀 Hướng Dẫn Cài Đặt Và Chạy

### 1. Chạy Phần A (Class Component)
```bash
cd part-a-class
npm install
npm run dev
```
Mở trình duyệt truy cập đường dẫn local hiển thị trên terminal (thường là `http://localhost:5173`).

### 2. Chạy Phần B (Function Component + Hooks)
```bash
cd part-b-hooks
npm install
npm run dev
```
Mở trình duyệt truy cập đường dẫn local hiển thị trên terminal.

---

## 📝 Báo Cáo Lý Thuyết: Hooks Đã Giúp Khắc Phục Thách Thức Của Class Như Thế Nào?

Trong quá trình thực hiện bài toán **Sổ chi tiêu cá nhân**, việc chuyển đổi từ Class Component sang Function Component kết hợp Hooks đã giải quyết các vấn đề lớn sau:

1. **Khắc phục sự phân mảnh vòng đời (Lifecycle Fragmentation):**
   - **Ở Class Component:** Để làm chức năng đồng hồ hoặc cập nhật tiêu đề tab, code bị xé lẻ ra nhiều hàm vòng đời khác nhau (`componentDidMount` để bắt đầu `setInterval`, `componentWillUnmount` để `clearInterval`, và `componentDidUpdate` để đồng bộ `document.title`).
   - **Ở Function Component (Hooks):** `useEffect` cho phép gom toàn bộ logic khởi tạo, đồng bộ và dọn dẹp (cleanup) vào một nơi duy nhất rất gọn gàng và dễ theo dõi.

2. **Dễ dàng tái sử dụng logic với Custom Hooks:**
   - **Ở Class Component:** Rất khó để tái sử dụng logic gọi API hoặc đếm thời gian mà không dùng các mô hình phức tạp như HOC (Higher-Order Components) hay Render Props.
   - **Ở Function Component (Hooks):** Ta dễ dàng bóc tách logic gọi MockAPI thành `useFetch` và logic đồng hồ thành `useClock` để dùng lại ở bất kỳ component nào.

3. **Loại bỏ sự phức tạp của từ khóa `this`:**
   - Class Component đòi hỏi phải dùng `this.state`, `this.setState`, và phải bind các hàm xử lý sự kiện trong constructor (`this.handleAdd = this.handleAdd.bind(this)`).
   - Function Component dùng trực tiếp các biến và hàm closure, code ngắn hơn, trực quan và ít lỗi ngữ cảnh hơn.

4. **Chia sẻ trạng thái toàn cục đơn giản với `useContext`:**
   - Việc chuyển đổi giao diện Sáng / Tối (Theme) được chia sẻ mượt mà tới các component con thông qua `useContext`, tránh việc phải truyền props qua nhiều tầng (prop drilling).
