import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {

    const { isLoggedIn } = useSelector(state => state.app);

    return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />
}