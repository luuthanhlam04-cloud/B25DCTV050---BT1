import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    console.log('[Clock] componentDidMount: Khởi tạo setInterval');
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log('[Clock] componentWillUnmount: Dừng setInterval đúng cách khi bị ẩn');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    return (
      <div className="clock-box">
        🕒 Hiện tại: <strong>{this.state.time.toLocaleTimeString('vi-VN')}</strong> ({this.state.time.toLocaleDateString('vi-VN')})
      </div>
    );
  }
}

export default Clock;
