import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function TopRecommendations() {
    const [movieData, setMovieData] = useState([]);

    const fetchRecommendations = () => {
        fetch("/top-recommendations").then((res) => {
            res.json().then((data) => {
                // Setting data from API
                console.log('here');
                console.log(data);
                setMovieData(data);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    };

    return (
        <div>
            {/* <button onClick={fetchRecommendations}>Load Recommendations</button> */}
            <Button variant="primary" onClick={fetchRecommendations}>Recommend</Button>
            {(movieData != []) && (
                <ul className="App-header">
                    {Object.keys(movieData).map((key, index) => (
                        <li key={index}>
                            <Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TopRecommendations;
