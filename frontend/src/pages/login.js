import "../../src/App.css";
<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";

function LoginPage(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [backendRes, setResponse] = useState({ status: "", details: "" });

	const logInUser = async () => {
=======
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function LoginPage() {
    const [username, setLoginUsername] = useState("");
    const [password, setLoginPassword] = useState("");

    const logInUser = async () => {
>>>>>>> main
		console.log(username, password);
	
		try { 
			const response = await fetch('/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: username,
					password: password
				})
			});
			const data = await response.json();
			setResponse(data);
			console.log(data.status);

		} catch (error) {
			console.error('Error during login:', error);
		}
	};

<<<<<<< HEAD
	return (
		<div className="form-container">
			<Form className="login-form">
				<Form.Label>{backendRes.status} {backendRes.details}</Form.Label>
				<Form.Group controlId="formBasicEmail">
					{/* <Form.Label>Username</Form.Label> */}
					<Form.Control type="username" placeholder="Username" value={username}
						onChange={(e) => setUsername(e.target.value)}/>
					{/* <Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text> */}
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					{/* <Form.Label>Password</Form.Label> */}
					<Form.Control type="password" placeholder="Password" value={password}
						onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" onClick={logInUser}>
					login
				</Button>
			</Form>
		</div>
  );
=======
    return (
        <Container className="Login">
            <Row className="justify-content-center">
                <Col md={6} className="login-header">
                    <h1 className="mt-3">Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label id="login-email"></Form.Label>
                            <Form.Control type="text"
                                          placeholder="Email Address"
                                          value={username}
                                          onChange={(e) => setLoginUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label></Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={(e) => setLoginPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <Button type="button" className="primary mb-3" onClick={logInUser}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
>>>>>>> main
};

export default LoginPage;

