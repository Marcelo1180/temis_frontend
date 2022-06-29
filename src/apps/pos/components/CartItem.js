import { Space, Button, Card } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

const CartItem = ({
  data,
  delOneFromCart,
  delAllFromCart,
  addToCart,
  delWeightItemFromCart,
}) => {
  let { id, name, units, price, quantity, uid } = data;
  let label_quantity = "";
  switch (units) {
    case "u": {
      label_quantity = "Cantidad";
      break;
    }
    case "kg": {
      label_quantity = "Peso";
      break;
    }
    default: {
      label_quantity = "Cantidad";
      break;
    }
  }
  const buttons_weight_item = (
    <div className="cart-item-actions">
      <div>
        <span>{label_quantity}: {quantity} Kg</span>
      </div>
      <div>
        <Button
          onClick={() => delWeightItemFromCart(uid)}
          type="dashed"
          shape="circle"
          icon={<DeleteOutlined />}
          size="small"
        />
      </div>
    </div>
  );
  const buttons_units_item = (
    <div className="cart-item-actions">
      <div>
        <Space>
          <Button
            onClick={() => addToCart(id)}
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
          />
          <span>{quantity}</span>
          <Button
            onClick={() => delOneFromCart(id)}
            shape="circle"
            icon={<MinusOutlined />}
            size="small"
          />
          <span>{label_quantity}</span>
        </Space>
      </div>
      <div>
        <Button
          onClick={() => delAllFromCart(uid, true)}
          type="dashed"
          shape="circle"
          icon={<DeleteOutlined />}
          size="small"
        />
      </div>
    </div>
  );

  return (
    <Card>
      <div className="cart-item">
        <div className="cart-item-head">
          <div className="cart-item-title">{name}</div>
          <div className="cart-item-price">
            Bs. {(price * quantity).toFixed(1)}0
          </div>
        </div>
        {uid ? buttons_weight_item : buttons_units_item}
      </div>
    </Card>
  );
};

export default CartItem;
