import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../hooks/AuthContext';
interface NavbarProps {
  navbarVisible: boolean;
  setNavbarVisible: (value: boolean) => void;
}

const NavbarComponent = ({ navbarVisible, setNavbarVisible }: NavbarProps) => {
  const { currentUser, logout } = useAuth();
  //@ts-ignore
  const isLogged = currentUser?.token;
  //@ts-ignore
  const userRole = currentUser?.access_level?.name;

  return (
    <>
      <Navbar bg='light'>
        <Container fluid>
          <LinkContainer to='/' className='px-4'>
            <Navbar.Brand>Book event</Navbar.Brand>
          </LinkContainer>

          <Nav className='justify-content-end flex-grow-2 pe-4'>
            <LinkContainer to='/'>
              <Nav.Link>Przeglądaj</Nav.Link>
            </LinkContainer>
            {userRole === 'ADMIN' || userRole === 'MANAGER' ? (
              <>
                <LinkContainer to='/dodaj'>
                  <Nav.Link>Dodaj wydarzenie</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users'>
                  <Nav.Link>Użytkownicy</Nav.Link>
                </LinkContainer>
              </>
            ) : null}
            {!isLogged ? (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Zaloguj</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>Stwórz konto</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <Button variant='link' onClick={logout}>
                Wyloguj się
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
