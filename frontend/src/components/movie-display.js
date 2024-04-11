import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';

const MovieCardGroup = ({ movieData }) => {
  return (
    <CardGroup>
      {Object.keys(movieData).map((key, index) => (
        <Link key={index} to={`/movie/${movieData[key].title}`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '16rem', marginBottom: '20px' }}>
            {movieData[key].posterURL && <Card.Img variant="top" src={movieData[key].posterURL} />}
            {/* <Card.Body>
              <Card.Title>{movieData[key].title}</Card.Title>
               <Card.Text>{movieData[key].description}</Card.Text> 
            </Card.Body>*/}
          </Card>
        </Link>
      ))}
    </CardGroup>
  );
};

export default MovieCardGroup;

