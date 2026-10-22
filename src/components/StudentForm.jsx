import React, { useState, useEffect, useRef } from "react";

const INITIAL_FORM = {
  name: "",
  studentCode: "",
  email: "",
  major: "CNTT",
  gpa: "",
  phone: "",
};

export default function StudentForm({ editingStudent, onSubmitStudent, onCancelEdit }) {
  // State quản lý form dưới dạng Object theo đúng Slide 25 bài giảng
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Dùng useRef để tham chiếu và tự động focus ô Họ tên theo Slide 30
  const nameInputRef = useRef(null);

  // Khi chuyển đổi giữa chế độ Thêm mới và Sửa, tự động điền form và focus
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        studentCode: editingStudent.studentCode || "",
        email: editingStudent.email || "",
        major: editingStudent.major || "CNTT",
        gpa: editingStudent.gpa !== undefined ? String(editingStudent.gpa) : "",
        phone: editingStudent.phone || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});

    // Tự động focus vào ô Họ tên
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingStudent]);

  // Xử lý thay đổi input dạng Controlled Component với Object Spread (Slide 25)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng gõ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Xác thực (Validation) dữ liệu form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên sinh viên";
    }
    if (!formData.studentCode.trim()) {
      newErrors.studentCode = "Vui lòng nhập mã sinh viên (MSSV)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    const gpaNum = parseFloat(formData.gpa);
    if (formData.gpa === "" || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      newErrors.gpa = "Điểm GPA phải nằm trong khoảng từ 0.0 đến 4.0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitStudent({
      ...formData,
      gpa: parseFloat(formData.gpa),
    });

    if (!editingStudent) {
      setFormData(INITIAL_FORM);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">
          <span>{isEditing ? "✏️" : "➕"}</span>
          {isEditing ? "Cập Nhật Sinh Viên" : "Thêm Sinh Viên Mới"}
        </h2>
        <span className={`form-mode-tag ${isEditing ? "mode-tag-edit" : "mode-tag-add"}`}>
          {isEditing ? "Đang sửa" : "Tạo mới"}
        </span>
      </div>

      <form className="student-form" onSubmit={handleSubmit} noValidate>
        {/* Họ và tên */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-name">
            Họ và tên <span className="form-label-required">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="student-name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="Ví dụ: Lưu Thanh Lâm"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        {/* Mã sinh viên */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-code">
            Mã sinh viên (MSSV) <span className="form-label-required">*</span>
          </label>
          <input
            id="student-code"
            name="studentCode"
            type="text"
            className={`form-input ${errors.studentCode ? "input-error" : ""}`}
            placeholder="Ví dụ: B25DCTV050"
            value={formData.studentCode}
            onChange={handleChange}
          />
          {errors.studentCode && <span className="field-error">{errors.studentCode}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-email">
            Email sinh viên <span className="form-label-required">*</span>
          </label>
          <input
            id="student-email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="Ví dụ: lamlt.b25dctv050@ptit.edu.vn"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        {/* Chuyên ngành */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-major">
            Chuyên ngành đào tạo <span className="form-label-required">*</span>
          </label>
          <select
            id="student-major"
            name="major"
            className="form-select"
            value={formData.major}
            onChange={handleChange}
          >
            <option value="CNTT">Công nghệ thông tin (CNTT)</option>
            <option value="ATTT">An toàn thông tin (ATTT)</option>
            <option value="DTVT">Điện tử viễn thông (DTVT)</option>
            <option value="QTKD">Quản trị kinh doanh (QTKD)</option>
          </select>
        </div>

        {/* Điểm GPA */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-gpa">
            Điểm GPA tích lũy (Hệ 4) <span className="form-label-required">*</span>
          </label>
          <input
            id="student-gpa"
            name="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            className={`form-input ${errors.gpa ? "input-error" : ""}`}
            placeholder="Ví dụ: 3.82"
            value={formData.gpa}
            onChange={handleChange}
          />
          {errors.gpa && <span className="field-error">{errors.gpa}</span>}
        </div>

        {/* Số điện thoại */}
        <div className="form-group">
          <label className="form-label" htmlFor="student-phone">
            Số điện thoại liên hệ
          </label>
          <input
            id="student-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="Ví dụ: 0912345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Nút hành động */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {isEditing ? "💾 Lưu Thay Đổi" : "➕ Thêm Sinh Viên"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
