import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home.js'
import Manage from './components/Manage.js'

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="disputes" element={<Manage />} />
    </Routes>
  );
}

export default App;
