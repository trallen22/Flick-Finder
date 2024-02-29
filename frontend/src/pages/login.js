import "../../src/App.css";

import React, { useEffect, useState } from "react";

function LoginPage(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
	
			// Handle the response, e.g., check if login was successful
			if (response.ok) {
				console.log('Login successful');
			} else {
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	
	useEffect(() => {
		// You can perform other actions when the component mounts here
	}, []);
	

	return (

		<div className="App">
			<form>
				<div className="App-header">
				<label>Username: </label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>Password: </label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="button" onClick={() => logInUser()}>
				Submit
				</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;