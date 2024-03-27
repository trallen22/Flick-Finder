import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import "../App.css";

function TopRecommendations() {
    const [movieData, setMovieData] = useState([]);

    const fetchRecommendations = () => {
        fetch("/top-recommendations").then((res) => {
            res.json().then((data) => {
                // Setting data from API
                console.log('here');
                console.log(data);
                setMovieData(data);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    };

    return (
        <div className="recommend-wrapper">
            <Button variant="primary" onClick={fetchRecommendations} className="recommend-button">Recommend</Button>
            {(movieData != []) && (
                // <ul className="recommendations">
                // <ListGroup horizontal={'md'}>
                //     {Object.keys(movieData).map((key, index) => (
                //         // <li key={index}>
                //         //     <Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link>
                //         // </li>
                //         <ListGroup.Item>
                //             <Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link>
                //         </ListGroup.Item>
                //     ))}
                // </ListGroup>
                <CardGroup>
                    {Object.keys(movieData).map((key, index) => (
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                        <Card.Body>
                            <Card.Title>{movieData[key].title}</Card.Title>
                            <Card.Text>
                                {movieData[key].description}  
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{movieData[key].genre}</ListGroup.Item>
                            {/* <ListGroup.Item>{movieData[key].keywords}</ListGroup.Item> */}
                            <ListGroup.Item><Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link></ListGroup.Item>
                        </ListGroup>
                        {/* <Card.Body>
                          <Card.Link href="#">Card Link</Card.Link>
                          <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body> */}
                      </Card>
                    ))}
                </CardGroup>
            )}
        </div>
    );
}

export default TopRecommendations;
