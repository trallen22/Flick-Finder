import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MovieCardGroup from '../components/movie-display';
import '../App.css';

function TopRecommendations() {
  const [movieData, setMovieData] = useState([]);

  const fetchRecommendations = () => {
    fetch("/top-recommendations").then((res) => {
        res.json().then((data) => {
            setMovieData(data);
        })
        .catch((error) => {
            console.log(error);
        })
    });
    };


  console.log(movieData);
  console.log(Object.keys(movieData).length);
  return (
    <div className="recommend-wrapper">
      <Button variant="primary" onClick={fetchRecommendations} className="recommend-button">Recommend</Button>
      {Object.keys(movieData).length > 0 && (
        <Container>
          <MovieCardGroup movieData={movieData}/>
        </Container>
      )}
    </div>
  );
}

export default TopRecommendations;

