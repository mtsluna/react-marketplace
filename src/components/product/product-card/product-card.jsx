import "./product-card.css";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {MdDelete, MdEdit} from "react-icons/all";

export function ProductCard(props) {


    const [user, setUser] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Code to change user status
        setUser(true)
    }, [])


    return (
        <div className="product">
            <div className="product-image">
                <img alt="Product" className="product-image-fit" src="https://http2.mlstatic.com/D_NQ_NP_2X_673647-MLA44663818015_012021-F.webp%202x"/>
            </div>
            <div className="product-body">
                <div>
                    <b> Motorola One Fusion 128GB azul océano 4 GB RAM</b>
                </div>
                <div className="product-price-area">
                    <div className="product-price-now">
                        $ 120.999
                    </div>
                    <div className="product-price-before">
                        $ 139.999
                    </div>
                </div>
                <div className="product-shipping">
                    10% OFF · Envío gratis
                </div>
                <div className="product-owner">
                    Vendido por mtsluna
                </div>
                {
                    user ?
                        (
                            <div className="actions">
                                <Button variant="primary" size="sm" onClick={handleShow}>
                                    <MdEdit/>
                                </Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => props.onDelete(props.id)}>
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
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
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
