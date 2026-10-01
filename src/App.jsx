import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import View from './pages/VIew';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>
          Add Student
        </NavLink>
        <NavLink to="/view" className={({ isActive }) => isActive ? 'active' : ''}>
          View Students
        </NavLink>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
