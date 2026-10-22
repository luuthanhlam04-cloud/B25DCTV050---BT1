import React from "react";
import StudentItem from "./StudentItem";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import EmptyState from "./EmptyState";

export default function StudentList({
  students,
  loading,
  error,
  onRetry,
  onEditStudent,
  onDeleteStudent,
  onResetSearch,
}) {
  if (loading) {
    return (
      <div className="list-card">
        <LoadingSpinner message="Đang kết nối MockAPI và tải dữ liệu..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-card" style={{ padding: "1.5rem" }}>
        <ErrorAlert message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="list-card">
      <div className="list-header">
        <h2 className="list-title">
          <span>📋</span> Danh Sách Sinh Viên
        </h2>
        <span className="list-count-badge">
          {students.length} sinh viên
        </span>
      </div>

      {students.length === 0 ? (
        <EmptyState
          message="Không tìm thấy sinh viên nào khớp với bộ lọc hoặc từ khóa tìm kiếm."
          onResetSearch={onResetSearch}
        />
      ) : (
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ và Tên</th>
                <th>Email Liên Hệ</th>
                <th>Chuyên Ngành</th>
                <th>Điểm GPA</th>
                <th style={{ minWidth: "140px" }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  onEdit={onEditStudent}
                  onDelete={onDeleteStudent}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
