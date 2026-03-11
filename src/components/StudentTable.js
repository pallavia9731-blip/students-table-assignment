import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students, deleteStudent, editStudent }) {
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const exportExcel = () => {
    const dataToExport = search ? filtered : students;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "students.xlsx");
  };

  const handleConfirmDelete = () => {
    deleteStudent(confirmId);
    setConfirmId(null);
  };

  const highlight = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = String(text).split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="highlight">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      {/* ── Modal rendered via Portal at body level ── */}
      {confirmId !== null &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-icon">🗑️</div>
              <h3>Delete Student</h3>
              <p>
                Are you sure you want to remove this student? This action is
                permanent and cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setConfirmId(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn-confirm-delete"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="table-wrapper">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
          <div className="toolbar-right">
            <span className="table-count">
              {filtered.length} of {students.length} student
              {students.length !== 1 ? "s" : ""}
            </span>
            <button className="btn-download" onClick={exportExcel}>
              ↓ Export Excel
            </button>
          </div>
        </div>

        {/* Search info bar */}
        {search && (
          <div className="search-info">
            {filtered.length > 0
              ? `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
              : `No results found for "${search}"`}
          </div>
        )}

        {/* Desktop Table */}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    {search
                      ? `No students match "${search}"`
                      : "No students yet — add one to get started."}
                  </td>
                </tr>
              ) : (
                filtered.map((s, index) => (
                  <tr key={s.id}>
                    <td className="row-index">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="cell-name">{highlight(s.name, search)}</td>
                    <td className="cell-email">{highlight(s.email, search)}</td>
                    <td>{s.age}</td>
                    <td className="cell-actions">
                      <button
                        className="btn-edit"
                        onClick={() => editStudent(s)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => setConfirmId(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-cards">
          {filtered.length === 0 ? (
            <p className="empty-state-mobile">
              {search
                ? `No results for "${search}"`
                : "No students yet — add one to get started."}
            </p>
          ) : (
            filtered.map((s) => (
              <div className="student-card" key={s.id}>
                <div className="student-card-info">
                  <div className="student-card-name">
                    {highlight(s.name, search)}
                  </div>
                  <div className="student-card-email">
                    {highlight(s.email, search)}
                  </div>
                  <div className="student-card-age">Age: {s.age}</div>
                </div>
                <div className="student-card-actions">
                  <button className="btn-edit" onClick={() => editStudent(s)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => setConfirmId(s.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default StudentTable;
