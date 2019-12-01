import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function SpotiNavigation(props) {
  const { cookies } = props;
  const userId = cookies.get("userId");

  function logClick() {
    cookies.remove("userId", { path: '/' });
  }

  function logText() {
    return userId ? 'Logout' : 'Login';
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>SpotiTalk</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/search">Explore</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            <Nav.Link href="login" onClick={logClick}>{logText()}</Nav.Link>
            <NavDropdown title="Directory">
              <NavDropdown.Item href="AboutUs">About Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="Feedback">Provide Feedback</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {!userId &&
        <div className="alert alert-info">
          Login for full features.
        </div>
      }
    </>
  );
}
