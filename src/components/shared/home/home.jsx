import "./home.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import React, {useEffect, useState} from 'react';
import ShopCard from "../../shop/shop-card/shop-card";
import {getStores} from "../../../adapters/storeAdapter";

export function Home(){
    const [items, setItems] = useState([]);

    useEffect(() => {
        getStores().then(response => {
            console.log(response)
            setItems(response.data)
        }).catch(e => {
            console.log("Error getting stores");
        })
    },[])

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
                  return <li className="flex-item" key={index}><ShopCard store={item}></ShopCard></li>
                })}
            </ul>
        </React.Fragment>
    )
}
