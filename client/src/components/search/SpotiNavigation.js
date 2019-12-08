import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function SpotiNavigation(props) {
  const { cookies } = props;
  const userId = cookies.get("userId");

  function logClick() {
    cookies.remove("userId", { path: '/' });
    cookies.remove("isModerator", { path: '/' });
  }

  function logText() {
    return userId ? 'Logout' : 'Login';
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href='/'>SpotiTalk</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/search">Explore</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            { userId && <Nav.Link href={`/profile/${userId}`}>Profile</Nav.Link> }
            <Nav.Link href="/login" onClick={logClick}>{logText()}</Nav.Link>
            <Nav.Link href="/Privacy"> Privacy Policy </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
