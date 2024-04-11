import "../../src/App.css";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignupPage() {
	const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signUpUser = async () => {
			console.log(username, password);
		
			try { 
				const response = await fetch('/sign-up', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: email,
						username: username,
						password: password
					})
				});
		
				// Handle the response, e.g., check if login was successful
				if (response.ok) {
					console.log('Sign up successful');
				} else {
					console.error('Sign up failed');
				}
			} catch (error) {
				console.error('Error during sign up:', error);
			}
		};

    return (
        <Container className="sign-up">
            <Row className="justify-content-center">
                <Col md={6} className="signup-header">
                    <h1 className="mt-3">Sign Up</h1>
                    <Form>
                        <Row className="mb-3">
                            <Col sm={12}>
                                <Form.Label></Form.Label>
                            </Col>
                            <Col sm={12}>
                                <Form.Control type="text"
                                              placeholder="Email Address"
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Col>
                        </Row>
												<Row className="mb-3">
                            <Col sm={12}>
                                <Form.Label></Form.Label>
                            </Col>
                            <Col sm={12}>
                                <Form.Control type="text"
                                              placeholder="Username"
                                              value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label></Form.Label>
                            </Col>
                            <Col xs={12}>
                                <Form.Control type="password"
                                              placeholder="Password"
                                              value={password}
                                              onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </Row>
                    </Form>
                    <Button type="button" className="primary mb-3" onClick={signUpUser}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupPage;
