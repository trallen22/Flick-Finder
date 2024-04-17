import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import MovieCardGroup from '../components/movie-display';

function SearchMovies() {

  let location = useLocation();

  const [movieData, setMovieData] = useState({
    title: "unable to get title", 
    // director: "unable to get director", 
    // actors: "unable to get actors", 
    description: "unable to get description", 
    genre: "unable to get genreas"
});

  useEffect(() => {
    fetch(location.pathname).then((res) => {
      res.json().then((data) => {
        console.log('hello')
        console.log(data)
        const promises = Object.values(data).map(movie => {
          return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1b8a109c8da35481eb8e3f6a4d977ace&language=en-US`)
            .then(res => res.json())
            .then(data => {

              if (data != null) {
                return { ...movie, posterURL: `https://image.tmdb.org/t/p/w200${data["poster_path"]}` };
              } else {
                return { ...movie, posterURL: null };
              }
            });
        });

        Promise.all(promises).then(updatedMovies => {
          setMovieData(updatedMovies);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }, [location.pathname]);

console.log('here')
console.log(movieData)
  
    
    return (
      <Container>
          <MovieCardGroup movieData={movieData} />
        </Container>
    );
}

export default SearchMovies;