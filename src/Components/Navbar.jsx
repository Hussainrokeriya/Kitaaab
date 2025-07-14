import React, { Navigate } from "react";
import { useFirebase } from "../Context/Firebase";
import HomePage from "../pages/Home";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const firebase = useFirebase();
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="#home">Kitaaab!</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to={firebase.isLoggedin ? "/HomePage" : "/login"} onClick={() => !firebase.isLoggedin && alert("Please log in first")}>
                    Home
                </Nav.Link>
                <Nav.Link as={NavLink} to={firebase.isLoggedin ? "/book/list" : "/login"} onClick={() => !firebase.isLoggedin && alert("Please log in first")}>
                    Add Listing
                </Nav.Link>
                <Nav.Link as={NavLink} to={firebase.isLoggedin ? "/book/orders" : "/login"} onClick={() => !firebase.isLoggedin && alert("Please log in first")}>
                    Orders
                </Nav.Link>
                <Nav.Link href="">
                    <NavLink to="/login">Login</NavLink>
                </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;