import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const RatingsCardGroup = ({ movieData }) => {
    return (
        <div>
            {Object.keys(movieData).map((key, index) => (
                <div key={index} className="row mb-4">
                    <div className="col-9">
                        <Card style={{ flex: '1' }}>
                            <Link to={`/movie/${movieData[key].title}`} style={{ textDecoration: 'none' }}>
                                {movieData[key].posterURL && <Card.Img variant="top" src={movieData[key].posterURL} />}
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '2rem' }}>{movieData[key].title}</Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center text-center">
                        <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                            &#9733; {parseFloat(movieData[key].rating).toFixed(1)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RatingsCardGroup;
