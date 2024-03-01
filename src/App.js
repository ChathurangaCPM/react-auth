import './App.css';
import Register from './components/auth/register';
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from './components/auth/login';
import Authpage from './components/authpage';
import RequireAuth from './routes/requireAuth';
import PersistLogin from './components/persistLogin';
import Members from './components/members';
import Unauthorized from './components/Unauthorized';
import useAuth from './hooks/useAuth';
import PublicRoutes from './routes/publicRoutes';


function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log('chek path ===');
  if (!auth) {
    // If not authenticated, navigate to the login page
    navigate('/login');
    return null; // Render nothing until redirected
  }

  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* Public */}
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        
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
