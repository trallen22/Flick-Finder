// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar-index';
// import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
	Navigate,
} from "react-router-dom";
import Movie from './pages/movie';
import Home from './pages/home';
import TopRecommendations from './pages/top-recommendations';
import Profile from './pages/profile';
import SignUp from './pages/sign-up';
import LoginPage from './pages/login';
import Logout from './pages/logout';
import SearchMovies from './pages/search-movies.js';
import AccountSettings from './pages/accountSettings.js';


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
						exact path="/profile"
						element={<Profile />}
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
						element={<Logout />}
					></Route>
					<Route
						exact path="/user"
						element={<Navigate to="/" />}
					></Route>
					<Route
						path="/search-movies/*"
						element={<SearchMovies />}
					></Route>
					<Route
						exact path="/accountSettings"
						element={<AccountSettings />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
