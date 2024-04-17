import "../css/home.css";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCardGroup from '../components/movie-display';

function Home() {
    const [selectedGenre, setSelectedGenre] = useState("Action"); // State to store the selected genre

    useEffect(() => {
        fetchMovie(selectedGenre);
        console.log('useEffect')
    }, []);

    function fetchMovie(genre) {
        fetch(`/browse-genre/${genre}`).then((res) => {
            res.json().then((data) => {
                // Handle the fetched data as needed
                console.log(data);
                setSelectedGenre(data)
            })
            .catch((error) => {
                console.log(error);
            })
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
            <div className="home-header">
                <h1>ChatGPT?</h1>
            </div>
            <div className="content">
                <Container>
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
                    <Row>
                        <Col>
                            <h1 className="popular-movies mb-3">Popular Movies</h1>
                        </Col>
                    </Row>
                    <div className="main-content mb-3">
                        <Row>
                            <Col>
                                {Object.keys(selectedGenre).length > 0 && (
                                    
                                    <MovieCardGroup movieData={selectedGenre}/>
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


