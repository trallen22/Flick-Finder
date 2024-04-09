import "../../src/App.css";

import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function LoginPage() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const logInUser = async () => {
        console.log(loginUsername, loginPassword);
        // Your login logic
    };

    const signUpUser = async () => {
        console.log(signupUsername, signupPassword);
        // Your sign-up logic
    };

    return (
        <Container className="Login">
            <div className="login-header">
                <Row>
                    <Col md={12}>
                        <h1 className="mt-3">Login</h1>
                        
												<Form>
													<Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput1">
														<Form.Label id="login-email">Email address</Form.Label>
														<Form.Control type="text"
																				placeholder="example@email.com"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}/>
													</Form.Group>
													<Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput2">
														<Form.Label>Password</Form.Label>
														<Form.Control type="password"
																				placeholder="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)} />
													</Form.Group>
												</Form>
												<Button type="button" className="primary mb-3" onClick={signUpUser}>
                                        Submit
                        </Button>
                    </Col>
                    {/* <Col md={6}>
                        <h1>Sign-Up</h1> */}
                        {/* <form>
                            <Row>
                                <Col>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        value={signupUsername}
                                        onChange={(e) => setSignupUsername(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button type="button" onClick={signUpUser}>
                                        Submit
                                    </button>
                                </Col>
                            </Row>
                        </form> */}
												{/* <Form>
													<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
														<Form.Label>Email address</Form.Label>
														<Form.Control type="email" placeholder="name@example.com" />
													</Form.Group>
													<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
														<Form.Label>Password</Form.Label>
														<Form.Control type="email" placeholder="password" />
													</Form.Group>
												</Form>
                    </Col> */}
                </Row>
            </div>
        </Container>
    );
};

export default LoginPage;
