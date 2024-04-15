import "../css/home.css";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
function Home() {
    
    return (
        <>
            <div className="home-header">
                <h1>ChatGPT?</h1>
            </div>
            <div className="content">
                <Container>
                    <div className="popular-movies">
                        <h3>Popular Movies</h3>
                        {/* Add your popular movies list here */}
                    </div>
                    <div className="main-content">
                        {/* Add your main content here */}
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Home;

