import "../../src/App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";

function LoginPage(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [backendRes, setResponse] = useState({ status: "", details: "" });

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
			setResponse(data);
			console.log(data.status);

		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	
	useEffect(() => {
		// You can perform other actions when the component mounts here
	}, []);
	

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
};

export default LoginPage;