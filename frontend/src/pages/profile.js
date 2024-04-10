import "../App.css";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MovieCardGroup from '../components/movie-display';

function Profile() {

    const [curUser, setUser] = useState({
        username: "user not signed in", 
        likes: { movie0: "no liked movies" }, 
        dislikes: { movie0: "no disliked movies" }, 
        favorites: { movie0: "no favorite movies" }
    });

    const [curOpinion, setOpinion] = useState([])
    
    useEffect(() => {
        fetch("/profile").then((res) => {
            res.json().then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    }, []);

    async function showOpinion(opinion) {
        console.log(opinion);
        console.log(curOpinion);
        try {
            if (opinion === "likes") {
                setOpinion(curUser.likes);
            } else if (opinion === "dislikes") {
                setOpinion(curUser.dislikes);
            } else {
                setOpinion(curUser.favorites);
            }
        } catch (error) {
            console.error('Error during changing opinion')
        }
    }

    // Function to fetch movie data and retrieve poster path
    const fetchMovieData = async (movieTitle) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1b8a109c8da35481eb8e3f6a4d977ace&query=${encodeURIComponent(movieTitle)}`);
            const data = await response.json();
            if (data.results.length > 0) {
                return { ...data.results[0], posterURL: `https://image.tmdb.org/t/p/w200${data.results[0].poster_path}` };
            } else {
                return { title: movieTitle, posterURL: null };
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
            return null;
        }
    };

    // Function to fetch poster paths for all movies in opinion
    const fetchPosterPaths = async (opinion) => {
        const movieKeys = Object.values(opinion);
        const movieDataPromises = movieKeys.map(movieTitle => fetchMovieData(movieTitle));
        const movieData = await Promise.all(movieDataPromises);
        setOpinion(movieData);
    };

    return (
        <Container className="profile-container">
            <Row className="profile-header">
                <Col className="col-12 mt-5">
                    <Image src="img/default.jpeg" id="profile-picture" roundedCircle />
                </Col>
                <Col className="col-12">
                    <h1 id="user-name">
                        {curUser.username}
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup className="w-100">
                        <Button variant="secondary" onClick={() => showOpinion("favorites")}>Favorites</Button>
                        <Button variant="secondary" onClick={() => showOpinion("likes")}>Likes</Button>
                        <Button variant="secondary" onClick={() => showOpinion("dislikes")}>Recent</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <div className="recommend-wrapper">
                    <Col>
                        <MovieCardGroup movieData={curOpinion} />
                    </Col>
                </div>
            </Row>
        </Container>
    );
}

export default Profile;

