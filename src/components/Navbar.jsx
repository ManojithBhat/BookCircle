import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";

const NavBar = () => {
  const firebase = useFirebase();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Book Circle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/book">Books</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
          </Nav>
          {!firebase.isLoggedIn ? (
            <div>
              <Button variant="outline-light" className="ms-2">
                <Nav.Link href="/register">Sign In</Nav.Link>
              </Button>
              <Button variant="light" className="ms-2">
                <Nav.Link href="/login">Log In</Nav.Link>
              </Button>
            </div>
          ) : (
            <Button variant="light" onClick={()=>firebase.signOutUser()} className="ms-2">
              Log Out 
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
