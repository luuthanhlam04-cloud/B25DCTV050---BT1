import React from "react";

export default function LoadingSpinner({ message = "Đang tải dữ liệu từ MockAPI..." }) {
  return (
    <div className="state-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <h3 className="state-title">Đang đồng bộ dữ liệu</h3>
      <p className="state-desc">{message}</p>
    </div>
  );
}
