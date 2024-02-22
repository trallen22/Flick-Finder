import '../App.css';

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function TopRecommendations() {

    const [movieData, setMovieData] = useState({
        movie0: { title: "no title for movie 1", description: "no description" }, 
        movie1: { title: "no title for movie 2", description: "no description" }, 
        movie2: { title: "no title for movie 3", description: "no description" }   
    });

    useEffect(() => {
        fetch("/top-recommendations").then((res) => {
            res.json().then((data) => {
                // Setting a data from api
                setMovieData(data);
            })
            .catch((error) => {
                console.log(error);
            })

        });
    }, []);

    return (
        <div>
            <ul className="App-header">
                <li>
                    <Link to={`/movie/${movieData.movie0.title}`}>{movieData.movie0.title}</Link>
                </li>
                <li>
                    <Link to={`/movie/${movieData.movie1.title}`}>{movieData.movie1.title}</Link>
                </li>
                <li>
                    <Link to={`/movie/${movieData.movie2.title}`}>{movieData.movie2.title}</Link>
                </li>
            </ul>
        </div>
    );
}

export default TopRecommendations;