import React from 'react';

export default function CategoryStats({ expenses }) {
  const categories = [
    { name: 'Ăn uống', badge: 'badge-eating' },
    { name: 'Đi lại', badge: 'badge-travel' },
    { name: 'Học tập', badge: 'badge-study' },
    { name: 'Giải trí', badge: 'badge-fun' },
  ];

  const getCategoryTotal = (catName) => {
    return expenses
      .filter((item) => item.category === catName)
      .reduce((sum, item) => sum + Number(item.amount), 0);
  };

  return (
    <div className="category-stats-card">
      <div className="stats-title">Thống kê chi tiêu theo loại:</div>
      <div className="stats-grid">
        {categories.map((cat) => {
          const total = getCategoryTotal(cat.name);
          return (
            <div key={cat.name} className="stat-chip">
              <span className={`badge ${cat.badge}`}>{cat.name}</span>
              <span className="stat-amount">{total.toLocaleString('vi-VN')} đ</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
