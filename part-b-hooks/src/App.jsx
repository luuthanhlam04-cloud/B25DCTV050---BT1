import React, { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('Tất cả');

  return (
    <div className="container">
      <h1>Sổ Chi Tiêu Cá Nhân (Phần B - Function Component + Hooks)</h1>
      <p>Đang khởi tạo dự án...</p>
    </div>
  );
}

export default App;
