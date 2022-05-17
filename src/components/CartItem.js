const CartItem = ({ data, delOneFromCart, delAllFromCart, addToCart, delWeightItemFromCart }) => {
  let { id, name, units, price, quantity, uid } = data;
  const buttons_weight_item = (
    <div>
      <button onClick={() => delWeightItemFromCart(uid)}>Eliminar</button>
    </div>
  );
  const buttons_units_item = (
    <div>
      <button onClick={() => delOneFromCart(id)}>-</button>
      <button onClick={() => addToCart(id)}>+</button>
      <button onClick={() => delAllFromCart(id, true)}>Eliminar Todos</button>
    </div>
  );
  let label_quantity = "";
  switch(units){
    case "u":{
      label_quantity = "Cantidad";
      break;
    }
    case "kg":{
      label_quantity = "Peso";
      break;
    }
    default:{
      label_quantity = "Cantidad";
      break;
    }
  }

  return (
    <div style={{ borderBottom: "thin solid gray" }}>
      <h4>{name}</h4>
      <h5>
        ${price} x {quantity} = ${(price * quantity).toFixed(1)}0
      </h5>
      <h5>{label_quantity}: {quantity}</h5>
      {uid ? buttons_weight_item : buttons_units_item}
    </div>
  );
};

export default CartItem;
