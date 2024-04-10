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

    const [curOpinion, setOpinion] = useState([])
    const [movieDisplay, setDisplay] = useState(true)
    
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
        console.log(curOpinion);
        try {
            setDisplay(true);
            if (activeTab === "likes") {
                setOpinion(curUser.likes);
            } else if (activeTab === "recents") {
                setOpinion(curUser.recents);
            } else if (activeTab === "ratings") {
                setOpinion(curUser.ratings);
                setDisplay(false);
            } else {
                setOpinion(curUser.favorites);
            }
        } catch (error) {
            console.error('Error during changing opinion')
        }
    }

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
                        <Button variant="secondary" onClick={() => setActiveTab("favorites")}>Favorites</Button>
                        <Button variant="secondary" onClick={() => setActiveTab("likes")}>Likes</Button>
                        <Button variant="secondary" onClick={() => setActiveTab("recents")}>Recent</Button>
                        <Button variant="secondary" onClick={() => setActiveTab("ratings")}>Ratings</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                {movieDisplay && <div className="recommend-wrapper">
                    <Col>
                        <MovieCardGroup movieData={curOpinion} />
                    </Col>
                </div>}
                {!movieDisplay && <div className="recommend-wrapper">
                    <Col>
                        <RatingsCardGroup movieData={curOpinion} />
                    </Col>
                </div>}
            </Row>
        </Container>
        
    );
}

export default Profile;
