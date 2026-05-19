import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Add from './pages/Add'
import View from './pages/VIew'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {/* <Link to="/add">add</Link> */}
        {/* <Link to="/view">view</Link> */}
      </nav>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App
