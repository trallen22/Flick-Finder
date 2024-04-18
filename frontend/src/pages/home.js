import "../css/home.css";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import MovieCardGroup from '../components/movie-display';

function Home() {
    const [selectedGenre, setSelectedGenre] = useState("Action"); // State to store the selected genre
    const [isLoading, setIsLoading] = useState(true); // State to track data loading

    useEffect(() => {
        fetchMovie(selectedGenre);
        console.log('useEffect')
    }, []);

    function fetchMovie(genre) {
        setIsLoading(true); // Set loading state to true when fetching data
        fetch(`/browse-genre/${genre}`).then((res) => {
            res.json().then((data) => {
                console.log(data);
                setSelectedGenre(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false when data fetching is complete
            });
        });
    }

    // Function to handle genre selection
    function handleGenreChange(event) {
        console.log('handleChange')
        const selectedGenre = event.target.value;
        setSelectedGenre(selectedGenre); // Update the selected genre in state
        fetchMovie(selectedGenre); // Call the fetchMovie function with the selected genre
    }
    
    return (
        <>
            <div className="content">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="popular-movies m-3">Popular Movies</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} className="mb-3">
                            <Form.Select aria-label="Genre" onChange={handleGenreChange}>
                                <option >Select Genre</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="animation">Animation</option>
                                <option value="comedy">Comedy</option>
                                <option value="crime">Crime</option>
                                <option value="documentary">Documentary</option>
                                <option value="family">Family</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="history">History</option>
                                <option value="music">Music</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="science_fiction">Sci-Fi</option>
                                <option value="thriller">Thriller</option>
                                <option value="war">War</option>
                                <option value="western">Western</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <div className="main-content mb-3">
                        <Row>
                            <Col>
                                {isLoading ? (
                                    // Display spinner when data is loading
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden"
                                        animation="border"
                                        variant="light">Loading...</span>
                                    </Spinner>
                                ) : (
                                    // Display MovieCardGroup when data is loaded
                                    Object.keys(selectedGenre).length > 0 && (
                                        <MovieCardGroup movieData={selectedGenre}/>
                                    )
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Home;



{/* <Col md={2} className="mb-3">
                            <Form.Select aria-label="Genre" onChange={handleGenreChange}>
                                <option >Select Genre</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="animation">Animation</option>
                                <option value="comedy">Comedy</option>
                                <option value="crime">Crime</option>
                                <option value="documentary">Documentary</option>
                                <option value="family">Family</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="history">History</option>
                                <option value="music">Music</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="science_fiction">Sci-Fi</option>
                                <option value="thriller">Thriller</option>
                                <option value="war">War</option>
                                <option value="western">Western</option>
                            </Form.Select>
                        </Col> */}