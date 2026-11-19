import React from 'react';
import useClock from '../hooks/useClock';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const time = useClock();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-info">
        <h2>📒 Sổ Chi Tiêu Cá Nhân</h2>
        <p className="student-badge">SV: Lưu Thanh Lâm - MS: B25DCTV050 (Phần B: Hooks)</p>
      </div>

      <div className="header-controls">
        <div className="clock-box">
          🕒 {time.toLocaleTimeString('vi-VN')} ({time.toLocaleDateString('vi-VN')})
        </div>

        <button
          type="button"
          className="btn btn-theme-toggle"
          onClick={toggleTheme}
          title="Chuyển đổi giao diện sáng/tối (dùng useContext)"
        >
          {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
        </button>
      </div>
    </header>
  );
}
