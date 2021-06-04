import React, {useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {auth} from "../../../../firebaseconfig";
import {useHistory} from "react-router-dom";

const NavbarR = () => {
    const [user, setUser] = useState(null)
    const history = useHistory()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUser(user.email)
            }
        })
    },[])
    const logout = () => {
        auth.signOut().then(response => {
            setUser(null)
            history.push("/")
        }).catch(e => {console.log(e)})
    }
    return (        
           <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                Marketplace
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
                                        <Nav.Link href="/shop-view">Mi tienda</Nav.Link>
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

