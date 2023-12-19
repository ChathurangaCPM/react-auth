import './App.css';
import Register from './components/auth/register';
import { Routes, Route, Outlet } from "react-router-dom";
import Login from './components/auth/login';
import Authpage from './components/authpage';
import RequireAuth from './routes/requireAuth';
import PersistLogin from './components/persistLogin';
import Members from './components/members';
import Unauthorized from './components/Unauthorized';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={'user'} />}>
            <Route path="/authpage" element={<Authpage />} />
            <Route path="/member" element={<Members />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
