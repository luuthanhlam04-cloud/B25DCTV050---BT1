import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0], // Mặc định ngày hôm nay
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: '', // Xóa thông báo lỗi khi người dùng bắt đầu sửa
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, amount, category, date } = this.state;

    // 1. Validate nội dung không rỗng
    if (!name.trim()) {
      this.setState({ error: 'Vui lòng nhập nội dung chi tiêu!' });
      return;
    }

    // 2. Validate số tiền hợp lệ và > 0
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      this.setState({ error: 'Số tiền chi tiêu phải là số lớn hơn 0!' });
      return;
    }

    // 3. Validate ngày chi
    if (!date) {
      this.setState({ error: 'Vui lòng chọn ngày chi tiêu!' });
      return;
    }

    // Tạo đối tượng khoản chi mới
    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: parsedAmount,
      category,
      date,
    };

    // Truyền dữ liệu lên component cha (App)
    this.props.onAddExpense(newExpense);

    // Reset form về trạng thái ban đầu
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
        <h3>➕ Thêm Khoản Chi Mới</h3>
        {error && <div className="alert-error">⚠️ {error}</div>}

        <form onSubmit={this.handleSubmit} className="expense-form">
          <div className="form-group">
            <label>Nội dung chi tiêu:</label>
            <input
              type="text"
              name="name"
              placeholder="VD: Cơm trưa, Xăng xe, Giáo trình..."
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
                placeholder="VD: 35000"
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
            + Thêm khoản chi
          </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
