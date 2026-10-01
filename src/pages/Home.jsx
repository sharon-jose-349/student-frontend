import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h1>Students</h1>
      <div className="home-container">
        <button className="btn" type="button" onClick={() => navigate("/add")}>
          Add Student
        </button>
        <button className="btn" type="button" onClick={() => navigate("/view")}>
          View Students
        </button>
      </div>
    </div>
  );
}

export default Home;