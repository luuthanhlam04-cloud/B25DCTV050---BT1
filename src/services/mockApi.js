// ============================================================
// SERVICE: Quản lý Dữ liệu Sinh viên & MockAPI.io
// Lập trình Web - Buổi 9 (React Hooks)
// ============================================================

// Dữ liệu mẫu khởi tạo chuẩn format bài tập sinh viên PTIT
export const INITIAL_STUDENTS = [
  {
    id: "1",
    studentCode: "B25DCTV050",
    name: "Lưu Thanh Lâm",
    email: "lamlt.b25dctv050@ptit.edu.vn",
    major: "CNTT",
    gpa: 3.82,
    phone: "0912345678",
  },
  {
    id: "2",
    studentCode: "B25DCCN001",
    name: "Nguyễn Văn An",
    email: "annv.b25dccn001@ptit.edu.vn",
    major: "CNTT",
    gpa: 3.65,
    phone: "0987654321",
  },
  {
    id: "3",
    studentCode: "B25DCAT015",
    name: "Trần Thị Bình",
    email: "binhtt.b25dcat015@ptit.edu.vn",
    major: "ATTT",
    gpa: 3.45,
    phone: "0934567890",
  },
  {
    id: "4",
    studentCode: "B25DCDT028",
    name: "Lê Hoàng Cường",
    email: "cuonglh.b25dcdt028@ptit.edu.vn",
    major: "DTVT",
    gpa: 3.2,
    phone: "0945678901",
  },
  {
    id: "5",
    studentCode: "B25DCKD042",
    name: "Phạm Thị Dung",
    email: "dungpt.b25dckd042@ptit.edu.vn",
    major: "QTKD",
    gpa: 3.75,
    phone: "0956789012",
  },
  {
    id: "6",
    studentCode: "B25DCCN099",
    name: "Hoàng Minh Đức",
    email: "duchm.b25dccn099@ptit.edu.vn",
    major: "CNTT",
    gpa: 3.9,
    phone: "0967890123",
  },
];

// Khóa lưu trữ cache cục bộ để đảm bảo offline-first (không sợ mất mạng khi chấm bài)
const STORAGE_KEY = "ptit_mockapi_students_data";

// Helper lấy dữ liệu từ Local Cache
export function getLocalStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    return INITIAL_STUDENTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_STUDENTS;
  }
}

// Helper lưu dữ liệu vào Local Cache
export function saveLocalStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Endpoint MockAPI (Sinh viên có thể thay bằng URL mockapi.io cá nhân bất cứ lúc nào)
export const DEFAULT_MOCKAPI_URL = "https://67b9354051192bd378ffbe6e.mockapi.io/api/v1/students";
