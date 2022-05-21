import React, { useEffect, useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Space,
  Button,
  Modal,
  Divider,
  Input,
  Radio,
  message,
} from "antd";
import { BarcodeOutlined, PoweroffOutlined } from "@ant-design/icons";
import UltrakarneLogo from "../../../resources/logo_ultrakarne.svg";
import AuthContext from "../../account/context/AuthContext";
import { helpHttp } from "../../../utils/helpHttp";
import { useInterval } from "../../../utils/useInterval";
import {
  URL_GET_SCALE_WEIGHT,
  URL_LIST_CATEGORIES,
  URL_LIST_PRODUCTS,
} from "../../../constants";
import ProductItem from "../components/ProductItem";
import CartItem from "../components/CartItem";
import {
  addPileToCart,
  clearCart,
  delPileFromCart,
  // noData,
  addIsolateToCart,
  delIsolateFromCart,
  readAllProducts,
  readAllCategories,
} from "../actions/shoppingActions";

const ShoppingCart = () => {
  const [isModalScaleVisible, setIsModalScaleVisible] = useState(false);
  const [isModalSellVisible, setIsModalSellVisible] = useState(false);

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { products, categories, cart, total } = state.shopping;
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Products
  const filterProductByCategory = (category_id) => {
    setSelectedCategory(category_id);
  };

  // Scale Weight
  const [productSelected, setProductSelected] = useState({});
  const [delaySyncScale, setDelaySyncScale] = useState(10000);
  const [weightScale, setWeightScale] = useState(0);

  const getWeight = () => {
    helpHttp()
      .get(URL_GET_SCALE_WEIGHT)
      .then((res) => {
        if (!res.err) {
          setWeightScale(res);
        }
      });
  };

  useInterval(getWeight, delaySyncScale);

  // Barcode
  const [barcode, setBarcode] = useState("");
  const handleBarcodeKeyPress = useCallback(
    (event) => {
      const { key, keyCode } = event;
      const keCheck = /^[a-zA-Z0-9]$/;
      if (keyCode === 13) {
        // ENTER
        console.log(barcode);
        addBarcodeItemToCart(barcode);
        setBarcode("");
      } else if (keyCode === 16) {
        // Shift left - Barcode Start key
        setBarcode("");
      } else {
        if (keCheck.test(key)) {
          console.log(key);
          setBarcode(barcode + key);
        }
      }
    },
    [barcode]
  );

  const addBarcodeItemToCart = (code) => {
    const PBARCODE_FIRST_LETTER = "P";
    const PBARCODE_LENGTH = 15;
    const PBARCODE_REGEX =
      /^(P[0-9]{3})([0-9]{3})([0-9]{2})([0-9]{4})([0-9]{2})/;

    let product = null;
    if (code[0] === PBARCODE_FIRST_LETTER && code.length === PBARCODE_LENGTH) {
      const match = code.match(PBARCODE_REGEX);
      const pbarcode_product = match[1];
      product = products.filter(
        (product) => product.barcode === pbarcode_product
      )[0];
      const pbarcode_weight = Number(match[2]) + Number(match[3]) / 100;
      const pbarcode_price = Number(match[4]) + Number(match[5]) / 100;
      if (product) {
        product = {
          ...product,
          quantity: pbarcode_weight,
          price: pbarcode_price,
        };
      }
    } else {
      product = products.filter((product) => product.barcode === code)[0];
    }

    if (product) addToCartButton(product);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleBarcodeKeyPress);

    helpHttp()
      .get(URL_LIST_PRODUCTS)
      .then((res) => {
        if (!res.err) {
          dispatch(readAllProducts(res));
          // setError(null);
        } else {
          // dispatch(noData);
          // setError(res);
        }
      });

    helpHttp()
      .get(URL_LIST_CATEGORIES)
      .then((res) => {
        if (!res.err) {
          dispatch(readAllCategories(res));
          // setError(null);
        } else {
          // dispatch(noData);
          // setError(res);
        }
      });
    return () => {
      window.removeEventListener("keydown", handleBarcodeKeyPress);
    };
  }, [handleBarcodeKeyPress]);

  const addToCartButton = (product) => {
    setProductSelected(product);
    if (product.available) {
      if (product.units === "kg") {
        showModalScale();
      }
      if (product.units === "u") {
        dispatch(addPileToCart(product.id));
        message.success(`El producto "${product.name}" fue agregado`);
      }
    } else {
      dispatch(addIsolateToCart(product));
      message.success(`El producto "${product.name}" fue agregado`);
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
    addWeightItemToCartButton();
    setDelaySyncScale(10000);
    setIsModalScaleVisible(false);
    message.success(`El producto "${productSelected.name}" fue agregado`);
  };

  const showModalSell = () => {
    setIsModalSellVisible(true);
  };

  const okModalSell = () => {
    setIsModalSellVisible(false);
    message.success("La venta se realizo satisfactoriamente");
  };

  const cancelModalSell = () => {
    setIsModalSellVisible(false);
  };

  const config = {
    title: "Cierre de venta",
    content: <div>Deseas cerrar la venta actual</div>,
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col md={8} className="shopping-cart-layout-left">
          <div className="logo">
            <div>
              <img
                src={UltrakarneLogo}
                alt="Ultrakarne Logo"
                style={{ height: "20px" }}
              />
              <div className="logo-close-session">
                <Button
                  shape="circle"
                  icon={<PoweroffOutlined />}
                  size="small"
                  onClick={() => {
                    Modal.confirm(config);
                  }}
                  ghost
                />
              </div>
            </div>
            <div>Hola, {user.first_name}</div>
          </div>
          <div className="cart">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                data={item}
                delOneFromCart={() => dispatch(delPileFromCart(item.id))}
                delAllFromCart={() => dispatch(delPileFromCart(item.id, true))}
                addToCart={() => dispatch(addPileToCart(item.id))}
                delWeightItemFromCart={() =>
                  dispatch(delIsolateFromCart(item.uid))
                }
              />
            ))}
            <h2 className="cart-item-total">Total: Bs. {total}</h2>
          </div>
          <div className="cart-payment">
            <div>Total: 900.50 Bs.</div>
            <div>
              <Button shape="round" ghost onClick={showModalSell}>
                Realizar venta
              </Button>
            </div>
          </div>
        </Col>
        <Col md={16}>
          <div className="shopping-cart-container-fluid">
            <div>
              <Input
                placeholder="Buscar por codigo de barra"
                prefix={<BarcodeOutlined />}
              />
            </div>
            <div className="shopping-cart-content">
              <Space>
                <Button
                  shape="round"
                  type={selectedCategory === 0 ? "primary" : null}
                  onClick={() => filterProductByCategory(0)}
                >
                  Todos
                </Button>
                {categories.map((category) => (
                  <Button
                    shape="round"
                    key={category.id}
                    type={selectedCategory === category.id ? "primary" : null}
                    onClick={() => filterProductByCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </Space>
            </div>
            <div className="content">
              <Row gutter={[24, 24]}>
                {products.map(
                  (product) =>
                    product.available &&
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
          </div>
        </Col>
      </Row>
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
      <Modal
        visible={isModalSellVisible}
        title="Realizar Venta"
        onOk={okModalSell}
        onCancel={cancelModalSell}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            onClick={okModalSell}
          >
            Realizar venta
          </Button>,
        ]}
      >
        <div className="modal-scale-weight">Total: Bs. 190.50</div>
        <Divider />
        <div className="modal-sell-payment-method">
          <h3>Seleccione el metodo de pago:</h3>
          <div style={{ textAlign: "center" }}>
            <Radio.Group>
              <Radio.Button value="efectivo">Efectivo</Radio.Button>
              <Radio.Button value="tarjeta">Tarjeta</Radio.Button>
              <Radio.Button value="qr">Pago QR</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
