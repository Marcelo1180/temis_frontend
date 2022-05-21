import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIsolateToCart } from "../actions/shoppingActions";
import { useParams, useNavigate } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import {URL_GET_SCALE_WEIGHT} from "../constants";

const Weight = () => {
  const { id } = useParams();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { total, products } = state.shopping;
  const navigate = useNavigate();

  const [weight_scale, setWeightScale] = useState(0);
  const product = products.filter(
    (product) => Number(product.id) === Number(id)
  )[0];

  const getWeight = () => {
    helpHttp()
      .get(URL_GET_SCALE_WEIGHT)
      .then((res) => {
        if (!res.err) {
          setWeightScale(res);
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(getWeight, 1000);
    return () => clearInterval(interval);
  }, []);

  const addWeightItemToCartButton = () => {
    const data = {
      ...product,
      quantity: weight_scale,
    };
    dispatch(addIsolateToCart(data));
    navigate("/");
  };

  return (
    <div>
      <h2>Weight</h2>
      <button onClick={addWeightItemToCartButton}>Agregar a la compra</button>
      <article className="box">
        <h4>{product.name}</h4>
        <h1>{weight_scale}</h1>
        <h3>$/Kg {product.price}</h3>
        <h2>Price: ${(weight_scale * product.price).toFixed(1)}0</h2>
      </article>
      <article className="box">
        <h3>Total: ${total}</h3>
      </article>
    </div>
  );
};

export default Weight;
