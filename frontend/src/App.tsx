import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Board from './pages/Board';
import Dashboard from './pages/Dashboard';
import OneSpotAccess from './modal/OneSpotAccess';

function App() {
  return (
    <>
      <OneSpotAccess />
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
