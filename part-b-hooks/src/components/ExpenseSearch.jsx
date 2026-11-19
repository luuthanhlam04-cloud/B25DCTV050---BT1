import React, { useState, useEffect } from 'react';

/**
 * Component ô tìm kiếm có độ trễ (Debounce)
 * Đáp ứng yêu cầu nâng cao: Tránh re-render liên tục khi đang nhập phím
 */
export default function ExpenseSearch({ onSearchChange }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Đặt bộ đếm thời gian debounce 350ms
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 350);

    // Dọn dẹp timer nếu người dùng tiếp tục gõ trước khi hết 350ms
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearchChange]);

  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Tìm kiếm khoản chi (có debounce 350ms)..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
      {inputValue && (
        <button
          type="button"
          className="btn-clear"
          onClick={() => setInputValue('')}
          title="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
