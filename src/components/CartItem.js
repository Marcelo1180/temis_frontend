const CartItem = ({ data, delFromCart, addToCart }) => {
  let { id, name, price, quantity } = data;
  return (
    <div style={{ borderBottom: "thin solid gray" }}>
      <h4>{name}</h4>
      <h5>
        ${price} x {quantity} = ${price * quantity}
      </h5>
      <h5>Cantidad: {quantity}</h5>
      <button onClick={()=> delFromCart(id)}>-</button>
      <button onClick={()=> addToCart(id)}>+</button>
      <button onClick={()=> delFromCart(id, true)}>Eliminar Todos</button>
    </div>
  );
};

export default CartItem;
