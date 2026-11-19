import React, { Component } from 'react';

class ExpenseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.searchTimer = null;
  }

  componentWillUnmount() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ inputValue: value });

    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.props.onSearchChange(value);
    }, 350);
  };

  handleClear = () => {
    this.setState({ inputValue: '' });
    clearTimeout(this.searchTimer);
    this.props.onSearchChange('');
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="search-box">
        <span className="search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm khoản chi..."
          value={inputValue}
          onChange={this.handleChange}
          className="search-input"
        />
        {inputValue && (
          <button
            type="button"
            className="btn-clear"
            onClick={this.handleClear}
          >
            ✕
          </button>
        )}
      </div>
    );
  }
}

export default ExpenseSearch;
