import React, { useState, useEffect } from "react";

export default function SearchFilter({
  onSearchChange,
  selectedMajor,
  onMajorChange,
  sortBy,
  onSortChange,
}) {
  const [localKeyword, setLocalKeyword] = useState("");

  // Áp dụng kỹ thuật Debounce với useEffect theo đúng Slide 29 bài giảng
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localKeyword);
    }, 350);

    // Cleanup: hủy timeout trước đó khi người dùng tiếp tục gõ
    return () => clearTimeout(timer);
  }, [localKeyword, onSearchChange]);

  return (
    <div className="controls-card">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm theo tên hoặc mã sinh viên (debounce 350ms)..."
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
        />
      </div>

      <div className="filters-wrapper">
        <select
          className="filter-select"
          value={selectedMajor}
          onChange={(e) => onMajorChange(e.target.value)}
          aria-label="Lọc theo chuyên ngành"
        >
          <option value="ALL">Tất cả chuyên ngành</option>
          <option value="CNTT">Công nghệ thông tin (CNTT)</option>
          <option value="ATTT">An toàn thông tin (ATTT)</option>
          <option value="DTVT">Điện tử viễn thông (DTVT)</option>
          <option value="QTKD">Quản trị kinh doanh (QTKD)</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sắp xếp danh sách"
        >
          <option value="DEFAULT">Sắp xếp: Mặc định</option>
          <option value="NAME_ASC">Họ tên: A → Z</option>
          <option value="NAME_DESC">Họ tên: Z → A</option>
          <option value="GPA_DESC">Điểm GPA: Cao → Thấp</option>
          <option value="GPA_ASC">Điểm GPA: Thấp → Cao</option>
        </select>
      </div>
    </div>
  );
}
