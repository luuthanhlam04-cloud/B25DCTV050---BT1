import React from 'react';

export default function ExpenseItem({ expense, index, onDeleteExpense, disabled }) {
  const handleDelete = () => {
    const isConfirmed = window.confirm(`Bạn có chắc muốn xóa khoản chi "${expense.name}" không?`);
    if (isConfirmed) {
      onDeleteExpense(expense.id);
    }
  };

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
          onClick={handleDelete}
          disabled={disabled}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}
