import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import MovieCardGroup from '../components/movie-display';
import Spinner from 'react-bootstrap/Spinner';

function SearchMovies() {
  let location = useLocation();

  const [movieData, setMovieData] = useState({
    title: "unable to get title", 
    description: "unable to get description", 
    genre: "unable to get genreas"
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(location.pathname)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
        setIsLoading(false); // Set isLoading to false when data is loaded
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set isLoading to false if an error occurs
      });
  }, [location.pathname]);

  return (
    <Container>
      {isLoading ? ( // Display spinner while loading
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <MovieCardGroup movieData={movieData} />
      )}
    </Container>
  );
}

export default SearchMovies;
