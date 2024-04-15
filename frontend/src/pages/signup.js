import "../../src/App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";

function SignUp(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [backendRes, setResponse] = useState({ status: "", details: "" })

	const signUpUser = async () => {
		console.log(username, password);
	
		try { 
			const response = await fetch('/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: username,
					password: password,
					email: email
				})
			});
			const data = await response.json();
			console.log(data);
			setResponse(data);

		} catch (error) {
			console.error('Error during sign up:', error);
		}
	};
	
	useEffect(() => {
		// You can perform other actions when the component mounts here
	}, []);
	

	return (

		<div className="form-container">
			<Form className="login-form">
				<Form.Label>{backendRes.details}</Form.Label>
				<Form.Group controlId="formBasicEmail">
					{/* <Form.Label>Username</Form.Label> */}
					<Form.Control type="username" placeholder="Username" value={username}
						onChange={(e) => setUsername(e.target.value)}/>
					{/* <Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text> */}
				</Form.Group>
				<Form.Group controlId="signUpEmail">
					<Form.Control type="email" placeholder="Email" value={email}
						onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					{/* <Form.Label>Password</Form.Label> */}
					<Form.Control type="password" placeholder="Password" value={password}
						onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" onClick={signUpUser}>
					Sign up
				</Button>
			</Form>
		</div>
	);
};
 
export default SignUp;