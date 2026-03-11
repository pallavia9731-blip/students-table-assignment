import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import "./App.css";

let nextId = 1;

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("add");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alert, setAlert] = useState(null); // { type, name, mode }

  // Auto-dismiss alert after 3.5 s
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3500);
    return () => clearTimeout(t);
  }, [alert]);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: nextId++ }]);
    setAlert({ mode: "add", name: student.name });
    setActiveTab("list");
  };

  const updateStudent = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
    setAlert({ mode: "edit", name: updated.name });
    setActiveTab("list");
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setActiveTab("add");
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab !== "add") setEditingStudent(null);
  };

  return (
    <div className="app">
      {/* ── SUCCESS ALERT PORTAL ── */}
      {alert &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={() => setAlert(null)}>
            <div
              className="modal success-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-icon success-icon">
                {alert.mode === "add" ? "🎉" : "✅"}
              </div>
              <h3>
                {alert.mode === "add" ? "Student Added!" : "Student Updated!"}
              </h3>
              <p>
                {alert.mode === "add" ? (
                  <>
                    <strong>{alert.name}</strong> has been successfully
                    enrolled.
                  </>
                ) : (
                  <>
                    <strong>{alert.name}</strong>'s details have been updated
                    successfully.
                  </>
                )}
              </p>
              <div className="success-progress">
                <div className="success-progress-bar" />
              </div>
              <div className="modal-actions">
                <button
                  className="btn-success-ok"
                  onClick={() => setAlert(null)}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <span className="brand-icon">🎓</span>
            <span className="brand-name">STUDENT PORTAL</span>
          </div>

          <div className="nav-links">
            <button
              className={`nav-link ${activeTab === "add" ? "active" : ""}`}
              onClick={() => handleNavClick("add")}
            >
              <span className="nav-icon">＋</span>
              {editingStudent ? "Edit Student" : "Add Student"}
            </button>

            <button
              className={`nav-link ${activeTab === "list" ? "active" : ""}`}
              onClick={() => handleNavClick("list")}
            >
              <span className="nav-icon">☰</span>
              Students List
              {students.length > 0 && (
                <span className="nav-badge">{students.length}</span>
              )}
            </button>
          </div>

          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button
              className={`mobile-menu-item ${activeTab === "add" ? "active" : ""}`}
              onClick={() => handleNavClick("add")}
            >
              <span>＋</span>
              {editingStudent ? "Edit Student" : "Add Student"}
            </button>
            <button
              className={`mobile-menu-item ${activeTab === "list" ? "active" : ""}`}
              onClick={() => handleNavClick("list")}
            >
              <span>☰</span>
              Students List
              {students.length > 0 && (
                <span className="nav-badge">{students.length}</span>
              )}
            </button>
          </div>
        )}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="container">
        <div className="page-header">
          <h1>
            {activeTab === "add"
              ? editingStudent
                ? "Edit Student"
                : "Add Student"
              : "Students List"}
          </h1>
          <p className="header-sub">
            {activeTab === "add"
              ? editingStudent
                ? "Update the student's information below"
                : "Fill in the details to enroll a new student"
              : `${students.length} student${students.length !== 1 ? "s" : ""} enrolled`}
          </p>
        </div>

        {activeTab === "add" && (
          <div className="tab-panel">
            <StudentForm
              addStudent={addStudent}
              editingStudent={editingStudent}
              updateStudent={updateStudent}
            />
          </div>
        )}

        {activeTab === "list" && (
          <div className="tab-panel">
            <StudentTable
              students={students}
              deleteStudent={deleteStudent}
              editStudent={handleEdit}
            />
          </div>
        )}
      </main>
    </div>
  );
}
