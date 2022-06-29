import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Modal, Divider, message } from "antd";
import { useInterval } from "../../../utils/useInterval";
import { FRONT_REDIRECT_UNAUTHORIZED } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { URL_GET_SCALE_WEIGHT, URL_LIST_PRODUCTS } from "../../../constants";
import ProductItem from "../components/ProductItem";
import {
  addPileToCart,
  addIsolateToCart,
  readAllProducts,
} from "../actions/shoppingActions";
import { apiPrivate } from "../../../core/apiCall";
import BarcodeReader from "../components/BarcodeReader";
import CategoryFilter from "../components/CategoryFilter";
import ClosingControl from "../components/ClosingControl";

const ProductList = () => {
  const [isModalScaleVisible, setIsModalScaleVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { products } = state.shopping;

  // Scale Weight
  const [productSelected, setProductSelected] = useState({});
  const [delaySyncScale, setDelaySyncScale] = useState(10000);
  const [weightScale, setWeightScale] = useState(0);

  const getWeight = () => {
    apiPrivate
      .get(URL_GET_SCALE_WEIGHT)
      .then((res) => {
        setWeightScale(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 0)
          navigate(FRONT_REDIRECT_UNAUTHORIZED);
      });
  };

  useInterval(getWeight, delaySyncScale);

  useEffect(() => {
    apiPrivate
      .get(URL_LIST_PRODUCTS)
      .then((res) => {
        dispatch(readAllProducts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const addToCartButton = (product) => {
    // console.log(product);
    setProductSelected(product);
    if (product.available) {
      if (product.units === "kg") {
        showModalScale();
      }
      if (product.units === "u") {
        dispatch(addPileToCart(product.id));
        message.success(`El producto "${product.name}" fue agregado`, 0.3);
      }
    } else {
      dispatch(addIsolateToCart(product));
      message.success(`El producto "${product.name}" fue agregado`, 0.3);
    }
  };

  const addWeightItemToCartButton = () => {
    const data = {
      ...productSelected,
      quantity: weightScale,
    };
    dispatch(addIsolateToCart(data));
  };

  const showModalScale = () => {
    setDelaySyncScale(1000);
    setIsModalScaleVisible(true);
  };

  const cancelModalScale = () => {
    setDelaySyncScale(10000);
    setIsModalScaleVisible(false);
  };

  const okModalScale = () => {
    if (weightScale < 0.01) {
      message.error("El producto debe pesar al menos 1 gramo");
      return;
    }
    addWeightItemToCartButton();
    setDelaySyncScale(10000);
    setIsModalScaleVisible(false);
    message.success(`El producto "${productSelected.name}" fue agregado`, 0.3);
  };

  return (
    <div>
      <div className="vbox-container">
        <div className="vbox vbox-filter">
          <div className="shopping-cart-header-actions">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ClosingControl />
          </div>
        </div>
        <div className="vbox vbox-products">
          <Row gutter={[24, 24]} className="ddshopping-cart-content-products">
            {products.map(
              (product) =>
                product.available &&
                !product.vacuum_packed &&
                (product.category === selectedCategory ||
                  selectedCategory === 0) && (
                  <Col span={8} key={product.id}>
                    <ProductItem
                      key={product.id}
                      data={product}
                      addToCart={() => addToCartButton(product)}
                    />
                  </Col>
                )
            )}
          </Row>
        </div>
        <div className="vbox vbox-barcode">
          <BarcodeReader addToCart={addToCartButton} />
        </div>
      </div>

      <Modal
        visible={isModalScaleVisible}
        title="Calculo de precio"
        onOk={okModalScale}
        onCancel={cancelModalScale}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            onClick={okModalScale}
          >
            Agregar
          </Button>,
        ]}
      >
        <div className="modal-scale-weight">{weightScale} Kg</div>
        <div className="modal-scale-price">
          Precio calculado: Bs.
          {(weightScale * productSelected.price).toFixed(1)}0
        </div>
        <Divider />
        <div className="modal-scale-description">
          <h3>{productSelected.name}</h3>
          <p>Bs. {productSelected.price} el Kilo</p>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
