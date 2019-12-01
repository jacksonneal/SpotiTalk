import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class SpotiNavigation extends React.Component {

  logClick() {

  }

  exploreClick() {
    //this.props.setInForum(false);
  }

  forumClick() {
    //this.props.setInForum(true);
  }

  logText() {
    return 'Login';
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>SpotiTalk</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/search" onClick={this.exploreClick}>Explore</Nav.Link>
            <Nav.Link href="/forum" onClick={this.forumClick}>Forum</Nav.Link>
            <Nav.Link href="login" onClick={this.logClick}>{this.logText()}</Nav.Link>
            <NavDropdown title="Directory">
              <NavDropdown.Item href="AboutUs">About Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="Feedback">Provide Feedback</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SpotiNavigation;

