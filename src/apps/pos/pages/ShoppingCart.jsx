import React, { useState } from "react";
import { Row, Col } from "antd";
import CartList from "../components/CartList";
import BarcodeReader from "../components/BarcodeReader";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import Sell from "../components/Sell";
import AppHeader from "../../../components/AppHeader";
import ClosingControl from "../components/ClosingControl";

const ShoppingCart = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const config = {
    title: "Cierre de venta",
    content: <div>Deseas cerrar la venta actual</div>,
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col md={8} className="shopping-cart-layout-left">
          <AppHeader />
          <CartList />
          <Sell />
        </Col>
        <Col md={16}>
          <div className="shopping-cart-container-fluid">
            <div className="shopping-cart-header-actions">
              <BarcodeReader />
              <ClosingControl />
            </div>
            <div className="shopping-cart-content">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="content">
              <ProductList selectedCategory={selectedCategory} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingCart;
