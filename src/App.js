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
        <nav className="header-container">
          <ul className="header-menu">
            <li className="menus">
              <div>
                Logo
              </div>
            </li>
          </ul>
          <ul className="header-menu">
            <li className="menus">
              <div>
                <Link to="/">
                  <Button colorScheme='teal' variant='ghost' size='lg'>Home</Button>
                </Link>
              </div>
            </li>
            <li className="menus">
              <div>
                <Link to="/user1">
                  <Button colorScheme='teal' variant='ghost' size='lg'>User 1</Button>
                </Link>
              </div>
            </li>
            <li className="menus">
              <div>
                <Link to="/user2" target="_blank">
                  <Button colorScheme='teal' variant='ghost' size='lg'>User 2</Button>
                </Link>
              </div>
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
