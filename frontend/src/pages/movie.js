import "../App.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
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

    const [posterPath, setPosterPath] = useState('');

    // const [movie_rating, setRating] = useState(0);

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
    
    useEffect(() => {
        if (movieDetails.id) {
            getPoster(movieDetails);
        }
    }, [movieDetails]);
    


    function getPoster(movies){
        fetch(`https://api.themoviedb.org/3/movie/${movies.id}?api_key=1b8a109c8da35481eb8e3f6a4d977ace&language=en-US`)
              .then(res => res.json())
              .then(data => {
                console.log(data)
                setPosterPath(`https://image.tmdb.org/t/p/w200${data.poster_path}`)
                //posterURL: `https://image.tmdb.org/t/p/w200${data.poster_path}`
              });

    }

    async function handleLike(){
        console.log('Liked')
		try { 
			const response = await fetch(`/movie/${movieDetails.title}/opinion`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					opinion: 3
				})
			});
	
			// Handle the response, e.g., check if login was successful
			if (response.ok) {
				console.log('Like successful');
			} else {
				console.error('Like failed');
			}
		} catch (error) {
			console.error('Error during like:', error);
		}
    }

    async function handleFavorite(){
        console.log('disliked')
		try { 
			const response = await fetch(`/movie/${movieDetails.title}/opinion`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					opinion: 4
				})
			});
	
			// Handle the response, e.g., check if login was successful
			if (response.ok) {
				console.log('fav successful');
			} else {
				console.error('fav failed');
			}
		} catch (error) {
			console.error('Error during fav:', error);
		}
    }

    async function handleRating(rating){
        //movie/<movieName>/rating
        console.log('rated')
        console.log(rating)
		try { 
            console.log(movieDetails)
            //not sure where the extra movie is coming from in this call
			const response = await fetch(`${movieDetails.title}/rating`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rating: rating
				})
			});
	
			// Handle the response, e.g., check if login was successful
			if (response.ok) {
				console.log('rating successful');
			} else {
				console.error('rating failed');
			}
		} catch (error) {
			console.error('Error during rating:', error);
		}
    }

    console.log(posterPath)
    console.log(movieDetails)

    return (
        <Container className="Movie">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="movie-header">
                        <h1>{movieDetails.title}</h1>
                        <Row>
                            <Col>
                                {posterPath && <img variant="top" src={posterPath} style={{ width: '16rem' }} />}
                            </Col>
                            <Col className="d-flex flex-column text-start justify-content-end">
                                <h5 className="text-start">Director: {movieDetails.director}</h5>
                                <h5 className="text-start">Genre: {movieDetails.genre[0]}</h5>
                                <h5 className="text-start">Runtime: {movieDetails.runtime} minutes</h5>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <p></p>
                                <h5 className="text-start">Summary:</h5>
                                <h5 className="text-start">{movieDetails.description}</h5>
                            </Col>
                        </Row>
                        <div className="buttons-container">
                            <Row>
                                <Col xs={{ span: 12, offset: 1 }} sm={3} lg={2}>
                                    <DropdownButton id="dropdown-basic-button" title="Rate">
                                    <Dropdown.Item onClick={() => { handleRating(5);}}>5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(4.5);}}>4.5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(4);}}>4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(3.5);}}>3.5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(3);}}>3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(2.5);}}>2.5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(2);}}>2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(1.5);}}>1.5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(1);}}>1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleRating(0.5);}}>0.5</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col xs={{span: 12, offset: 1}} sm={2} lg={1}>
                                    <Button variant="primary" onClick={handleLike} className="like-button">&hearts;</Button>
                                </Col>
                                <Col xs={{span: 12, offset: 1}} sm={2} lg={1}>
                                    <Button variant="primary" onClick={handleFavorite} className="fav-button">&#9733;</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Movie;
