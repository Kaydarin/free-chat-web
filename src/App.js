import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Login from './pages/login';
import User1 from "@pages/user1";
import { useSelector } from 'react-redux';

const PublicRoutes = () => {

  const { isLoggedIn } = useSelector(state => state.app);

  return isLoggedIn ? <Navigate to="/user1" /> : <Outlet />
}

const PrivateRoutes = () => {

  const { isLoggedIn } = useSelector(state => state.app);

  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />
}

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/user1" element={<User1 />} />
          </Route>
          <Route path="/login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
