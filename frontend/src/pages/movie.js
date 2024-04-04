import "../../src/movie.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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

    const [movie_rating, setRating] = useState(0);

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

    async function handleDislike(){
        console.log('disliked')
		try { 
			const response = await fetch(`/movie/${movieDetails.title}/opinion`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					opinion: 2
				})
			});
	
			// Handle the response, e.g., check if login was successful
			if (response.ok) {
				console.log('disike successful');
			} else {
				console.error('disike failed');
			}
		} catch (error) {
			console.error('Error during dislike:', error);
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

    return (
        <Container className="Movie">
            <div className="App-header">
                <Row>
                    <Col>
                        <h1>{movieDetails.title}</h1>
                        <p>{movieDetails.description}</p>
                        <p>{movieDetails.genre}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                    <Col>
                        <Button variant="primary" onClick={handleLike} className="like-button">Like</Button>
                    </Col>
                    <Col>

                        <Button variant="primary" onClick={handleDislike} className="dislike-button"n>Dislike</Button>
                    </Col>
                </Row>
                
            </div>
        </Container>
    );
}
 
export default Movie;