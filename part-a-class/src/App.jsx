import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import TotalSummary from './components/TotalSummary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Dữ liệu mẫu khởi tạo viết sẵn trong code theo yêu cầu đề bài
      expenses: [
        { id: 1, name: 'Phở bò tái nạm', amount: 40000, category: 'Ăn uống', date: '2026-11-18' },
        { id: 2, name: 'Đổ xăng xe máy Wave', amount: 60000, category: 'Đi lại', date: '2026-11-18' },
        { id: 3, name: 'Mua giáo trình Lập trình Web', amount: 55000, category: 'Học tập', date: '2026-11-19' },
        { id: 4, name: 'Vé xem phim cuối tuần', amount: 95000, category: 'Giải trí', date: '2026-11-19' },
        { id: 5, name: 'Trà sữa trân châu', amount: 30000, category: 'Ăn uống', date: '2026-11-19' },
      ],
      filterCategory: 'Tất cả',
      showClock: true,
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  // Cập nhật tiêu đề tab lần đầu khi component mount
  componentDidMount() {
    this.updateDocumentTitle();
  }

  // Tiêu đề tab hiển thị tổng chi, cập nhật bằng componentDidUpdate theo yêu cầu đề bài
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      console.log('[App] componentDidUpdate: Cập nhật tiêu đề tab với tổng chi mới');
      this.updateDocumentTitle();
    }
  }

  // Hàm tính tổng chi và set document.title
  updateDocumentTitle() {
    const total = this.state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu`;
  }

  // Xử lý thêm khoản chi mới
  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  }

  // Xử lý xóa khoản chi
  handleDeleteExpense(id) {
    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id),
    }));
  }

  // Xử lý đổi danh mục lọc
  handleFilterChange(category) {
    this.setState({ filterCategory: category });
  }

  // Bật / tắt hiển thị đồng hồ (để kiểm tra componentDidMount & componentWillUnmount)
  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock,
    }));
  }

  render() {
    const { expenses, filterCategory, showClock } = this.state;

    // Lọc danh sách theo loại chi tiêu
    const filteredExpenses = filterCategory === 'Tất cả'
      ? expenses
      : expenses.filter((item) => item.category === filterCategory);

    return (
      <div className="app-container">
        <Header 
          showClock={showClock} 
          onToggleClock={this.handleToggleClock} 
        />

        <main className="app-main">
          {/* Form thêm chi tiêu */}
          <ExpenseForm onAddExpense={this.handleAddExpense} />

          {/* Bộ lọc theo loại */}
          <ExpenseFilter 
            currentFilter={filterCategory} 
            onFilterChange={this.handleFilterChange} 
          />

          {/* Dòng tổng tiền */}
          <TotalSummary 
            filteredExpenses={filteredExpenses} 
            allExpenses={expenses} 
            currentFilter={filterCategory} 
          />

          {/* Danh sách các khoản chi */}
          <div className="card list-card">
            <div className="card-header">
              <h3>📋 Danh Sách Khoản Chi ({filteredExpenses.length})</h3>
            </div>
            <ExpenseList 
              expenses={filteredExpenses} 
              onDeleteExpense={this.handleDeleteExpense} 
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
