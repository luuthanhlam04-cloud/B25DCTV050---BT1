import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSearch from './components/ExpenseSearch';
import CategoryStats from './components/CategoryStats';
import ExpenseList from './components/ExpenseList';
import TotalSummary from './components/TotalSummary';
import useFetch from './hooks/useFetch';
import { MOCKAPI_URL } from './services/mockApi';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: expenses,
    loading,
    error,
    refetch,
    addExpense,
    deleteExpense,
  } = useFetch(MOCKAPI_URL);

  useEffect(() => {
    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu`;
  }, [expenses]);

  const filteredExpenses = expenses.filter((item) => {
    const matchCategory = filterCategory === 'Tất cả' || item.category === filterCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={`app-wrapper ${theme}-mode`}>
      <div className="app-container">
        <Header />

        <main className="app-main">
          <ExpenseForm onAddExpense={addExpense} loading={loading} />

          <ExpenseSearch onSearchChange={setSearchTerm} />

          <ExpenseFilter
            currentFilter={filterCategory}
            onFilterChange={setFilterCategory}
          />

          <CategoryStats expenses={expenses} />

          <TotalSummary
            filteredExpenses={filteredExpenses}
            allExpenses={expenses}
            currentFilter={filterCategory}
            searchTerm={searchTerm}
          />

          <div className="card list-card">
            <div className="card-header">
              <h3>
                Danh sách khoản chi ({filteredExpenses.length})
                {loading && <span className="loading-badge">Đang đồng bộ...</span>}
              </h3>
            </div>
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={deleteExpense}
              loading={loading}
              error={error}
              onRetry={refetch}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
