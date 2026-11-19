import React, { useState, useEffect } from 'react';

export default function ExpenseSearch({ onSearchChange }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Trì hoãn tìm kiếm 350ms
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearchChange]);

  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Tìm kiếm khoản chi..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
      {inputValue && (
        <button
          type="button"
          className="btn-clear"
          onClick={() => setInputValue('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
