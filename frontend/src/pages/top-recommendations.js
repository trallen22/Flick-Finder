import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MovieCardGroup from '../components/movie-display';
import '../App.css';

function TopRecommendations() {
  const [movieData, setMovieData] = useState([]);

  // const fetchRecommendations = () => {
  //   fetch("/top-recommendations").then((res) => {
  //     res.json().then((data) => {
  //       console.log('hello')
  //       console.log(data)
  //       const promises = Object.values(data).map(movie => {
  //         return fetch(`https://api.themoviedb.org/3/search/movie?api_key=1b8a109c8da35481eb8e3f6a4d977ace&query=${encodeURIComponent(movie.title)}`)
  //           .then(res => res.json())
  //           .then(data => {
  //             if (data.results.length > 0) {
  //               return { ...movie, posterURL: `https://image.tmdb.org/t/p/w200${data.results[0].poster_path}` };
  //             } else {
  //               return { ...movie, posterURL: null };
  //             }
  //           });
  //       });

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

  //       Promise.all(promises).then(updatedMovies => {
  //         setMovieData(updatedMovies);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   });
  // };

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

