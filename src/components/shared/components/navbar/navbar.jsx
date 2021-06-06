import React, {useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {auth} from "../../../../firebaseconfig";
import {useHistory} from "react-router-dom";
import axios from "axios";

const NavbarR = () => {
    const [user, setUser] = useState(null)
    const history = useHistory()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUser(user)
            }
        })
    },[])
    const logout = () => {
        auth.signOut().then(response => {
            setUser(null)
            history.push("/")
        }).catch(e => {console.log(e)})
    }
    const myShopRedirect = () => {
        getStoreData().then(store => {
            console.log(store)
            if(store !== undefined){
                history.push("/shop-view/"+store.id)
            }else{
                history.push("/profile")
                alert("Debes colocar los datos de tu tienda en tu perfil, para poder crear productos y ver tu tienda")
            }
        })
    }

    const getStoreData = async (storeId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/stores");
        const newStore = data.filter(store => {return store.user_id === user.uid})
        console.log(newStore)
        return newStore[0];
    }

    return (
           <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                   ShopCenter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/product">Product</Nav.Link>
                    <Nav.Link href="/product-view">Product view</Nav.Link>
                    <Nav.Link href="/shop-view">Shop view</Nav.Link>

                    </Nav>
                    <Nav>
                        {
                            !user ?
                                (
                                    <Nav>
                                        <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                                        <Nav.Link href="/register">Registrarse</Nav.Link>
                                    </Nav>

                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </Nav>
                    <Nav>
                        {
                            user ?
                                (
                                    <Nav>
                                        <Nav.Link onClick={() => myShopRedirect()}>Mi tienda</Nav.Link>
                                        <Nav.Link href="/profile">Perfil</Nav.Link>
                                        <Nav.Link onClick={() => logout()}>Cerrar sesion</Nav.Link>
                                    </Nav>

                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
    )
}

export default NavbarR

