import "../../src/App.css";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function ForgotPassword() {
    

    return (
        <Container className="Login">
            <Row className="justify-content-center">
                <Col md={6} className="login-header">
                    <h1 className="mt-3">Reset Password</h1>
                    <Form>
                        
                    </Form>
					<div className="d-flex justify-content-between align-items-center">
						<Col xs={4}>
							<Button type="button" className="primary mb-3">
								Forgot Password?
							</Button>
						</Col>
						<Col xs={4} className="text-center">
							<Button type="button" className="primary mb-3">
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

export default ForgotPassword;

