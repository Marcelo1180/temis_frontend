import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { URL_LIST_PRODUCTS, URL_LIST_CATEGORIES } from "../constants";
import { helpHttp } from "../helpers/helpHttp";
import ProductItem from "./ProductItem";
import CartItem from "./CartItem";
import Loader from "./Loader";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { products, categories, cart, total } = state.shopping;
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(URL_LIST_PRODUCTS)
      .then((res) => {
        if (!res.err) {
          dispatch(readAllProducts(res));
          setError(null);
        } else {
          // dispatch(noData);
          setError(res);
        }
      });

    helpHttp()
      .get(URL_LIST_CATEGORIES)
      .then((res) => {
        if (!res.err) {
          dispatch(readAllCategories(res));
          setError(null);
        } else {
          // dispatch(noData);
          setError(res);
        }
      });
    setLoading(false);
  }, []);

  const onKeyPressBarcode = (event) => {
    if (event.keyCode === 13) {
      let barcode = event.target.value;
      const PBARCODE_FIRST_LETTER = "P";
      const PBARCODE_LENGTH = 15;
      const PBARCODE_REGEX =
        /^(P[0-9]{3})([0-9]{3})([0-9]{2})([0-9]{4})([0-9]{2})/;

      let product = null;
      if (
        barcode[0] === PBARCODE_FIRST_LETTER &&
        barcode.length === PBARCODE_LENGTH
      ) {
        const match = barcode.match(PBARCODE_REGEX);
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
        product = products.filter((product) => product.barcode === barcode)[0];
      }

      if (product) addToCartButton(product);
      event.target.value = "";
    }
  };

  const addToCartButton = (product) => {
    if (product.available) {
      if (product.units === "kg") {
        navigate(`/weight/${product.id}`);
      }
      if (product.units === "u") {
        dispatch(addPileToCart(product.id));
      }
    } else {
      dispatch(addIsolateToCart(product));
    }
  };

  const filterProductByCategory = (category_id) => {
    setSelectedCategory(category_id);
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <h3>Productos</h3>
      <input
        type="text"
        id="barcode_text"
        autoFocus={true}
        placeholder="Start Scanning"
        onKeyDown={onKeyPressBarcode}
      />

      {loading && <Loader />}
      {error && <Message />}
      <button onClick={() => filterProductByCategory(0)}>Todos</button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => filterProductByCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
      <article className="box grid-responsive">
        {products.map(
          (product) =>
            product.available &&
            (product.category === selectedCategory ||
              selectedCategory === 0) && (
              <ProductItem
                key={product.id}
                data={product}
                addToCart={() => addToCartButton(product)}
              />
            )
        )}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            data={item}
            delOneFromCart={() => dispatch(delPileFromCart(item.id))}
            delAllFromCart={() => dispatch(delPileFromCart(item.id, true))}
            addToCart={() => dispatch(addPileToCart(item.id))}
            delWeightItemFromCart={() => dispatch(delIsolateFromCart(item.uid))}
          />
        ))}
        <h3>Total: ${total}</h3>
      </article>
    </div>
  );
};

export default ShoppingCart;
