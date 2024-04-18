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

    console.log(movieDetails.genre)

    return (
        <Container className="Movie">
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <div className="movie-header">
                <h1>{movieDetails.title}</h1>
                <Row>
                    <Col>
                        <h5 className="text-start">Director: {movieDetails.director}</h5>
                        <h5 className="text-start">Genre: {movieDetails.genre[0]}</h5>
                        <h5 className="text-start">Runtime: {movieDetails.runtime} minutes</h5>
                    </Col>
                    <Col>
                        <h5 className="text-start">Summary:</h5>
                        <h5 className="text-start">{movieDetails.description}</h5>
                    </Col>

                </Row>
                {/* <h5>Director: {movieDetails.director}</h5> */}
                {/* <p>Cast: {movieDetails.cast[0]}</p> */}
                {/* <h5>Summary: {movieDetails.description}</h5> */}
                <div className="buttons-container">
                <Row>
                    <Col xs={12} sm={3} lg={2}>
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
                    <Col xs={12} sm={2} lg={1}>
                        <Button variant="primary" onClick={handleLike} className="like-button">&hearts;</Button>
                    </Col>
                    <Col xs={12} sm={2} lg={1}>
                        <Button variant="primary" onClick={handleFavorite} className="fav-button">&#9733;</Button>
                    </Col>
                    {/* <Col className="text-end align-bottom">
                        <h4>Runtime: {movieDetails.runtime} minutes</h4>
                    </Col> */}
                </Row>
                </div>
            </div>
            </Col>
        </Row>
        </Container>

    );
}
 
export default Movie;