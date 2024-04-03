import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css";

const NavbarFF = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="nav-bar-ff">
            <Container>
                <Navbar.Brand href="/home">Flick Finder</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/top-recommendations">Recommendations</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                <Form inline="true">
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <Nav className="me-auto">
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarFF;
