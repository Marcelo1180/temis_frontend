import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentMethod,
  readAllPaymentMethods,
  clearCart,
  // createOrder,
} from "../actions/shoppingActions";
import { URL_LIST_PAYMENT_METHODS, URL_CREATE_SELL } from "../constants";
import PaymentMethod from "./PaymentMethod";
import { helpHttp } from "../helpers/helpHttp";
import Message from "./Message";
import { copyArrayObjectByKeys } from "../helpers/copyArrayObjectByKeys";

const Payment = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { payment_methods, total, payment_method_selected, cart } =
    state.shopping;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(URL_LIST_PAYMENT_METHODS)
      .then((res) => {
        if (!res.err) {
          dispatch(readAllPaymentMethods(res));
          setError(null);
        } else {
          // dispatch(noData);
          setError(res);
        }
      });
    setLoading(false);
  }, []);

  const createOrderClick = () => {
    if (total < 1) {
      setError("Debe vender al menos un producto");
      return;
    }
    if (!payment_method_selected) {
      setError("Debe seleccionar un metodo de pago");
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
        payment_method: payment_method_selected,
        author: 1,
      },
      product_orders,
    };
    console.log(data);
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    helpHttp()
      .post(URL_CREATE_SELL, options)
      .then((res) => {
        if (!res.err) {
          dispatch(clearCart());
          setError(null);
          window.location.href = "/";
        } else {
          // dispatch(noData);
          setError(res);
        }
      });
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <h3>Payment</h3>
      {error && <Message msg={`Error: ${error}`} bgColor="#dc3545" />}
      <article className="box grid-responsive">
        {payment_methods.map((method) => (
          <PaymentMethod
            key={method.id}
            data={method}
            payment_method_selected={payment_method_selected}
            setPaymentMethod={() => dispatch(setPaymentMethod(method.id))}
          />
        ))}
      </article>
      <article className="box">
        <h3>Total: ${total}</h3>
      </article>
      {/* <button onClick={() => dispatch(createOrderClick())}>Efectuar venta</button> */}
      <button onClick={createOrderClick}>Efectuar venta</button>
    </div>
  );
};

export default Payment;
