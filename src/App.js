import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { ProductCard } from "./components/product/product-card/product-card"
import { ProductDescription } from "./components/product/product-description/product-description";
import { Home } from "./components/shared/home/home";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/product" component={ProductCard}/>
              <Route exact path="/product-view" component={ProductDescription}/>
              <Route exact path="/" component={Home}/>
              <Route component={Home}/>
          </Switch>
      </Router>
  );
}

export default App;
