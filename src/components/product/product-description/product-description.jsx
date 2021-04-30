import "./product.description.css";

export function ProductDescription(){
    return (
        <div className="product-view">
            <div className="product-view-title">Motorola One Fusion 128GB azul océano 4 GB RAM</div>
            <div className="product-owner">
                Vendido por mtsluna
            </div>
            <div className="product-view-image">
                <img alt="Product" className="product-view-image-fit" src="https://http2.mlstatic.com/D_NQ_NP_2X_673647-MLA44663818015_012021-F.webp%202x"/>
            </div>
            <div className="product-view-price-area">
                <div className="product-view-price-now">
                    $ 120.999
                </div>
                <div className="product-view-price-before">
                    $ 139.999
                </div>
            </div>
            <div className="product-view-shipping">
                10% OFF · Envío gratis
            </div>
            <div className="product-view-cart">
                <button className="product-view-cart-button">AÑADIR AL CARRITO</button>
            </div>
            <div className="product-view-description">
                <div className="product-view-description-title">
                    Descripción
                </div>
                <div className="product-view-description-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
    );
}
