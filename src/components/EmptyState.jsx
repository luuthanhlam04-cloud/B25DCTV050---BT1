import React from "react";

export default function EmptyState({ message = "Chưa có sinh viên nào trong danh sách.", onResetSearch }) {
  return (
    <div className="state-container">
      <div className="empty-icon">📂</div>
      <h3 className="state-title">Không tìm thấy sinh viên</h3>
      <p className="state-desc">{message}</p>
      {onResetSearch && (
        <button type="button" className="btn btn-secondary btn-sm" onClick={onResetSearch}>
          Xóa bộ lọc / Tìm kiếm
        </button>
      )}
    </div>
  );
}
