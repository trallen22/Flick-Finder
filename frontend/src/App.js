// import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar/navbar-index';
import {
    BrowserRouter as Router,
    Routes,
    Route,
	Navigate,
} from "react-router-dom";
import Movie from './pages/movie';
import Home from './pages/home';
import TopRecommendations from './pages/top-recommendations';
import SignUp from './pages/signup';
import LoginPage from './pages/login';


function App() {



	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route
						path="/*"
						element={<Home />}
					></Route>
					<Route
						exact path="/top-recommendations"
						element={<TopRecommendations />}
					></Route>
					<Route
						path="/movie/*"
						element={<Movie />}
					></Route>
					<Route 
						exact path="/sign-up"
						element={<SignUp />}
					></Route>
					<Route
						exact path="/login"
						element={<LoginPage />}
					></Route>
					<Route
						exact path="/logout"
						element={<Navigate to="/" />}
					></Route>
					<Route
						exact path="/user"
						element={<Navigate to="/" />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;