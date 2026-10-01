import { useState } from "react";

function Addinfo() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.rollNo || !formData.department || !formData.year) {
      setStatus({ type: "error", text: "Please fill out all fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

    try {
      const response = await fetch(`${apiUrl}/addstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Server error (${response.status})`);
      }

      setStatus({ type: "success", text: data.message || "Student Added Successfully!" });
      setFormData({
        name: "",
        rollNo: "",
        department: "",
        year: ""
      });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: error.message || "Failed to add student. Check backend connection." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      {status && (
        <div className={`status-msg status-${status.type}`}>
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="text"
          name="rollNo"
          placeholder="Roll Number"
          value={formData.rollNo}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Adding Student..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default Addinfo;