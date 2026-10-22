import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import SearchFilter from "./components/SearchFilter";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import useFetch from "./hooks/useFetch";
import { DEFAULT_MOCKAPI_URL, saveLocalStudents } from "./services/mockApi";

export default function App() {
  // Lấy dữ liệu qua Custom Hook useFetch theo đúng Slide 33 & Slide 41
  const {
    data: students,
    loading,
    error,
    refetch,
    setData: setStudents,
  } = useFetch(DEFAULT_MOCKAPI_URL);

  // State quản lý sinh viên đang được chỉnh sửa (null = chế độ thêm mới)
  const [editingStudent, setEditingStudent] = useState(null);

  // State tìm kiếm, lọc và sắp xếp
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("ALL");
  const [sortBy, setSortBy] = useState("DEFAULT");

  // State thông báo toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Xử lý Thêm mới hoặc Cập nhật sinh viên (CRUD)
  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      // CẬP NHẬT (Update)
      const updatedList = students.map((s) =>
        s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
      );
      setStudents(updatedList);
      saveLocalStudents(updatedList);
      setEditingStudent(null);
      showToast(`Đã cập nhật thành công thông tin sinh viên "${studentData.name}"!`);
    } else {
      // THÊM MỚI (Create)
      const newStudent = {
        ...studentData,
        id: String(Date.now()), // Tạo ID duy nhất
      };
      const updatedList = [newStudent, ...students];
      setStudents(updatedList);
      saveLocalStudents(updatedList);
      showToast(`Đã thêm thành công sinh viên "${studentData.name}" vào danh sách!`);
    }
  };

  // Xử lý Xóa sinh viên (Delete)
  const handleDeleteStudent = (id, name) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa sinh viên "${name}" khỏi danh sách không?`
    );
    if (!isConfirmed) return;

    const updatedList = students.filter((s) => s.id !== id);
    setStudents(updatedList);
    saveLocalStudents(updatedList);

    // Nếu đang sửa chính sinh viên bị xóa thì hủy sửa
    if (editingStudent && editingStudent.id === id) {
      setEditingStudent(null);
    }
    showToast(`Đã xóa sinh viên "${name}" thành công!`, "info");
  };

  const handleStartEdit = (student) => {
    setEditingStudent(student);
    // Cuộn nhẹ lên form trên màn hình di động
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleResetSearch = () => {
    setSearchKeyword("");
    setSelectedMajor("ALL");
    setSortBy("DEFAULT");
  };

  // Tính toán danh sách sinh viên sau khi Lọc & Sắp xếp
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // Lọc theo từ khóa tìm kiếm (Tên hoặc MSSV)
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase().trim();
      result = result.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(kw)) ||
          (s.studentCode && s.studentCode.toLowerCase().includes(kw))
      );
    }

    // Lọc theo chuyên ngành
    if (selectedMajor !== "ALL") {
      result = result.filter((s) => s.major === selectedMajor);
    }

    // Sắp xếp
    if (sortBy === "NAME_ASC") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    } else if (sortBy === "NAME_DESC") {
      result.sort((a, b) => b.name.localeCompare(a.name, "vi"));
    } else if (sortBy === "GPA_DESC") {
      result.sort((a, b) => parseFloat(b.gpa) - parseFloat(a.gpa));
    } else if (sortBy === "GPA_ASC") {
      result.sort((a, b) => parseFloat(a.gpa) - parseFloat(b.gpa));
    }

    return result;
  }, [students, searchKeyword, selectedMajor, sortBy]);

  return (
    <div>
      <Header />

      <main className="app-container">
        {/* Thông báo Toast */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              background:
                toastMessage.type === "info" ? "var(--warning)" : "var(--success)",
              color: "#fff",
              padding: "0.85rem 1.4rem",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              fontWeight: 600,
              fontSize: "0.9rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <span>{toastMessage.type === "info" ? "ℹ️" : "✅"}</span>
            <span>{toastMessage.message}</span>
          </div>
        )}

        {/* Thanh thống kê */}
        <StatsBar students={students} />

        {/* Thanh tìm kiếm & bộ lọc với Debounce theo Slide 29 */}
        <SearchFilter
          onSearchChange={setSearchKeyword}
          selectedMajor={selectedMajor}
          onMajorChange={setSelectedMajor}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Khu vực nội dung chính: Form (trái) và Danh sách (phải) */}
        <div className="main-content-layout">
          <StudentForm
            editingStudent={editingStudent}
            onSubmitStudent={handleSaveStudent}
            onCancelEdit={handleCancelEdit}
          />

          <StudentList
            students={filteredStudents}
            loading={loading}
            error={error}
            onRetry={refetch}
            onEditStudent={handleStartEdit}
            onDeleteStudent={handleDeleteStudent}
            onResetSearch={handleResetSearch}
          />
        </div>

        <footer className="app-footer">
          <p>
            Bài tập về nhà Buổi 9: Lập trình React với Hook • Học viện Công nghệ Bưu chính Viễn thông
          </p>
          <p style={{ marginTop: "0.25rem", color: "var(--text-muted)" }}>
            Sinh viên thực hiện: Lưu Thanh Lâm • MSSV: B25DCTV050 • Lớp: D25CQTV01-B
          </p>
        </footer>
      </main>
    </div>
  );
}
