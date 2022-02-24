import React, { Component } from "react";
import "./AddToCart.css";
import cartImg from "../Image/download.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

class AddToCart extends Component {

  constructor() {
    super();
    this.state = JSON.parse(localStorage.getItem("item"));

    this.total = this.state.reduce(function(prev, cur) {
      return prev + cur.total;
    }, 0);
  }


  render() {
    return (
      <div className="AddedToCart">
        <div className="cartLeft">
          <div className="cart">
            <div className="cartHead">
              <h2>Shopping Cart</h2>
              <a href="/">Back to Home</a>
            </div>
            {this.state.map((data) => {
              return (
                <div className="cartBody row">
                  <div className="left">
                    <img src={data.src} alt="" />
                  </div>
                  <div className="body">
                    <h4>
                        {data.title}
                    </h4>
                    <h5 className="d-none">$229</h5>
                    <div className="inDesktop options">
                      <select name="" id="">
                        <option value="">Qty: {data.qty}</option>
                      </select>
                    </div>
                  </div>
                  <div className="price">
                    <h3>
                      <b>${data.total}</b>
                    </h3>
                  </div>
                  <div className="inMobile d-none options">
                    <select name="" id="">
                      <option value="">Qty:1</option>
                    </select>
                  </div>
                </div>
              );
            })}
            <div className="cartFooter">
              <h3>
                Subtotal: <b>${this.total}</b>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToCart;
