import "./home.css";
import { Link } from "react-router-dom";

export function Home(){
    return (
        <div>
            Mocks:
            <div>
                <Link to="/product">Product</Link>
            </div>
            <div>
                <Link to="/product-view">Product View</Link>
            </div>
        </div>
    )
}
