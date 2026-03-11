import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {
  const [student, setStudent] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const validate = () => {
    let newErrors = {};
    if (!student.name.trim()) newErrors.name = "Name is required";
    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!student.age) {
      newErrors.age = "Age is required";
    } else if (student.age < 1 || student.age > 120) {
      newErrors.age = "Enter a valid age";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      if (editingStudent) {
        updateStudent(student);
      } else {
        addStudent(student);
      }
      setStudent({ name: "", email: "", age: "" });
      setLoading(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          name="name"
          placeholder="e.g. Jane Smith"
          value={student.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          name="email"
          placeholder="e.g. jane@email.com"
          value={student.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          name="age"
          placeholder="e.g. 21"
          type="number"
          value={student.age}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">&nbsp;</label>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="spinner"></span>
              {editingStudent ? "Updating..." : "Adding..."}
            </span>
          ) : editingStudent ? (
            "✎ Update"
          ) : (
            "+ Add Student"
          )}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
