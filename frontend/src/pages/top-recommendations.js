import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import MovieCardGroup from '../components/movie-display';
import '../App.css';

function TopRecommendations() {
  const [movieData, setMovieData] = useState([]);
  const [spin, setSpinner] = useState(false);

  const fetchRecommendations = () => {
    // Set the spinner to true when the button is clicked
    setSpinner(true);

    fetch("/top-recommendations")
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
        // Set the spinner back to false when data is loaded
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        // Set the spinner back to false if an error occurs
        setSpinner(false);
      });
  };

  return (
    <div className="recommend-wrapper">
      <Button variant="primary" onClick={fetchRecommendations} className="recommend-button m-3">
        {spin ? (
          <>
            <span className="mr-2 m-3">Loading...</span>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </>
        ) : (
          'Recommend'
        )}
      </Button>{' '}
      {Object.keys(movieData).length > 0 && (
        <Container>
          <MovieCardGroup movieData={movieData} />
        </Container>
      )}
    </div>
  );
}

export default TopRecommendations;


