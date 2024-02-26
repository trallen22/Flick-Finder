import "../../src/movie.css";

import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
 
function Movie() {
    let location = useLocation();

    const [movieDetails, setMovieDetails] = useState({
        title: "unable to get title", 
        // director: "unable to get director", 
        // actors: "unable to get actors", 
        description: "unable to get description", 
        genre: "unable to get genreas"
    });

    useEffect(() => {
        fetch(location.pathname).then((res) => {
            res.json().then((data) => {
                setMovieDetails(data);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    }, [location.pathname]);

    return (
        <div className="Movie">
            <div className="App-header">
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.description}</p>
                <p>{movieDetails.genre}</p>
            </div>
        </div>
    );
}
 
export default Movie;