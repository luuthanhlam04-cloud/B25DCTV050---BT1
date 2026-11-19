import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, name: 'Ăn sáng phở bò', amount: 35000, category: 'Ăn uống', date: '2026-11-18' },
        { id: 2, name: 'Đổ xăng xe máy', amount: 50000, category: 'Đi lại', date: '2026-11-18' },
        { id: 3, name: 'Mua giáo trình LTW', amount: 65000, category: 'Học tập', date: '2026-11-19' },
        { id: 4, name: 'Xem phim cuối tuần', amount: 90000, category: 'Giải trí', date: '2026-11-19' },
      ],
      filterCategory: 'Tất cả',
      showClock: true,
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Sổ Chi Tiêu Cá Nhân (Phần A - Class Component)</h1>
        <p>Đang khởi tạo dự án...</p>
      </div>
    );
  }
}

export default App;
