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
      <span className="search-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
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
