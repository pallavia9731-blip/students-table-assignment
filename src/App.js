import React, { useEffect, useState } from "react";
import studentsData from "./data/students.json";
import "./App.css";
import AddStudent from "./components/AddStudent";
import StudentTable from "./components/StudentTable";
import EditStudent from "./components/EditStudent";
import Loader from "./components/Loader";

import { exportToExcel } from "./utils/exportExcel";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStudentData, setEditStudentData] = useState(null);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 2000);
  }, []);

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
      setMessage("Student deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const editStudent = (student) => {
    setEditStudentData(student);
    setActiveSection("add");
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)),
    );
    setEditStudentData(null);
    setMessage("Student updated successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Students Management</h2>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="mb-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => setActiveSection("add")}
        >
          Add Student
        </button>

        <button
          className="btn btn-info me-2"
          onClick={() => setActiveSection("list")}
        >
          List Students
        </button>

        <button
          className="btn btn-success"
          onClick={() => {
            exportToExcel(students);
            setMessage("Excel downloaded successfully");
            setTimeout(() => setMessage(""), 3000);
          }}
        >
          Download Excel
        </button>
      </div>

      {activeSection === "add" &&
        (editStudentData ? (
          <EditStudent
            student={editStudentData}
            updateStudent={updateStudent}
            cancelEdit={() => setEditStudentData(null)}
          />
        ) : (
          <AddStudent
            students={students}
            setStudents={setStudents}
            setMessage={setMessage}
          />
        ))}

      {activeSection === "list" && (
        <>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="form-control mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredStudents.length === 0 ? (
            <p className="text-danger">Student not found</p>
          ) : (
            <StudentTable
              students={filteredStudents}
              deleteStudent={deleteStudent}
              editStudent={editStudent}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
