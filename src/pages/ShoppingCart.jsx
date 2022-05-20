import React, { useState, useContext } from "react";
import {
  Row,
  Col,
  Space,
  Button,
  Card,
  Modal,
  Divider,
  Input,
  Radio,
  message,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  BarcodeOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import UltrakarneLogo from "../logo_ultrakarne.svg";
import img_chuleta from "../chuleta.jpeg";
import AuthContext from "../AuthContext";
// import img_molida from "../molida.jpeg";
// import img_mayonesa from "../mayonesa.jpeg";

const ShoppingCart = () => {
  const [isModalScaleVisible, setIsModalScaleVisible] = useState(false);
  const [isModalSellVisible, setIsModalSellVisible] = useState(false);

  const { user } = useContext(AuthContext);

  const showModalScale = () => {
    setIsModalScaleVisible(true);
  };

  const showModalSell = () => {
    setIsModalSellVisible(true);
  };

  const okModalScale = () => {
    setIsModalScaleVisible(false);
    message.success("El producto fue agregado al carrito");
  };

  const cancelModalScale = () => {
    setIsModalScaleVisible(false);
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
        <Col md={8} className="layout-left">
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
            <Card>
              <div className="cart-item">
                <div className="cart-item-head">
                  <div className="cart-item-title">
                    Filete de res especial al Vacio
                  </div>
                  <div className="cart-item-price">140.50 Bs.</div>
                </div>
                <div className="cart-item-actions">
                  <div>
                    <Space>
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="small"
                      />
                      <span>10</span>
                      <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        size="small"
                      />
                      <span>Units</span>
                    </Space>
                  </div>
                  <div>
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </Card>
            <h2 className="cart-item-total">Total: 900.50 Bs.</h2>
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
          <div className="container-fluid">
            <div>
              <Input
                placeholder="Buscar por codigo de barra"
                prefix={<BarcodeOutlined />}
              />
            </div>
            <div className="content">
              <Space>
                <Button type="primary" shape="round">
                  Todos
                </Button>
                <Button shape="round">Carne de Res</Button>
                <Button shape="round">Salsas</Button>
                <Button shape="round">Bebidas</Button>
                <Button shape="round">Bebidas</Button>
                <Button shape="round">Bebidas</Button>
              </Space>
            </div>
            <div className="content">
              <Row gutter={[24, 24]}>
                <Col span={8}>
                  <div className="product-item">
                    <div className="product-item-price">10.50 Bs./Kg</div>
                    <a onClick={showModalScale} href="/#">
                      <img
                        src={img_chuleta}
                        alt="Filete de carne de res especial al Vacio"
                        style={{ height: "80px" }}
                      />
                      <div className="product-item-title">
                        Filete de carne de res especial al Vacio
                      </div>
                    </a>
                  </div>
                </Col>
                <Col span={8}>
                  <Card>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </Col>
                <Col span={8}>C</Col>
                <Col span={8}>D</Col>
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
        <div className="modal-scale-weight">1.670 Kg</div>
        <div className="modal-scale-price">Precio calculado: Bs. 46.30</div>
        <Divider />
        <div className="modal-scale-description">
          <h3>Filete de res especial al Vacio</h3>
          <p>Bs. 34.50 el Kilo</p>
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
