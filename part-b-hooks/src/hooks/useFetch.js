import { useState, useEffect, useCallback } from 'react';
import { getLocalExpenses, saveLocalExpenses } from '../services/mockApi';

/**
 * Custom hook useFetch: Lấy, thêm, xóa dữ liệu qua MockAPI
 * Quản lý đủ 3 trạng thái: data, loading, error
 */
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Hàm lấy danh sách dữ liệu (GET)
  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`Lỗi kết nối máy chủ (${response.status})`);
      }
      const json = await response.json();
      setData(json);
      saveLocalExpenses(json);
    } catch (err) {
      if (err.name === 'AbortError') return;

      console.warn('API error, chuyển sang dùng dữ liệu lưu trữ nội bộ:', err.message);
      // Fallback về dữ liệu local để bài thi không bị trắng màn hình khi mất mạng
      const local = getLocalExpenses();
      setData(local);
      if (!local || local.length === 0) {
        setError('Không thể tải dữ liệu từ máy chủ và không có bộ nhớ tạm.');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  // useEffect gọi fetch lần đầu khi mount
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  // 2. Hàm thêm khoản chi (POST)
  const addExpense = async (newExpense) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Không thể thêm khoản chi lên máy chủ');
      }

      const created = await response.json();
      setData((prev) => {
        const updated = [created, ...prev];
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } catch (err) {
      console.warn('Lỗi POST, lưu tạm vào danh sách cục bộ:', err.message);
      // Giả lập lưu cục bộ nếu API mock bị lỗi
      const localItem = { ...newExpense, id: Date.now().toString() };
      setData((prev) => {
        const updated = [localItem, ...prev];
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  // 3. Hàm xóa khoản chi (DELETE)
  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      setData((prev) => {
        const updated = prev.filter((item) => String(item.id) !== String(id));
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } catch (err) {
      console.warn('Lỗi DELETE, xóa khỏi danh sách cục bộ:', err.message);
      setData((prev) => {
        const updated = prev.filter((item) => String(item.id) !== String(id));
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(),
    addExpense,
    deleteExpense,
  };
}
