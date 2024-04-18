// MovieCardGroup.js

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const MovieCardGroup = ({ movieData }) => {
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  // console.log('hi')
  // console.log(movieData)

  useEffect(() => {
    setIsLoading(true); 
    const promises = Object.values(movieData).map(movie => {
      return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1b8a109c8da35481eb8e3f6a4d977ace&language=en-US`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (Object.keys(movieData).length > 0) {
            console.log('hi')
            console.log(data)
            setIsLoading(false);
            return { ...movie, posterURL: `https://image.tmdb.org/t/p/w200${data.poster_path}` };
          } else {
            setIsLoading(false);
            return { ...movie, posterURL: null };
          }
        });
    });

    Promise.all(promises).then(updatedMovies => {
      setUpdatedMovies(updatedMovies);
    });
  }, [movieData]);

  console.log(updatedMovies)

  return (
    <div>
      {isLoading ? ( // Display spinner when loading
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <CardGroup>
          {updatedMovies.map((movie, index) => (
            <Link key={index} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card style={{ width: '16rem', marginBottom: '20px' }}>
                {movie.posterURL && <Card.Img variant="top" src={movie.posterURL} />}
              </Card>
            </Link>
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default MovieCardGroup;

