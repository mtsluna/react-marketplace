import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarR = () => {
    return (        
           <Navbar bg="dark" variant="dark">
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/product">Product</Nav.Link>
                    <Nav.Link href="/product-view">Product view</Nav.Link>
                    <Nav.Link href="/shop-view">Shop view</Nav.Link>
                    </Nav>                    
                </Navbar.Collapse>
            </Navbar> 
        
    )
}

export default NavbarR

