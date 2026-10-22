import React from "react";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚠️</div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Lỗi tải dữ liệu
      </h3>
      <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
        {message || "Không thể tải danh sách sinh viên. Vui lòng kiểm tra lại kết nối mạng hoặc endpoint."}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-primary btn-sm" onClick={onRetry}>
          🔄 Thử lại ngay
        </button>
      )}
    </div>
  );
}
