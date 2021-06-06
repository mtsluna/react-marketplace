import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { ProductCard } from "./components/product/product-card/product-card"
import { ProductDescription } from "./components/product/product-description/product-description";
import { Home } from "./components/shared/home/home";
import Navbar from "./components/shared/components/navbar/navbar";
import React from 'react';
import ShopView from "./components/shop/shop-view/shop-view";
import Footer from "./components/shared/components/footer/footer";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";


function App() {
  return (                  
      <Router>
          <Navbar/>
          <div className="content">
              <Switch>
                  <Route exact path="/product" component={ProductCard}/>
                  <Route exact path="/product-view/:id" component={ProductDescription}/>
                  <Route exact path="/shop-view/:id" component={ShopView}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/profile" component={Profile}/>
                  <Route exact path="/" component={Home}/>
                  <Route component={Home}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
