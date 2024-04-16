import "../../src/App.css";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
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
			console.log(data.status);

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
                            <Form.Label id="login-email"></Form.Label>
                            <Form.Control type="text"
                                          placeholder="Username"
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
};

export default LoginPage;

