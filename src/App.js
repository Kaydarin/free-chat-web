import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Login from './pages/login';
import Chat from "@pages/chat";
import MenuHeader from "@components/menu-header";
import { useSelector } from 'react-redux';

const PublicRoutes = () => {

  const { isLoggedIn } = useSelector(state => state.app);

  return isLoggedIn ? <Navigate to="/chat" /> : <Outlet />
}

const PrivateRoutes = () => {

  const { isLoggedIn } = useSelector(state => state.app);

  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />
}

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <MenuHeader />
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/chat" element={<Chat />} />
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
