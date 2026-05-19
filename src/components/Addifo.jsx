import { useState } from "react"

function Addinfo() {
  const [formData, setFromData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: ""
  });

  function handleChange(e) {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
const response = await fetch(import.meta.env.VITE_API_URL + "/addstudent", {      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    alert(data.message);
    console.log(data);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange}/>
        <input type="text" name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange}/>
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange}/>
        <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange}/>
        <button className="btn" type="submit">Add Student</button>
      </form>
    </div>
  )
}

export default Addinfo