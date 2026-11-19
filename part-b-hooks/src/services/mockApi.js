export const INITIAL_EXPENSES = [
  { id: '1', name: 'Phở bò tái nạm', amount: 40000, category: 'Ăn uống', date: '2026-11-18' },
  { id: '2', name: 'Đổ xăng xe máy Wave', amount: 60000, category: 'Đi lại', date: '2026-11-18' },
  { id: '3', name: 'Mua giáo trình Lập trình Web', amount: 55000, category: 'Học tập', date: '2026-11-19' },
  { id: '4', name: 'Vé xem phim cuối tuần', amount: 95000, category: 'Giải trí', date: '2026-11-19' },
  { id: '5', name: 'Trà sữa trân châu', amount: 30000, category: 'Ăn uống', date: '2026-11-19' },
];

const STORAGE_KEY = 'ptit_th03_expenses_cache';

export function getLocalExpenses() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXPENSES));
    return INITIAL_EXPENSES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_EXPENSES;
  }
}

export function saveLocalExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export const MOCKAPI_URL = 'https://67b9354051192bd378ffbe6e.mockapi.io/api/v1/expenses';
