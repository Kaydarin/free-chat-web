import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home';
import User1 from './pages/user1';
import User2 from './pages/user2';
import { Button } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="header-menu">
            <li className="menus">
              <Link to="/">
                <Button colorScheme='teal' size='lg'>Home</Button>
              </Link>
            </li>
            <li className="menus">
              <Link to="/user1">
                <Button colorScheme='teal' size='lg'>User 1</Button>
              </Link>
            </li>
            <li className="menus">
              <Link to="/user2" target="_blank">
                <Button colorScheme='teal' size='lg'>User 2</Button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/user1" element={<User1 />}>
          </Route>
          <Route path="/user2" element={<User2 />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
