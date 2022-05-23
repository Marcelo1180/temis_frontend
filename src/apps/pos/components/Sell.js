import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Divider, Radio, message } from "antd";
import { apiPrivate } from "../../../core/apiCall";
import { clearCart, readAllPaymentMethods } from "../actions/shoppingActions";
import { URL_CREATE_SELL, URL_LIST_PAYMENT_METHODS } from "../../../constants";
import copyArrayObjectByKeys from "../../../utils/copyArrayObjectByKeys";

const Sell = () => {
  const [isModalSellVisible, setIsModalSellVisible] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { total, payment_methods, cart } = state.shopping;
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(null);

  useEffect(() => {
    apiPrivate
      .get(URL_LIST_PAYMENT_METHODS)
      .then((res) => {
        dispatch(readAllPaymentMethods(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showModalSell = () => {
    setIsModalSellVisible(true);
  };

  const okModalSell = () => {
    if (total < 1) {
      message.error("Debe vender al menos un producto");
      return;
    }
    if (!paymentMethodSelected) {
      message.error("Debe seleccionar un metodo de pago");
      return;
    }
    const product_orders = copyArrayObjectByKeys(
      cart,
      ["id", "price", "quantity"],
      { id: "product" }
    );

    const data = {
      order: {
        total,
        payment_method: paymentMethodSelected,
        author: 1,
      },
      product_orders,
    };
    apiPrivate
      .post(URL_CREATE_SELL, data)
      .then((res) => {
        setPaymentMethodSelected(null);
        setIsModalSellVisible(false);
        dispatch(clearCart());
        message.success("La venta se realizo satisfactoriamente");
      })
      .catch((err) => {
        message.error("Ocurrio un error al procesar la venta");
      });
  };

  const cancelModalSell = () => {
    setIsModalSellVisible(false);
  };
  const onChangePaymentMethod = ({ target: { value } }) => {
    setPaymentMethodSelected(value);
  };

  return (
    <div>
      <div className="cart-payment">
        <div>Total: Bs. {total}</div>
        <div>
          <Button className="cart-sell-button" shape="round" onClick={showModalSell}>
            Realizar venta
          </Button>
        </div>
      </div>
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
        <div className="modal-scale-weight">Total: Bs. {total}</div>
        <Divider />
        <div className="modal-sell-payment-method">
          <h3>Seleccione el metodo de pago:</h3>
          <div style={{ textAlign: "center" }}>
            <Radio.Group
              onChange={onChangePaymentMethod}
              value={paymentMethodSelected}
            >
              {payment_methods.map((method) => (
                <Radio.Button key={method.id} value={method.id}>
                  {method.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sell;
