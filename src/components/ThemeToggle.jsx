import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={theme === "light" ? "Chuyển sang chế độ Tối" : "Chuyển sang chế độ Sáng"}
      aria-label="Đổi giao diện Sáng/Tối"
    >
      <span className="theme-toggle-icon">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
      <span className="theme-toggle-text">
        {theme === "light" ? "Chế độ Tối" : "Chế độ Sáng"}
      </span>
    </button>
  );
}
