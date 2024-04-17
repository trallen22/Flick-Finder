import "../../src/App.css";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setLoginUsername] = useState("");
    const [password, setLoginPassword] = useState("");
    let navigate = useNavigate(); 

    const logInUser = async () => {
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
			// setResponse(data);
			console.log('login status: ', data.status);
			console.log('login details: ', data.details);

            if(data.status == 'failed'){
                alert("Login Failed!")
            }else{
                let path = `/home`; 
                navigate(path);
                window.location.reload();
            }
		} catch (error) {
			console.error('Error during login:', error);
            alert("Login Failed!")
		}
	};

    return (
        <Container className="Login">
            <Row className="justify-content-center">
                <Col md={6} className="login-header">
                    <h1 className="mt-3">Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text"
                                          placeholder="Username"
                                          value={username}
                                          onChange={(e) => setLoginUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={(e) => setLoginPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
					<div className="d-flex justify-content-between align-items-center">
						<Col xs={4}>
							<Nav className="me-auto">
								<Nav.Link href="/forgot-password">Forgot Password?</Nav.Link>
							</Nav>
						</Col>
						<Col xs={4} className="text-center">
							<Button type="button" className="primary mb-3" onClick={logInUser}>
								Submit
							</Button>
						</Col>
						<Col>
							{/* {empty for spacing} */}
						</Col>
					</div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;

