import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function AccountSettings() {
    // State variables for username, email, password, and whether the fields are visible
    const [curUser, setUser] = useState({
        username: "user not signed in", 
        email: "user not signed in"
    });
    //const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    // useEffect to simulate fetching username and email data
    useEffect(() => {
        fetch("/profile").then((res) => {
            res.json().then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    }, []);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/profile';
        navigate(path);
    }

    function handleForgotPassword() {
        setShowPasswordFields(true); // Show password fields when the button is clicked
    };

    async function handleSubmit() {
        // Handle password change submission
        const response = await fetch('/changepassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: curUser.username,
                password: oldPassword,
                newPassword: newPassword
            })
        });
        // You may want to handle the response here
    };

    return (
        <Container className="profile-container">
            {/* Move the h1 outside of the Row and Col */}
            <h1 className="account-settings-title">Account Settings</h1>
            <Row>
                <Col className="text-end"> {/* Position the button to the top right */}
                    <Button onClick={routeChange}>
                        Back to Profile
                    </Button>
                </Col>
            </Row>
            <Row className="profile-header">
                <Col className="col-12 mt-5">
                    <Image src="img/default.jpeg" id="profile-picture" roundedCircle />
                </Col>
                <Col className="col-12">
                    <h1 id="user-name">
                        {curUser.username}
                    </h1>
                </Col>
            </Row>
            <Row id="accountSettings-banner">
                <Col>
                    <div>
                        <h2>Username: {curUser.username}</h2>
                        <h2>Email: {curUser.email}</h2>
                        <Button onClick={handleForgotPassword}>
                            Change Password
                        </Button>
                    </div>
                    {showPasswordFields && (
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label id="login-email"></Form.Label>
                                <Form.Control type="password"
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label></Form.Label>
                                <Form.Control type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </Form.Group>
                            <Button type="button" className="primary mb-3" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AccountSettings;




