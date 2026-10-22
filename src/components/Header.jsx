import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo">🎓</div>
          <div>
            <h1 className="brand-title">Hệ Thống Quản Lý Sinh Viên</h1>
            <p className="brand-subtitle">
              Học viện Công nghệ Bưu chính Viễn thông • Lập trình Web - Buổi 9 (React Hooks)
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="student-badge">
            <span className="badge-avatar">LTL</span>
            <div className="badge-info">
              <span className="badge-name">Lưu Thanh Lâm</span>
              <span className="badge-mssv">B25DCTV050</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
