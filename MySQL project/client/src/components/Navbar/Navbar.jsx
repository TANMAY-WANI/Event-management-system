import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import './navbar.css';
function CollapsibleExample() {

  const user = useSelector((state) => state.user);
  return (
    <Navbar  style={{backgroundColor:'rgba(0,0,0,0.3)'}}  collapseOnSelect expand="md">
      <Container variant="dark" className='navClass'>
        <Navbar.Brand href="#home">
        <p style={{color:"white",fontSize:"2.5rem"}} >EventBuzz</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
            
          </Nav>
          {!user?<Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Register
            </Nav.Link>
          </Nav>:<Nav>
            <Nav.Link eventKey={2} href="/profile">
              Profile
            </Nav.Link>
            <Nav.Link eventKey={2} href="/logout">
              Logout
            </Nav.Link>
            <Nav.Link eventKey={2} href="/events">
              Events
            </Nav.Link>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;