import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import CartItem from "../components/CartItem";
import {
  addPileToCart,
  delPileFromCart,
  delIsolateFromCart,
} from "../actions/shoppingActions";

const CartList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart, total } = state.shopping;

  const total_showing = <h2 className="cart-item-total">Total: Bs. {total}</h2>;

  const empty_showing = (
    <div className="cart-empty">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Sin productos</span>}
      />
    </div>
  );

  return (
    <div className="cart">
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
      {total > 0 ? total_showing : empty_showing}
    </div>
  );
};

export default CartList;
