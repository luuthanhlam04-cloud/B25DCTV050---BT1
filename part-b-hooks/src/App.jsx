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

  // 1. Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook useFetch
  const {
    data: expenses,
    loading,
    error,
    refetch,
    addExpense,
    deleteExpense,
  } = useFetch(MOCKAPI_URL);

  // 2. Cập nhật tiêu đề tab hiển thị tổng chi bằng useEffect
  useEffect(() => {
    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu (Hooks)`;
  }, [expenses]);

  // 3. Lọc danh sách theo loại chi tiêu và từ khóa tìm kiếm (có debounce)
  const filteredExpenses = expenses.filter((item) => {
    const matchCategory = filterCategory === 'Tất cả' || item.category === filterCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={`app-wrapper ${theme}-mode`}>
      <div className="app-container">
        {/* Header với đồng hồ realtime và nút đổi giao diện Sáng/Tối */}
        <Header />

        <main className="app-main">
          {/* Form thêm khoản chi (có validate và useRef focus ô nhập) */}
          <ExpenseForm onAddExpense={addExpense} loading={loading} />

          {/* Ô tìm kiếm có debounce (Yêu cầu nâng cao) */}
          <ExpenseSearch onSearchChange={setSearchTerm} />

          {/* Bộ lọc theo loại */}
          <ExpenseFilter
            currentFilter={filterCategory}
            onFilterChange={setFilterCategory}
          />

          {/* Thống kê tổng tiền theo từng loại (Yêu cầu nâng cao) */}
          <CategoryStats expenses={expenses} />

          {/* Dòng hiển thị tổng tiền */}
          <TotalSummary
            filteredExpenses={filteredExpenses}
            allExpenses={expenses}
            currentFilter={filterCategory}
            searchTerm={searchTerm}
          />

          {/* Danh sách các khoản chi (có loading, error, confirm khi xóa) */}
          <div className="card list-card">
            <div className="card-header">
              <h3>
                📋 Danh Sách Khoản Chi ({filteredExpenses.length})
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
