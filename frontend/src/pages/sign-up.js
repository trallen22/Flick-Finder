import "../../src/App.css";

import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function SignupPage() {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const signUpUser = async () => {
		console.log(username, password);
	
		try { 
			const response = await fetch('/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
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
	
	useEffect(() => {
		// You can perform other actions when the component mounts here
	}, []);

    return (
        <Container className="sign-up">
            <div className="signup-header">
                <Row>
                    <Col md={12}>
                        <h1 className="mt-3">Sign Up</h1>
                        
												<Form>
													<Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput1">
														<Form.Label id="signup-email">Email address</Form.Label>
														<Form.Control type="text"
                            placeholder="example@email.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
													</Form.Group>
													<Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput2">
														<Form.Label>Password</Form.Label>
														<Form.Control type="password"
                            placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
													</Form.Group>
												</Form>
												<Button type="button" className="primary mb-3" onClick={() => signUpUser()}>
                                        Submit
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default SignupPage;
