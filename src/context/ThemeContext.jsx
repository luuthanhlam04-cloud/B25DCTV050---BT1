import React, { createContext, useContext, useState, useEffect } from "react";

// Khởi tạo ThemeContext với giá trị mặc định "light" theo Slide 32
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Lấy theme đã lưu trong localStorage hoặc mặc định là "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ptit_app_theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Lưu theme vào localStorage để duy trì trạng thái khi F5
    localStorage.setItem("ptit_app_theme", theme);
    // Gán attribute lên documentElement để CSS biến đổi toàn bộ màu sắc
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook tiện ích để sử dụng ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme phải được sử dụng bên trong ThemeProvider");
  }
  return context;
}
