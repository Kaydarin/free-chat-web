import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "@chakra-ui/react";
import { resetError } from '@store/app';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "@components/public-routes";
import PrivateRoutes from "@components/private-routes";
import MenuHeader from "@components/menu-header";
import Login from '@pages/login';
import Chat from "@pages/chat";
import './App.css'

function App() {

  const toast = useToast();
  const dispatch = useDispatch();
  const dispatcher = useCallback(cb => dispatch(cb), [dispatch]);

  const { error } = useSelector(state => state.app);

  useEffect(() => {

    if (error !== null) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      dispatcher(resetError())
    }
  }, [error, toast, dispatcher]);

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
