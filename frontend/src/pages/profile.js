import "../App.css";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MovieCardGroup from '../components/movie-display';
import RatingsCardGroup from "../components/ratings-display";

function Profile() {

    const [curUser, setUser] = useState({
        username: "user not signed in", 
        likes: { movie0: "no liked movies" }, 
        dislikes: { movie0: "no disliked movies" }, 
        favorites: { movie0: "no favorite movies" }, 
        recents: { movie0: "no recent movies" },
        ratings: { movie0: "no rated movies" }
    });

    const [curDetails, setDetails] = useState([])
    const [movieDisplay, setDisplay] = useState(true)
    const [curTab, setTab] = useState("")
    
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

    async function setActiveTab(activeTab) {
        console.log(activeTab);
        console.log(curDetails);
        try {
            setDisplay(true);
            setTab(activeTab);
            if (activeTab === "likes") {
                setDetails(curUser.likes);
            } else if (activeTab === "recents") {
                setDetails(curUser.recents);
            } else if (activeTab === "ratings") {
                setDetails(curUser.ratings);
                setDisplay(false);
            } else {
                setDetails(curUser.favorites);
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
        setDetails(movieData);
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
                    <Button
                        variant={curTab === 'favorites' ? 'primary' : 'secondary'} 
                        onClick={() => setActiveTab('favorites')}
                    >Favorites</Button>
                    <Button
                        variant={curTab === 'likes' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('likes')}
                    >Likes</Button>
                    <Button
                        variant={curTab === 'recents' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('recents')}
                    >Recent</Button>
                    <Button
                        variant={curTab === 'ratings' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('ratings')}
                    >Ratings</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                {movieDisplay && <div className="recommend-wrapper">
                <Col>
                    <MovieCardGroup movieData={curDetails} />
                </Col>
                </div>}
                {!movieDisplay && <div className="recommend-wrapper">
                    <Col>
                        <RatingsCardGroup movieData={curDetails} />
                    </Col>
                </div>}
            </Row>
        </Container>
    );
}

export default Profile;

