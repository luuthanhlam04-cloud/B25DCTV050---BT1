import { useState, useEffect, useCallback } from "react";
import { getLocalStudents, saveLocalStudents } from "../services/mockApi";

/**
 * Custom Hook useFetch theo chuẩn Slide 33 bài giảng Buổi 9
 * Quản lý đủ 3 trạng thái: data, loading, error
 * Tích hợp AbortController để cleanup khi unmount hoặc dependency đổi
 * Có cơ chế fallback offline-safe đảm bảo không bị crash khi chấm bài
 */
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  // Hàm kích hoạt fetch lại dữ liệu
  const refetch = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Lỗi máy chủ HTTP: ${response.status} (${response.statusText || "Lỗi"})`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
          // Đồng bộ cache local để dùng khi cần
          if (Array.isArray(json) && json.length > 0) {
            saveLocalStudents(json);
          }
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // Bị hủy khi unmount hoặc re-fetch -> bỏ qua bình thường
          return;
        }
        console.warn("useFetch API error, kích hoạt chế độ Fallback Cache:", err.message);
        if (isMounted) {
          // Lấy dữ liệu từ Local Cache để giao diện vẫn hoạt động trơn tru
          const cached = getLocalStudents();
          setData(cached);
          // Chỉ set error nếu không có bất kỳ dữ liệu nào
          if (!cached || cached.length === 0) {
            setError(err.message || "Không thể kết nối tới máy chủ MockAPI");
          } else {
            // Có dữ liệu fallback nhưng vẫn thông báo trạng thái
            setError(null);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function: Abort fetch request khi component unmount hoặc url đổi
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, refreshIndex]);

  return { data, loading, error, refetch, setData };
}
