import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css";

const NavbarFF = () => {
    const [val, setVal] = useState("");
    const [loggedIn, setLoggedInStatus] = useState(false);

    const checkUser = async () => {
        const response = await fetch('/get-user');
        const data = await response.json();
        console.log(data)
        if (data.user_id === '-1') {
            setLoggedInStatus(false);
        } else {
            setLoggedInStatus(true);
        }
    }

    useEffect(() => {
        checkUser();
    }, [loggedIn]);

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
                                placeholder="Enter Movie"
                                className="mr-sm-2"
                                value={val}
                                onChange={e => setVal(e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" href={`/search-movies/${val}`}>Search</Button>
                        </Col>
                    </Row>
                </Form>
                <Nav className="me-auto">
                    {!loggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                    {loggedIn && <Nav.Link href="/logout">Logout</Nav.Link>}
                    {!loggedIn && <Nav.Link href="/sign-up">Sign up</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarFF;

