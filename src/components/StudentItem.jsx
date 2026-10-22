import React from "react";

export default function StudentItem({ student, onEdit, onDelete }) {
  const getGpaClass = (gpa) => {
    const val = parseFloat(gpa);
    if (val >= 3.6) return "gpa-high";
    if (val >= 2.8) return "gpa-med";
    return "gpa-low";
  };

  const getMajorClass = (major) => {
    switch (major) {
      case "CNTT":
        return "cntt";
      case "ATTT":
        return "attt";
      case "DTVT":
        return "dtvt";
      case "QTKD":
        return "qtkd";
      default:
        return "cntt";
    }
  };

  return (
    <tr>
      <td>
        <span className="student-cell-code">{student.studentCode}</span>
      </td>
      <td>
        <div className="student-cell-name">{student.name}</div>
        {student.phone && (
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            📞 {student.phone}
          </div>
        )}
      </td>
      <td>
        <a
          href={`mailto:${student.email}`}
          style={{ color: "var(--primary)", textDecoration: "none" }}
        >
          {student.email}
        </a>
      </td>
      <td>
        <span className={`major-badge ${getMajorClass(student.major)}`}>
          {student.major}
        </span>
      </td>
      <td>
        <span className={`gpa-tag ${getGpaClass(student.gpa)}`}>
          {parseFloat(student.gpa).toFixed(2)}
        </span>
      </td>
      <td>
        <div className="actions-cell">
          <button
            type="button"
            className="btn btn-primary-outline btn-sm"
            onClick={() => onEdit(student)}
            title="Chỉnh sửa thông tin"
          >
            ✏️ Sửa
          </button>
          <button
            type="button"
            className="btn btn-danger-outline btn-sm"
            onClick={() => onDelete(student.id, student.name)}
            title="Xóa sinh viên"
          >
            🗑️ Xóa
          </button>
        </div>
      </td>
    </tr>
  );
}
