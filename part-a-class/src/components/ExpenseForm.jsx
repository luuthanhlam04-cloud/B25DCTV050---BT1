import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: '',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, amount, category, date } = this.state;

    // Kiểm tra dữ liệu đầu vào
    if (!name.trim()) {
      this.setState({ error: 'Vui lòng nhập nội dung chi tiêu' });
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      this.setState({ error: 'Số tiền chi tiêu phải lớn hơn 0' });
      return;
    }

    if (!date) {
      this.setState({ error: 'Vui lòng chọn ngày chi' });
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: parsedAmount,
      category,
      date,
    };

    this.props.onAddExpense(newExpense);

    // Reset lại form
    this.setState({
      name: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: '',
    });
  }

  render() {
    const { name, amount, category, date, error } = this.state;

    return (
      <div className="card form-card">
        <h3>Thêm khoản chi mới</h3>
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={this.handleSubmit} className="expense-form">
          <div className="form-group">
            <label>Nội dung chi tiêu:</label>
            <input
              type="text"
              name="name"
              placeholder="Ví dụ: Cơm trưa, Xăng xe..."
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số tiền (VNĐ):</label>
              <input
                type="number"
                name="amount"
                placeholder="Ví dụ: 35000"
                value={amount}
                onChange={this.handleChange}
                min="1000"
                step="1000"
              />
            </div>

            <div className="form-group">
              <label>Loại chi tiêu:</label>
              <select name="category" value={category} onChange={this.handleChange}>
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
                name="date"
                value={date}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Thêm khoản chi
          </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
