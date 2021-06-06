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
import {auth} from "../../../firebaseconfig";



const ShopView = () => {

    const [products,setProducts] = useState([]);
    const [store, setStore] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id } = useParams()
    const [propietary, setPropietary] = useState(false);
    const { register, errors, handleSubmit, reset } = useForm();

   useEffect(() => {
       auth.onAuthStateChanged(data => {
           getStoreData(id).then(response => {
               setStore(response)
               if(data.uid === response.user_id){
                   setPropietary(true)
               }
               getStoreProducts(id).then(response => {
                   setProducts(response)
               })
           })
       })

    }, []);

    const getStoreData = async (storeId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/stores");
        const newStore = data.filter(store => {return store.id === storeId})
        return newStore[0];
    }
    const getStoreProducts = async (storeId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/products")
        const storeProductsArray = data.filter(product => {return product.store_id === storeId})
        return storeProductsArray;
    }

    const onSubmit = (data) => {
        const product = {
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            discount: parseInt(data.discount),
            image_url: "",
            store_id: id
        }

        const file = data.image[0]
        let formData = new FormData();
        formData.append("image", file)


        uploadImage(formData).then(response => {
            product.image_url = response

            axios.post("http://localhost:8080/api/marketplace/products", product).then(response => {

                console.log("Product created")
                getStoreProducts(id).then(response => {
                    setProducts(response)
                })
                 reset()
                 handleClose()

            }).catch(e => {console.log("Error creating store")})
        }).catch(e => console.log(e))



    }
    const handleEdit = () => {
        getStoreProducts(id).then(response => setProducts(response))
    }
    const deleteProduct = async (productId) => {
        const response = await axios.delete("http://localhost:8080/api/marketplace/products/"+productId)
        return response;
    }
    const handleDelete = (productId) => {
        if (window.confirm('¿Deseas eliminar este producto?')) {
            deleteProduct(productId).then(response => {
                getStoreProducts(id).then(response => setProducts(response))
            })
        }
    }

    // UPLOAD IMAGE
    const uploadImage = async (fileToUpload) => {
        const data = await axios.post("http://localhost:8080/api/marketplace/images/upload",fileToUpload)
        const image_url = data.data.url
        return image_url;
    }


    return (
        <div>
            <Jumbotron className="jumbo" fluid style={{height: '40vh',
                backgroundImage: "url("+store.image_url+")", backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
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
                {
                    propietary ?
                        (
                            <Button variant="success" size="sm" onClick={handleShow}>
                                <BiPlusMedical/>
                            </Button>
                        )
                        :
                        (
                            <span></span>
                        )
                }


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
                                name="price"
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
                                name="image"
                                {...register( "image", {
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
            <div className="products-place">
                {
                    products.length > 0 ?
                        (
                            <ul className="flex-container wrap">
                                {
                                    products.map((item,index)=>{
                                        return <li className="flex-item" key={index}>
                                            <ProductCard product={item} propietary={propietary} onEdit={handleEdit} onDelete={handleDelete}/>
                                        </li>
                                    })
                                }
                            </ul>
                        )
                        :
                        (
                            <div className="no-product"><h2>Esta tienda no ha publicado productos</h2></div>
                        )
                }
            </div>

        </div>
    );
}

export default ShopView