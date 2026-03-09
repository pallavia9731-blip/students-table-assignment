import React, { useState } from "react";

function AddStudent({ students, setStudents, setMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      alert("Invalid Email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newStudent = {
        id: Date.now(),
        name,
        email,
        age,
      };

      setStudents([...students, newStudent]);

      setMessage("Student added successfully");

      setTimeout(() => setMessage(""), 3000);

      setName("");
      setEmail("");
      setAge("");

      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Student</h4>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="btn btn-primary" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Adding...
          </>
        ) : (
          "Add Student"
        )}
      </button>
    </form>
  );
}

export default AddStudent;
