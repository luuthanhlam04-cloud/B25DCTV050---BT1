import React, { Component } from 'react';

class TotalSummary extends Component {
  render() {
    const { filteredExpenses, allExpenses, currentFilter } = this.props;

    const totalFiltered = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalAll = allExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
      <div className="summary-box">
        <div className="summary-item">
          <span>Tổng chi ({currentFilter}):</span>
          <span className="summary-total text-danger">
            {totalFiltered.toLocaleString('vi-VN')} đ
          </span>
        </div>

        {currentFilter !== 'Tất cả' && (
          <div className="summary-item summary-sub">
            <span>(Tổng toàn bộ chi tiêu: {totalAll.toLocaleString('vi-VN')} đ)</span>
          </div>
        )}
      </div>
    );
  }
}

export default TotalSummary;
