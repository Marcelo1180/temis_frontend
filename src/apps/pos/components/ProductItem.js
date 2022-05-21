import img_chuleta from "../../../resources/chuleta.jpeg";

const ProductItem = ({ data, addToCart }) => {
  let { id, name, price, image } = data;
  return (
    <div className="product-item" onClick={() => addToCart(id)}>
      <div className="product-item-price">{price} Bs. el Kg</div>
      <div className="product-item-description">
        <img
          src={image}
          alt="Filete de carne de res especial al Vacio"
          style={{ height: "80px" }}
        />
        <div className="product-item-title">{name}</div>
      </div>
    </div>
  );
};

export default ProductItem;
