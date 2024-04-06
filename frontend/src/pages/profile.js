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
        favorites: { movie0: "no favorite movies" }, 
        recents: { movie0: "no recent movies"}
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
            } else if (opinion === "recents") {
                setOpinion(curUser.recents);
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
                        <Button variant="secondary" onClick={() => showOpinion("favorites")}>Favorites</Button>
                        <Button variant="secondary" onClick={() => showOpinion("likes")}>Likes</Button>
                        <Button variant="secondary" onClick={() => showOpinion("recents")}>Recent</Button>
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
