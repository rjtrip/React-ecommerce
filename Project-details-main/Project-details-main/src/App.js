import React, { Component } from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AddToCart from "./Components/AddToCart/AddToCart";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProductDetails />}/>
              <Route path="/orders" element={<AddToCart />}/>
            </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
