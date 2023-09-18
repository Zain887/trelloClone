import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; // Import the Login component
import Signup from './pages/Signup'; // Import the Signup component
import Board from './pages/Board';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/board/:boardId" element={<Board/>} />
    </Routes>
  );
}

export default App;
