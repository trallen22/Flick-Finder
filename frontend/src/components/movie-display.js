import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const MovieCardGroup = ({ movieData }) => {
  return (
    <CardGroup>
      {Object.keys(movieData).map((key, index) => (
        <Card key={index} style={{ width: '20%' }}>
          {movieData[key].posterURL && <Card.Img variant="top" className="movie-poster" src={movieData[key].posterURL} />}
          <Card.Body>
            <Card.Title>{movieData[key].title}</Card.Title>
            <Card.Text>{movieData[key].description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{movieData[key].genre}</ListGroup.Item>
            {/* <ListGroup.Item>{movieData[key].keywords}</ListGroup.Item> */}
            <ListGroup.Item><Link to={`/movie/${movieData[key].title}`}>{movieData[key].title}</Link></ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </CardGroup>
  );
};

export default MovieCardGroup;
