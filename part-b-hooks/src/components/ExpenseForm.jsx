import React, { useState, useRef } from 'react';

export default function ExpenseForm({ onAddExpense, loading }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const nameInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Vui lòng nhập nội dung chi tiêu');
      nameInputRef.current.focus();
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Số tiền chi tiêu phải lớn hơn 0');
      return;
    }

    if (!date) {
      setError('Vui lòng chọn ngày chi');
      return;
    }

    const newExpense = {
      name: name.trim(),
      amount: parsedAmount,
      category,
      date,
    };

    const success = await onAddExpense(newExpense);

    if (success) {
      setName('');
      setAmount('');
      setCategory('Ăn uống');
      setDate(new Date().toISOString().split('T')[0]);
      setError('');

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  };

  return (
    <div className="card form-card">
      <h3>Thêm khoản chi mới</h3>
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Nội dung chi tiêu:</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Ví dụ: Cơm trưa, Xăng xe..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Số tiền (VNĐ):</label>
            <input
              type="number"
              placeholder="Ví dụ: 35000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              min="1000"
              step="1000"
            />
          </div>

          <div className="form-group">
            <label>Loại chi tiêu:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Ăn uống">Ăn uống</option>
              <option value="Đi lại">Đi lại</option>
              <option value="Học tập">Học tập</option>
              <option value="Giải trí">Giải trí</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ngày chi:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Thêm khoản chi'}
        </button>
      </form>
    </div>
  );
}
