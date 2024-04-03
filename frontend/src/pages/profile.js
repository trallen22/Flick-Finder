import "../App.css";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Profile() {
    return (
        <Container className="profile-container">
            <Row className="profile-header">
                <Col className="col-12 mt-5">
                    <Image src="img/default.jpeg" id="profile-picture" roundedCircle />
                </Col>
                <Col className="col-12">
                    <h1 id="user-name">
                        @Username
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup className="w-100">
                        <Button variant="secondary">Favorites</Button>
                        <Button variant="secondary">Likes</Button>
                        <Button variant="secondary">Recent</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
