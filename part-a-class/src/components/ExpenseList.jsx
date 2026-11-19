import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class ExpenseList extends Component {
  render() {
    const { expenses, onDeleteExpense } = this.props;

    if (!expenses || expenses.length === 0) {
      return (
        <div className="empty-state">
          <p>Không có khoản chi tiêu nào trong danh mục này.</p>
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
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExpenseList;
