import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./shop-card.css";

const ShopCard = () => {
    return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://latinoamerica-retail.com/wp-content/uploads/2019/11/2337/estaods-unidos-toys-r-us-is-back-heres-a-look-inside-its-first-new-store.jpg" />
                <Card.Body>
                    <Card.Title>Tienda</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                    <Button variant="dark">Visitar tienda</Button>
                </Card.Body>
            </Card>        
    );
}

export default ShopCard
