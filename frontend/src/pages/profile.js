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
