import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '@store/app';
import { Button } from "@chakra-ui/react";
import './style.css'


export default function MenuHeader() {

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.app);

    const handleLogout = () => {
        dispatch(setLogOut());
    }

    return (
        <nav className="header-container">
            <ul className="header-menu">
                <li className="menus">
                    <img alt="Logo" />
                </li>
            </ul>
            <ul className="header-menu">
                {isLoggedIn ? (
                    <>
                        <li className="menus">
                            <div>
                                <Button colorScheme='teal' variant='ghost' size='lg' onClick={() => handleLogout()}>Logout</Button>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="menus">
                            <div>
                                Please login to chat
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
