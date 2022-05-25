import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {

    const toast = useToast();
    const dispatch = useDispatch();
    const dispatcher = useCallback(cb => dispatch(cb), [dispatch]);

    const { isLoggedIn, username } = useSelector(state => state.app);

    useEffect(() => {

        if (isLoggedIn) {
            toast({
                title: 'Welcome!',
                description: `Hi ${username}! Lets chat!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

    }, [isLoggedIn, username, toast, dispatcher]);

    return isLoggedIn ? <Navigate to="/chat" /> : <Outlet />
}
