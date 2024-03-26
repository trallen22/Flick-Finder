// import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar/navbar-index';
import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Movie from './pages/movie';
import Home from './pages/home';
import TopRecommendations from './pages/top-recommendations';
import Profile from './pages/profile';

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
				</Routes>
			</Router>
		</div>
	);
}

export default App;
