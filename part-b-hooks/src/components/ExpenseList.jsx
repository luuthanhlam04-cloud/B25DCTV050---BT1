import React from 'react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDeleteExpense, loading, error, onRetry }) {
  if (loading && (!expenses || expenses.length === 0)) {
    return (
      <div className="loading-state">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error && (!expenses || expenses.length === 0)) {
    return (
      <div className="error-state">
        <p>Có lỗi xảy ra: {error}</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>Không tìm thấy khoản chi tiêu nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="expense-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>STT</th>
            <th>Nội dung chi</th>
            <th>Số tiền</th>
            <th>Loại</th>
            <th>Ngày chi</th>
            <th style={{ width: '70px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, index) => (
            <ExpenseItem
              key={item.id}
              expense={item}
              index={index}
              onDeleteExpense={onDeleteExpense}
              disabled={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
