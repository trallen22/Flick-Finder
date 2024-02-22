// import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar/navbar-index';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Movie from './pages/movie';
import Home from './pages/home';
import TopRecommendations from './pages/top-recommendations';


function App() {

	return (
		<Router>
			<div className="App">
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
				</Routes>
			</div>
		</Router>
	);
}

export default App;