import "./product-card.css";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {BiPlusMedical, MdDelete, MdEdit} from "react-icons/all";
import {useForm} from "react-hook-form";
import {forEach} from "react-bootstrap/ElementChildren";
import axios from "axios";
import {useHistory} from "react-router-dom";

export function ProductCard(props) {

    const history = useHistory()
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const {register, errors, handleSubmit, setValue} = useForm();

    const onSubmit = (data) => {
        const editedProduct = {
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            discount: parseInt(data.discount),
            image_url: product.image_url,
            store_id: product.store_id
        }

        if (data.image_url.length != 0) {
            const file = data.image_url[0]
            let formData = new FormData();
            formData.append("image", file)
            uploadImage(formData).then(response => {
                editedProduct.image_url = response

                axios.put("https://secret-everglades-98943.herokuapp.com/api/marketplace/products/" + product.id, editedProduct).then(response => {
                    console.log("Product updated")
                    props.onEdit()
                    handleClose()
                }).catch(e => {
                    console.log("Error updating product")
                })
            }).catch(e => console.log(e))
        } else {
            axios.put("https://secret-everglades-98943.herokuapp.com/api/marketplace/products/" + product.id, editedProduct).then(response => {
                console.log("Product updated")
                props.onEdit()
                handleClose()
            }).catch(e => {
                console.log("Error updating product")
            })
        }

    }
    const onEdit = (productId) => {
        getProductData(productId).then(response => {
            setFormData(response)
            setProduct(response)
            handleShow()
        })
    }


    const getProductData = async (productId) => {

        const {data} = await axios.get("https://secret-everglades-98943.herokuapp.com/api/marketplace/products")
        const productData = data.filter(product => product.id === productId)

        return productData[0]
    }
    const setFormData = (productData) => {
        [{name: 'title', value: productData.title},
            {name: "description", value: productData.description},
            {name: "price", value: productData.price},
            {name: "discount", value: productData.discount}
        ].forEach(({name, value}) => setValue(name, value))
        setProduct(productData)
    }
    // UPLOAD IMAGE
    const uploadImage = async (fileToUpload) => {
        const data = await axios.post("https://secret-everglades-98943.herokuapp.com/api/marketplace/images/upload", fileToUpload)
        const image_url = data.data.url
        return image_url;
    }

    const redirectToStore = (productId) => {
        console.log("Redirecting ")
        history.push("/product-view/" + productId)
    }
    useEffect(() => {
        // Code to change user status
        setUser(true)
    }, [])


    return (
        <div className="product">
            <div className="product-image" onClick={() => redirectToStore(props.product.id)}>
                <img alt="Product" className="product-image-fit" src={props.product.image_url}/>
            </div>
            <div className="product-body">
                <div onClick={() => redirectToStore(props.product.id)}>
                    <b className="product-body-title"> {props.product.title}</b>
                </div>

                {
                    props.product.discount > 0 ?
                        (
                            <div>
                                <div className="product-price-area">
                                    <div className="product-price-now">
                                        $ {Math.round(props.product.price * (1 - (props.product.discount / 100)))}
                                    </div>
                                    <div className="product-price-before">
                                        $ {props.product.price}
                                    </div>
                                </div>
                                <div className="product-shipping">
                                    {props.product.discount}% OFF · Envío gratis
                                </div>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div className="product-price-area">
                                    <div className="product-price-now">
                                        $ {props.product.price}
                                    </div>
                                    <div className="product-price-before">

                                    </div>
                                </div>
                                <div className="product-shipping">
                                    Envío gratis
                                </div>
                            </div>
                        )
                }

                <div className="product-owner">

                </div>
                {
                    props.propietary ?
                        (
                            <div className="actions">
                                <Button style={{borderRadius: 0}} variant="outline-primary" size="sm"
                                        onClick={() => onEdit(props.product.id)}>
                                    <MdEdit/>
                                </Button>{' '}
                                <Button style={{borderRadius: 0}} variant="outline-danger" size="sm"
                                        onClick={() => props.onDelete(props.product.id)}>
                                    <MdDelete/>
                                </Button>
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar producto</Modal.Title>
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
                            />


                            <input
                                placeholder="Descripcion"
                                className="form-control mb-2"
                                name="description"
                                {...register("description", {
                                    required: {value: true, message: 'Ingrese una descripcion'},
                                })}
                            />

                            <input
                                placeholder="Precio"
                                type="number"
                                className="form-control mb-2"
                                name="precio"
                                {...register("price", {
                                    required: "Required",
                                })}
                            />

                            <input
                                placeholder="Descuento"
                                type="number"
                                className="form-control mb-2"
                                name="discount"
                                {...register("discount", {
                                    required: "Required",
                                })}
                            />

                            <input
                                type="file"
                                className="form-control mb-2"
                                name="image_url"
                                {...register("image_url", {})}
                            />
                        </form>
                        {
                            product ?
                                (

                                    <img src={product.image_url} style={{
                                        width: "100%"
                                    }}/>

                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/*<div className="product-end">
                <svg className="product-fav" viewBox="0 0 22 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <g strokeWidth="1.0" fill-rule="evenodd">
                        <path
                            d="M10.977 2.705C11.93 1.618 13.162 1 14.895 1c3.333 0 5.607 2.152 5.607 6.274 0 .08-.002.16-.005.24-.107 2.596-1.876 5.253-4.737 7.892a33.77 33.77 0 0 1-3.165 2.57 32.447 32.447 0 0 1-1.45.983l-.394.243-.394-.243-.009-.005-.021-.014-.08-.05a32.447 32.447 0 0 1-1.34-.914 33.77 33.77 0 0 1-3.165-2.57c-2.86-2.639-4.63-5.296-4.737-7.892A5.839 5.839 0 0 1 1 7.274C1 3.152 3.274 1 6.607 1c1.733 0 2.966.618 3.918 1.705.056.064.137.165.226.282.09-.117.17-.218.226-.282z"/>
                    </g>
                </svg>
            </div>*/}
        </div>
    );
}
