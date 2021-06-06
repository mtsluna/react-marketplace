import React, {useEffect, useState} from 'react'
import './shop-view.css';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {ProductCard} from "../../product/product-card/product-card";
import {BiPlusMedical} from "react-icons/all";
import {Modal} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {getStores} from "../../../adapters/storeAdapter";
import axios from "axios";



const ShopView = () => {

    const [items,setItems] = useState([0,1,2,3]);
    const [store, setStore] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id } = useParams()
    const { register, errors, handleSubmit, reset } = useForm();

   useEffect(() => {
        getStoreData(id).then(response => {
            setStore(response)
            console.log(store)
        })

    }, []);

    const getStoreData = async (storeId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/stores");
        const newStore = data.filter(store => {return store.id === storeId})
        console.log(newStore)
        return newStore[0];
    }
    const onSubmit = (data) => {
        const product = {
            title: data.title,
            description: data.description,
            price: data.price,
            discount: data.discount
        }
        console.log(product);
        reset()
        handleClose()

    }

    const handleDelete = (itemId) => {
        if (window.confirm('¿Deseas eliminar este producto?')) {
            const itemsNew = items.filter(item => item !== itemId);
            console.log(itemsNew)
            setItems( itemsNew );
        }
    }

    return (
        <div>
            <Jumbotron className="jumbo" fluid style={{height: '40vh',
                backgroundImage: "url("+store.image_url+")", backgroundSize: "cover"}}>
                <Container>
                    <div className="jumbo-title">
                        <h1>
                        {
                        store ?
                            (
                                store.name
                            )
                            :
                            (
                                "Mi tienda"
                            )
                        }
                        </h1>
                        <h5>
                            {store.address}
                        </h5>
                    </div>
                </Container>
            </Jumbotron>
            <div className="new-product-bar">
                <Button variant="success" size="sm" onClick={handleShow}>
                    <BiPlusMedical/>
                </Button>

                {/*MODAL*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir nuevo producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder="Nombre"
                                className="form-control mb-2"
                                name="title"
                                {...register("title", {
                                    required: "This is required."
                                })}
                            ></input>


                            <input
                                placeholder="Descripcion"
                                className="form-control mb-2"
                                name="description"
                                {...register("description", {
                                    required: {value:true, message: 'Ingrese una descripcion'},
                                })}
                            ></input>

                            <input
                                placeholder="Precio"
                                type="number"
                                className="form-control mb-2"
                                name="precio"
                                {...register("price", {
                                    required: "Required",
                                })}
                            ></input>

                            <input
                                placeholder="Descuento"
                                type="number"
                                className="form-control mb-2"
                                name="discount"
                                {...register("discount", {
                                    required: "Required",
                                })}
                            ></input>

                            <input
                                type="file"
                                className="form-control mb-2"
                                name="image_url"
                                {...register( "image_url", {
                                    required: "Required"
                                })}
                            ></input>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)} type="submit">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ul className="flex-container wrap">
                {
                    items.map((item,index)=>{
                    return <li className="flex-item" key={index}>
                        <ProductCard id={item} onDelete={handleDelete}/>
                    </li>
                    })
                }
            </ul>
        </div>
    );
}

export default ShopView