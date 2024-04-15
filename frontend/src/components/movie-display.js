// MovieCardGroup.js

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';

const MovieCardGroup = ({ movieData }) => {
  const [updatedMovies, setUpdatedMovies] = useState([]);

  console.log('hi')

  useEffect(() => {
    const promises = Object.values(movieData).map(movie => {
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

    Promise.all(promises).then(updatedMovies => {
      setUpdatedMovies(updatedMovies);
    });
  }, [movieData]);

  console.log(updatedMovies)

  return (
    <CardGroup>
      {updatedMovies.map((movie, index) => (
        <Link key={index} to={`/movie/${movie.title}`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '16rem', marginBottom: '20px' }}>
            {movie.posterURL && <Card.Img variant="top" src={movie.posterURL} />}
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
               {/* <Card.Text>{movie.description}</Card.Text>  */}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </CardGroup>
  );
};

export default MovieCardGroup;

