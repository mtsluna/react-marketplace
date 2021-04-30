import "./home.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import React from 'react';
import ShopCard from "../../shop/shop-card/shop-card";

export function Home(){
    let items = [1,2,3,4];

    return (        
        <React.Fragment>
            <Jumbotron fluid>
                <Container>
                    <h1>Nuevo Marketplace</h1>
                    <p>
                    Aquí podrás ver todas las nuevas tiendas y sus productos.
                    </p>
                </Container>
            </Jumbotron>
            <ul className="flex-container wrap">
                {items.map((item,index)=>{
                  return <li className="flex-item" key={index}><ShopCard></ShopCard></li>
                })}
            </ul>
        </React.Fragment>
    )
}
