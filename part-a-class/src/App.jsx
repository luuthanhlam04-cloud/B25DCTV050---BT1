import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSearch from './components/ExpenseSearch';
import CategoryStats from './components/CategoryStats';
import ExpenseList from './components/ExpenseList';
import TotalSummary from './components/TotalSummary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, name: 'Phở bò tái nạm', amount: 40000, category: 'Ăn uống', date: '2026-11-18' },
        { id: 2, name: 'Đổ xăng xe máy Wave', amount: 60000, category: 'Đi lại', date: '2026-11-18' },
        { id: 3, name: 'Mua giáo trình Lập trình Web', amount: 55000, category: 'Học tập', date: '2026-11-19' },
        { id: 4, name: 'Vé xem phim cuối tuần', amount: 95000, category: 'Giải trí', date: '2026-11-19' },
        { id: 5, name: 'Trà sữa trân châu', amount: 30000, category: 'Ăn uống', date: '2026-11-19' },
      ],
      filterCategory: 'Tất cả',
      searchTerm: '',
      showClock: true,
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  updateDocumentTitle() {
    const total = this.state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu`;
  }

  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  }

  handleDeleteExpense(id) {
    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id),
    }));
  }

  handleFilterChange(category) {
    this.setState({ filterCategory: category });
  }

  handleSearchChange(term) {
    this.setState({ searchTerm: term });
  }

  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock,
    }));
  }

  render() {
    const { expenses, filterCategory, searchTerm, showClock } = this.state;

    const filteredExpenses = expenses.filter((item) => {
      const matchCategory = filterCategory === 'Tất cả' || item.category === filterCategory;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    return (
      <div className="app-container">
        <Header 
          showClock={showClock} 
          onToggleClock={this.handleToggleClock} 
        />

        <main className="app-main">
          <ExpenseForm onAddExpense={this.handleAddExpense} />

          <ExpenseSearch onSearchChange={this.handleSearchChange} />

          <ExpenseFilter 
            currentFilter={filterCategory} 
            onFilterChange={this.handleFilterChange} 
          />

          <CategoryStats expenses={expenses} />

          <TotalSummary 
            filteredExpenses={filteredExpenses} 
            allExpenses={expenses} 
            currentFilter={filterCategory} 
          />

          <div className="card list-card">
            <div className="card-header">
              <h3>Danh sách khoản chi ({filteredExpenses.length})</h3>
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
