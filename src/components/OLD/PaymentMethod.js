const PaymentMethod = ({ data, payment_method_selected, setPaymentMethod }) => {
  let { id, name } = data;
  return (
    <button
      style={id === payment_method_selected ? { background: "gray" } : {}}
      onClick={() => setPaymentMethod(id)}
    >
      {name}
    </button>
  );
};

export default PaymentMethod;
