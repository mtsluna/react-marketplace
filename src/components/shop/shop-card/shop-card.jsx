import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./shop-card.css";
import {useHistory} from "react-router-dom";

const ShopCard = (props) => {
    const history = useHistory()
    const store = props.store

    const redirectToStore = (storeId) => {
        console.log("Redirecting ")
        history.push("/shop-view/"+storeId)
    }

    return (
            <Card style={{ width: '18rem' }}>
                <Card.Img className="store-image" variant="top" src={store.image_url} />
                <Card.Body>
                    {
                        store.name !== "" ?
                            (
                                <Card.Title>{store.name}</Card.Title>
                            )
                            :
                            (
                                <Card.Title>Sin nombre</Card.Title>
                            )
                    }
                    {
                        store.address !== "" ?
                            (
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            )
                            :
                            (
                                <Card.Text>
                                    No tiene dirección activa
                                </Card.Text>
                            )
                    }
                    <Button variant="dark" onClick={() => {redirectToStore(store.id)}}>Visitar tienda</Button>
                </Card.Body>
            </Card>        
    );
}

export default ShopCard
