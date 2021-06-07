import "./product.description.css";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

export function ProductDescription(){

    const history = useHistory()
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const getProductData = async (productId) => {
        const { data } = await axios.get("https://secret-everglades-98943.herokuapp.com/api/marketplace/products");
        const newProduct = data.filter(product => {return product.id === productId})
        return newProduct[0];
    }
    useEffect(() => {
        getProductData(id).then(response => {
            setProduct(response)
            console.log(response)
        }).catch(e => console.log(e))
    }, []);

    const visitShop = (storeId) => {
        history.push("/shop-view/"+storeId)
    }

    return (
        <div className="product-view">
            <div className="product-view-title">{product.title}</div>
            <div className="product-owner">
                A la venta
            </div>
            <div className="product-view-image">
                <img alt="Product" className="product-view-image-fit" src={product.image_url}/>
            </div>
            {
                product.discount > 0 ?
                    (
                        <div>
                            <div className="product-price-area">
                                <div className="product-price-now">
                                    $ {Math.round(product.price *(1-(product.discount/100)))}
                                </div>
                                <div className="product-price-before">
                                    $ {product.price}
                                </div>
                            </div>
                            <div className="product-shipping">
                                {product.discount}% OFF · Envío gratis
                            </div></div>
                    )
                    :
                    (
                        <div>
                            <div className="product-price-area">
                                <div className="product-price-now">
                                    $ {product.price}
                                </div>
                                <div className="product-price-before">

                                </div>
                            </div>
                            <div className="product-shipping">
                                Envío gratis
                            </div></div>
                    )
            }
            <div className="product-view-cart">
                <button className="product-view-cart-button" onClick={() => visitShop(product.store_id)}>Ir a tienda</button>
            </div>
            <div className="product-view-description">
                <div className="product-view-description-title">
                    Descripción
                </div>
                <div className="product-view-description-body">
                    {product.description}
                </div>
            </div>
        </div>
    );
}
