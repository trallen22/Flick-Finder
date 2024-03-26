import "../App.css";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function Profile() {
    return (
        <Container className="profile-container">
            <Row>
                <Col className="col-12 mt-4">
                    <Image src="img/headshot.jpeg" id="profile-picture" roundedCircle />
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
