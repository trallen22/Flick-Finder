import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const RatingsCardGroup = ({ movieData }) => {
    return (
        <div>
        {Object.keys(movieData).map((key, index) => (
            <div key={index} className="row mb-4">
                <div className="col-6" style={{ display: 'flex' }}>
                    <Card style={{ flex: '1' }}>
                        <Link to={`/movie/${movieData[key].title}`} style={{ textDecoration: 'none' }}>
                            {movieData[key].posterURL && <Card.Img variant="top" src={movieData[key].posterURL} />}
                            <Card.Body>
                                <Card.Title>{movieData[key].title}</Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Rating: {movieData[key].rating}</div>
                </div>
                
            </div>
        ))}
        </div>
    );
};

export default RatingsCardGroup;
