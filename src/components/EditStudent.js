import React, { useState } from "react";

function EditStudent({ student, updateStudent, cancelEdit }) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [age, setAge] = useState(student.age);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...student,
      name,
      email,
      age,
    };

    updateStudent(updatedStudent);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h4>Edit Student</h4>

      <input
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="btn btn-success me-2">Update</button>

      <button className="btn btn-secondary" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
}

export default EditStudent;
