import { useState, useEffect } from "react";

function View() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadStudents = () => {
    setLoading(true);
    setError(null);
    const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

    fetch(`${apiUrl}/students`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
          if (data.message) throw new Error(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load students");
        setLoading(false);
      });
  };

  useEffect(() => {
    let ignore = false;
    const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

    fetch(`${apiUrl}/students`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          if (Array.isArray(data)) {
            setStudents(data);
          } else {
            setStudents([]);
            if (data.message) throw new Error(data.message);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error(err);
          setError(err.message || "Failed to load students");
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setDeletingId(id);
    const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

    try {
      const res = await fetch(`${apiUrl}/deletestudent/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete student: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const filteredStudents = students.filter((student) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.rollNo && student.rollNo.toLowerCase().includes(term)) ||
      (student.department && student.department.toLowerCase().includes(term)) ||
      (student.year && student.year.toLowerCase().includes(term))
    );
  });

  return (
    <div className="app view-app">
      <h1>View Students</h1>

      {/* Interactive Search filter */}
      {!loading && !error && students.length > 0 && (
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, roll no, department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {loading ? (
        <p className="info-text">Loading students...</p>
      ) : error ? (
        <div className="status-msg status-error">
          <p>{error}</p>
          <button
            type="button"
            className="btn"
            style={{ marginTop: "12px", height: "42px", fontSize: "14px" }}
            onClick={loadStudents}
          >
            Retry
          </button>
        </div>
      ) : students.length === 0 ? (
        <p className="info-text">No students yet. Click &quot;Add Student&quot; to add one!</p>
      ) : filteredStudents.length === 0 ? (
        <p className="info-text">No students match your search.</p>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => (
            <div className="student-card" key={student._id}>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <button
                className="delete-btn"
                disabled={deletingId === student._id}
                onClick={() => handleDelete(student._id)}
              >
                {deletingId === student._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default View;