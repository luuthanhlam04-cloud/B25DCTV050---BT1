import React from 'react';
import useClock from '../hooks/useClock';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const time = useClock();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-info">
        <h2>Sổ Chi Tiêu Cá Nhân</h2>
        <p className="student-badge">SV: Lưu Thanh Lâm - MS: B25DCTV050 (Phần B - Function Component + Hooks)</p>
      </div>

      <div className="header-controls">
        <div className="clock-box">
          Đồng hồ: <strong>{time.toLocaleTimeString('vi-VN')}</strong> ({time.toLocaleDateString('vi-VN')})
        </div>

        <button
          type="button"
          className="btn btn-theme-toggle"
          onClick={toggleTheme}
          title="Đổi giao diện"
        >
          {theme === 'light' ? 'Giao diện Tối' : 'Giao diện Sáng'}
        </button>
      </div>
    </header>
  );
}
