import { useState, useEffect } from "react"

function View() {
  const [students, setStudents] = useState([]);

  useEffect(function() {
    fetch(import.meta.env.VITE_API_URL + "/students")
      .then(function(res) { return res.json(); })
      .then(function(data) { setStudents(data); });
  }, []);

  async function handleDelete(id) {
    await fetch(import.meta.env.VITE_API_URL + "/deletestudent/" + id, {
      method: "DELETE"
    });
    setStudents(students.filter(function(student) {
      return student._id !== id;
    }));
  }

  return (
    <div className="app">
      <h1>View Students</h1>
      <div className="student-list">
        {students.map(function(student) {
          return (
            <div className="student-card" key={student._id}>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <button className="delete-btn" onClick={function() { handleDelete(student._id); }}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default View