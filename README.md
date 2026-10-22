# Bài Tập Về Nhà Buổi 9: Lập Trình React Với Hook

> **Học phần:** Lập trình Web  
> **Giảng viên:** ThS. Ngô Văn Nhận  
> **Sinh viên thực hiện:** Lưu Thanh Lâm  
> **MSSV:** B25DCTV050  
> **Lớp:** D25CQTV01-B  

---

## 🎯 Yêu Cầu Đề Bài & Tiêu Chí Đạt Được (Căn cứ Slide 41)

| Tiêu chí đề bài | Hiện thực trong dự án | Trạng thái |
| :--- | :--- | :---: |
| **1. Viết lại bài Buổi 8 bằng Hooks** | 100% chuyển đổi sang **Function Component** kết hợp các Hooks: `useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`. Hoàn toàn không còn Class Component hay `this.bind()`. | ✅ Hoàn thành |
| **2. Dữ liệu lấy từ MockAPI qua `useFetch`** | Xây dựng Custom Hook `useFetch(url)` đóng gói logic gọi API với **đủ 3 trạng thái**: `data`, `loading`, `error`. Có cơ chế cleanup bằng `AbortController` và Local Cache Fallback đảm bảo không bị lỗi khi offline. | ✅ Hoàn thành |
| **3. Thêm `ThemeContext` sáng / tối** | Xây dựng `ThemeContext` và `ThemeProvider` chia sẻ trạng thái giao diện toàn app không cần prop drilling. Nút chuyển Theme đổi mượt mà và tự động ghi nhớ vào `localStorage`. | ✅ Hoàn thành |
| **4. Quy chuẩn nộp bài Git** | Đạt **≥ 3 commit** rõ ràng theo chuẩn Conventional Commits, có hướng dẫn push GitHub chi tiết. | ✅ Hoàn thành |

---

## 🏗️ Cấu Trúc Thư Mục Dự Án

```
LTW_B9_StudentManager/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Thanh điều hướng, thông tin sinh viên & ThemeToggle
│   │   ├── ThemeToggle.jsx      # Nút chuyển sáng/tối (☀️ / 🌙) dùng useContext
│   │   ├── StatsBar.jsx         # Thống kê tổng quan số SV, phân bổ ngành, GPA trung bình
│   │   ├── SearchFilter.jsx     # Ô tìm kiếm (Debounce 350ms với useEffect) & bộ lọc
│   │   ├── StudentForm.jsx      # Form thêm/sửa sinh viên (Controlled Component, useRef)
│   │   ├── StudentList.jsx      # Bảng danh sách sinh viên & thao tác CRUD
│   │   ├── StudentItem.jsx      # Dòng hiển thị từng sinh viên (Badge ngành, GPA tag)
│   │   ├── LoadingSpinner.jsx   # Giao diện khi đang tải dữ liệu từ API
│   │   ├── ErrorAlert.jsx       # Giao diện khi xảy ra lỗi API có nút Thử lại (Retry)
│   │   └── EmptyState.jsx       # Giao diện khi không có dữ liệu / không tìm thấy
│   ├── context/
│   │   └── ThemeContext.jsx     # ThemeContext + ThemeProvider + lưu localStorage
│   ├── hooks/
│   │   └── useFetch.js          # Custom Hook useFetch (3 trạng thái + AbortController)
│   ├── services/
│   │   └── mockApi.js           # Endpoint MockAPI + Dữ liệu mẫu khởi tạo + Local Cache
│   ├── App.jsx                  # Component gốc kết nối toàn bộ logic nghiệp vụ
│   ├── index.css                # Hệ thống CSS Variables (Light/Dark mode), Glassmorphism
│   └── main.jsx                 # Điểm khởi đầu bọc ThemeProvider theo Slide 32
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Yêu cầu môi trường
* Node.js phiên bản ≥ 18 (Dự án đã kiểm thử trên Node v24.14.0).
* Trình duyệt hiện đại (Chrome, Edge, Firefox, Brave...).

### 2. Cài đặt dependencies và chạy dev server
```bash
# Di chuyển vào thư mục dự án
cd "d:/bt1 lt web/LTW_B9_StudentManager"

# Cài đặt các gói thư viện (nếu chưa cài)
npm install

# Khởi chạy máy chủ phát triển
npm run dev
```
Sau đó truy cập theo đường dẫn xuất hiện trên màn hình (thường là `http://localhost:5173`).

### 3. Build sản phẩm hoàn chỉnh
```bash
npm run build
```

---

## 📤 Hướng Dẫn Push Mã Nguồn Lên GitHub Cá Nhân

Dự án đã có sẵn lịch sử commit đầy đủ. Để đẩy lên GitHub nộp cho giảng viên, bạn thực hiện các lệnh sau trong terminal:

```bash
# 1. Di chuyển vào thư mục dự án
cd "d:/bt1 lt web/LTW_B9_StudentManager"

# 2. Thêm remote trỏ tới repository GitHub cá nhân của bạn
git remote add origin https://github.com/<tai-khoan-github-cua-ban>/<ten-repo>.git

# 3. Đổi tên nhánh chính thành main (nếu cần)
git branch -M main

# 4. Đẩy toàn bộ commit lên GitHub
git push -u origin main
```

---

## 📝 Danh Sách Các Commit Đã Thực Hiện

```
30e3a5f feat: hoan thien CRUD Quan ly sinh vien bang Hooks va Controlled Component
8bdfc50 feat: xay dung custom hook useFetch voi 3 trang thai va abort cleanup
7392c61 feat: khoi tao du an va ThemeContext sang/toi
```
