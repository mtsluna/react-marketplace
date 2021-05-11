import React, {useState} from 'react'
import './shop-view.css';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {ProductCard} from "../../product/product-card/product-card";
import {BiPlusMedical} from "react-icons/all";
import {Modal} from "react-bootstrap";
import { useForm } from "react-hook-form";



const ShopView = () => {

    const [items,setItems] = useState([0,1,2,3]);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, errors, handleSubmit, reset } = useForm();
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
            <Jumbotron fluid style={{height: '50vh',
                backgroundImage: `url(https://media4.s-nbcnews.com/i/newscms/2017_26/2053956/170627-better-grocery-store-main-se-539p_80a9ba9c8d466788799ca27568ee0d43.jpg)`, backgroundSize: 'cover' }}>
                <Container>
                    <div className="title">
                        <h1>Mi tienda</h1>
                        <h5>
                            Te presento mis productos
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