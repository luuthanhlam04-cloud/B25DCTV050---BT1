import React, { Component } from 'react';

class ExpenseFilter extends Component {
  render() {
    const { currentFilter, onFilterChange } = this.props;
    const categories = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

    return (
      <div className="filter-box">
        <span className="filter-label">🏷️ Lọc theo loại:</span>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-filter ${currentFilter === cat ? 'active' : ''}`}
              onClick={() => onFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ExpenseFilter;
