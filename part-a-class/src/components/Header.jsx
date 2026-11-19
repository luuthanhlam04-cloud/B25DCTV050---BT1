import React, { Component } from 'react';
import Clock from './Clock';

class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="app-header">
        <div className="header-info">
          <h2>Sổ Chi Tiêu Cá Nhân</h2>
          <p className="student-badge">SV: Lưu Thanh Lâm - MS: B25DCTV050 - Lớp: D25CQTV02-B (Phần A - Class Component)</p>
        </div>

        <div className="header-clock-controls">
          {showClock && <Clock />}
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onToggleClock}
          >
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
