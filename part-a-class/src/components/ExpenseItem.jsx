import React, { Component } from 'react';

class ExpenseItem extends Component {
  handleDelete = () => {
    const { expense, onDeleteExpense } = this.props;
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa khoản chi: "${expense.name}" không?`);
    if (isConfirmed) {
      onDeleteExpense(expense.id);
    }
  };

  render() {
    const { expense, index } = this.props;

    // Phân loại màu badge đơn giản
    const getBadgeClass = (category) => {
      switch (category) {
        case 'Ăn uống': return 'badge badge-eating';
        case 'Đi lại': return 'badge badge-travel';
        case 'Học tập': return 'badge badge-study';
        case 'Giải trí': return 'badge badge-fun';
        default: return 'badge';
      }
    };

    return (
      <tr className="expense-row">
        <td className="text-center">{index + 1}</td>
        <td><strong>{expense.name}</strong></td>
        <td className="text-danger font-bold">
          {Number(expense.amount).toLocaleString('vi-VN')} đ
        </td>
        <td>
          <span className={getBadgeClass(expense.category)}>
            {expense.category}
          </span>
        </td>
        <td className="text-center">{expense.date}</td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-delete btn-sm"
            onClick={this.handleDelete}
            title="Xóa khoản chi này"
          >
            🗑️ Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default ExpenseItem;
