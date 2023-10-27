import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from './pages/Board';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Dashboard />} />
        <Route path="/board/:boardId" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;
