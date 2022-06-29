import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";

const BarcodeReader = ({ addToCart }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const [barcode, setBarcode] = useState("");
  const handleBarcodeKeyPress = useCallback(
    (event) => {
      // console.log(event.target.className)
      const { key, keyCode } = event;
      const keyCheck = /^[a-zA-Z0-9]$/;
      if (keyCode === 13 && event.target.className === "") {
        // ENTER
        console.log(barcode);
        addBarcodeItemToCart(barcode);
        setBarcode("");
      } else if (keyCode === 16) {
        // Shift left - Barcode Start key
        setBarcode("");
      } else {
        if (keyCheck.test(key) && event.target.className === "") {
          console.log(key);
          setBarcode(barcode + key);
        }
      }
    },
    [barcode]
  );

  const onPressEnterInputBarcode = (e) => {
    addBarcodeItemToCart(e.target.value);
  };

  const addBarcodeItemToCart = (code) => {
    const PBARCODE_FIRST_LETTER = "P";
    const PBARCODE_LENGTH = 15;
    const PBARCODE_REGEX =
      /^(P[0-9]{3})([0-9]{3})([0-9]{2})([0-9]{4})([0-9]{2})/;

    let product = null;
    if (code[0] === PBARCODE_FIRST_LETTER && code.length === PBARCODE_LENGTH) {
      const match = code.match(PBARCODE_REGEX);
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
      product = products.filter((product) => product.barcode === code)[0];
    }
    if (product) addToCart(product);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleBarcodeKeyPress);

    return () => {
      window.removeEventListener("keydown", handleBarcodeKeyPress);
    };
  }, [handleBarcodeKeyPress]);

  return (
    <div>
      <Input
        placeholder="Buscar por codigo de barra"
        prefix={<BarcodeOutlined />}
        className="barcode"
        onPressEnter={onPressEnterInputBarcode}
      />
    </div>
  );
};

export default BarcodeReader;
