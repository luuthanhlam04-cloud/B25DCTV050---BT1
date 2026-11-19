import React from 'react';

export default function TotalSummary({ filteredExpenses, allExpenses, currentFilter, searchTerm }) {
  const totalFiltered = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalAll = allExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="summary-box">
      <div className="summary-item">
        <span>
          Tổng chi {currentFilter !== 'Tất cả' ? `(${currentFilter})` : ''}
          {searchTerm ? ` - kết quả tìm kiếm` : ''}:
        </span>
        <span className="summary-total text-danger">
          {totalFiltered.toLocaleString('vi-VN')} đ
        </span>
      </div>

      {(currentFilter !== 'Tất cả' || searchTerm) && (
        <div className="summary-item summary-sub">
          <span>(Tổng toàn bộ: {totalAll.toLocaleString('vi-VN')} đ)</span>
        </div>
      )}
    </div>
  );
}
