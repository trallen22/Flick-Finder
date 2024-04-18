import "../../src/App.css";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ForgotPassword() {
    const [onResetPage, setCurPage] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState("");

    async function sendRecoveryEmail(curEmail) {
        const response = await fetch('/send-recovery', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
                email: curEmail
            })
        });
        const data = await response.json();
        console.log(data);
        setCurPage(true);
    }

    const [recoveryCode, setRecoveryCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function resetPassword() {
        const response = await fetch('/reset-password', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
                email: recoveryEmail, 
                recovery_code: recoveryCode, 
                new_password: newPassword
            })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <Container className="Login">
            <Row className="justify-content-center">
                <Col md={6} className="login-header">
                    {!onResetPage && <div>
                        <h1 className="mt-3">Forgot Password</h1>
                        <Form inline="true">
                            <Row>
                                <p>Enter email to send password recovery code</p>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="sendRecoveryEmail">
                                        <Form.Control type="text"
                                                        placeholder="Email Address"
                                                        value={recoveryEmail}
                                                        onChange={(e) => setRecoveryEmail(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button type="button" onClick={() => sendRecoveryEmail(recoveryEmail)}>Send Recovery Email</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p onClick={() => setCurPage(true)}>I already have a recovery code</p>
                                </Col>
                            </Row>
                        </Form>
                    </div>}
                    {onResetPage && <div>
                        <h1 className="mt-3">Reset Password</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text"
                                            placeholder="Recovery Code"
                                            value={recoveryCode}
                                            onChange={(e) => setRecoveryCode(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control type="password"
                                            placeholder="Confirm Password"/>
                            </Form.Group>
                        </Form>
                        <div className="d-flex justify-content-between align-items-center">
                            <Col xs={4}>
                                <p onClick={() => setCurPage(false)}>back to recovery email</p>
                            </Col>
                            <Col xs={4} className="text-center">
                                <Button type="button" className="primary mb-3" onClick={resetPassword}>
                                    Submit
                                </Button>
                            </Col>
                            <Col>
                                {/* {empty for spacing} */}
                            </Col>
                        </div>
                    </div>}
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;

