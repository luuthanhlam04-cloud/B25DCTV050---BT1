import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // Xóa bộ đếm thời gian khi component bị unmount
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    const { time } = this.state;
    return (
      <div className="clock-box">
        Đồng hồ: <strong>{time.toLocaleTimeString('vi-VN')}</strong> ({time.toLocaleDateString('vi-VN')})
      </div>
    );
  }
}

export default Clock;
