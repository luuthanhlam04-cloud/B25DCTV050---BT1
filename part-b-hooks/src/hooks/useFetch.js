import { useState, useEffect, useCallback } from 'react';
import { getLocalExpenses, saveLocalExpenses } from '../services/mockApi';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      // Khi mất mạng hoặc quá thời gian, đọc dữ liệu cục bộ
      const local = getLocalExpenses();
      setData(local);
      if (!local || local.length === 0) {
        setError('Không thể tải dữ liệu từ máy chủ.');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    // Giới hạn thời gian kết nối 2 giây để tránh bị treo khi mạng chậm
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    fetchData(controller.signal).finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchData]);

  const addExpense = async (newExpense) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Lỗi khi thêm dữ liệu');
      }

      const created = await response.json();
      setData((prev) => {
        const updated = [created, ...prev];
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } catch (err) {
      // Lưu cục bộ nếu mạng lỗi
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

  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      await fetch(`${url}/${id}`, {
        method: 'DELETE',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      setData((prev) => {
        const updated = prev.filter((item) => String(item.id) !== String(id));
        saveLocalExpenses(updated);
        return updated;
      });
      return true;
    } catch (err) {
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
