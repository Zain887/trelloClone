import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from './pages/Board';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/board/:boardId" element={<Board/>} />
    </Routes>
  );
}

export default App;
