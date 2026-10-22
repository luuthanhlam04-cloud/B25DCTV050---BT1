import React from "react";

export default function StatsBar({ students = [] }) {
  const total = students.length;
  const cnttCount = students.filter((s) => s.major === "CNTT").length;
  const otherCount = total - cnttCount;

  const avgGpa = total > 0
    ? (students.reduce((acc, s) => acc + (parseFloat(s.gpa) || 0), 0) / total).toFixed(2)
    : "0.00";

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
          👥
        </div>
        <div className="stat-content">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Tổng số sinh viên</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: "var(--badge-cntt-bg)", color: "var(--badge-cntt-text)" }}>
          💻
        </div>
        <div className="stat-content">
          <span className="stat-value">{cnttCount}</span>
          <span className="stat-label">Sinh viên CNTT</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: "var(--badge-attt-bg)", color: "var(--badge-attt-text)" }}>
          🛡️
        </div>
        <div className="stat-content">
          <span className="stat-value">{otherCount}</span>
          <span className="stat-label">Chuyên ngành khác</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ background: "var(--success-light)", color: "var(--success)" }}>
          📊
        </div>
        <div className="stat-content">
          <span className="stat-value">{avgGpa}</span>
          <span className="stat-label">Điểm GPA trung bình (hệ 4)</span>
        </div>
      </div>
    </div>
  );
}
