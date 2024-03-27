import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import "../App.css";

function TopRecommendations() {
    const [movieData, setMovieData] = useState([]);

    const fetchRecommendations = () => {
        fetch("/top-recommendations").then((res) => {
            res.json().then((data) => {
                // Setting data from API
                console.log('here');
                console.log(data);
                // Fetch poster URLs for each movie
                const promises = Object.values(data).map(movie => {
                    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=1b8a109c8da35481eb8e3f6a4d977ace&query=${encodeURIComponent(movie.title)}`)
                            .then(res => res.json())
                            .then(data => {
                                if (data.results.length > 0) {
                                    return { ...movie, posterURL: `https://image.tmdb.org/t/p/w200${data.results[0].poster_path}` };
                                } else {
                                    return { ...movie, posterURL: null };
                                }
                            });
                });
    
                // Wait for all promises to resolve
                Promise.all(promises).then(updatedMovies => {
                    // Set the state with updated movie data
                    setMovieData(updatedMovies);
                });
            })
            .catch((error) => {
                console.log(error);
            })
        });
    };
    

    return (
        <div className="recommend-wrapper">
            <Button variant="primary" onClick={fetchRecommendations} className="recommend-button">Recommend</Button>
            {(movieData != []) && (
                // <ul className="recommendations">
                // <ListGroup horizontal={'md'}>
                //     {Object.keys(movieData).map((key, index) => (
                //         // <li key={index}>
                //         //     <Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link>
                //         // </li>
                //         <ListGroup.Item>
                //             <Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link>
                //         </ListGroup.Item>
                //     ))}
                // </ListGroup>
                <CardGroup>
                    {Object.keys(movieData).map((key, index) => (
                        <Card key={index} style={{ width: '20%' }}>
                            {movieData[key].posterURL && <Card.Img variant="top" className="movie-poster" src={movieData[key].posterURL} />}
                            <Card.Body>
                                <Card.Title>{movieData[key].title}</Card.Title>
                                <Card.Text>
                                    {movieData[key].description}  
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{movieData[key].genre}</ListGroup.Item>
                                {/* <ListGroup.Item>{movieData[key].keywords}</ListGroup.Item> */}
                                <ListGroup.Item><Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link></ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))}
                </CardGroup>

            )}
        </div>
    );
}

export default TopRecommendations;
