import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from v6
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Board from '../pages/Board';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

function AppRoute() {
    return (
        <Routes> {/* Use Routes instead of Route */}
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path='/board' element={<Board />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoute;
