import { useSelector } from 'react-redux';
import { Button } from "@chakra-ui/react";
import './style.css'


export default function MenuHeader() {

    const { isLoggedIn } = useSelector(state => state.app);

    return (
        <nav className="header-container">
            <ul className="header-menu">
                <li className="menus">
                    <div>
                        Logo
                    </div>
                </li>
            </ul>
            <ul className="header-menu">
                {isLoggedIn ? (
                    <>
                        <li className="menus">
                            <div>
                                <Button colorScheme='teal' variant='ghost' size='lg'>Logout</Button>
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
