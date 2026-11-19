import { useState, useEffect } from 'react';

/**
 * Custom hook useClock: Quản lý đồng hồ thời gian thực
 * Đáp ứng yêu cầu nâng cao: tách logic đồng hồ độc lập, tự dọn dẹp khi unmount
 */
export default function useClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Khởi tạo timer mỗi giây
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup hàm khi component unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return time;
}
