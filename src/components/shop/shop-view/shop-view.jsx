import React from 'react'
import './shop-view.css';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";


const ShopView = () => {
    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1>Mi tienda</h1>
                    <p>
                        Te presento mis productos.
                    </p>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default ShopView