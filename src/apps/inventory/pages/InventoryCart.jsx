import React, { useState } from "react";
import { Row, Col } from "antd";
import CartList from "../../common/components/CartList";
import ProductList from "../../common/components/ProductList";
import Sell from "../../common/components/Sell";
import AppHeader from "../../../components/AppHeader";

const InventoryCart = () => {
  return (
    <div>
      <Row>
        <Col md={8} className="shopping-cart-layout">
          <div className="vbox-container">
            <div className="vbox vbox-head">
              <AppHeader />
            </div>
            <div className="vbox vbox-cart">
              <CartList />
            </div>
            <div className="vbox vbox-sell">
              <Sell />
            </div>
          </div>
        </Col>
        <Col md={16}>
          <ProductList />
        </Col>
      </Row>
    </div>
  );
};

export default InventoryCart;
