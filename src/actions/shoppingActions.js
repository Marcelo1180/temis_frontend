import {
  ADD_PILE_TO_CART,
  REMOVE_ALL_PILE_FROM_CART,
  REMOVE_ONE_PILE_FROM_CART,
  ADD_ISOLATE_TO_CART,
  REMOVE_ISOLATE_FROM_CART,

  CLEAR_CART,
  SET_PAYMENT_METHOD,
  NO_DATA,
  READ_ALL_PRODUCTS,
  READ_ALL_PAYMENT_METHODS,
  READ_ALL_CATEGORIES,
} from "../types";

export const addPileToCart = (id) => ({ type: ADD_PILE_TO_CART, payload: id });

export const delPileFromCart = (id, all) =>
  all
    ? { type: REMOVE_ALL_PILE_FROM_CART, payload: id }
    : { type: REMOVE_ONE_PILE_FROM_CART, payload: id };

export const clearCart = () => ({ type: CLEAR_CART });

export const addIsolateToCart = (data) => ({
  type: ADD_ISOLATE_TO_CART,
  payload: data,
});

export const delIsolateFromCart = (uid) => ({
  type: REMOVE_ISOLATE_FROM_CART,
  payload: uid,
});

export const noData = () => ({ type: NO_DATA });

export const setPaymentMethod = (id) => ({
  type: SET_PAYMENT_METHOD,
  payload: id,
});

export const readAllProducts = (data) => ({
  type: READ_ALL_PRODUCTS,
  payload: data,
});

export const readAllPaymentMethods = (data) => ({
  type: READ_ALL_PAYMENT_METHODS,
  payload: data,
});

export const readAllCategories = (data) => ({
  type: READ_ALL_CATEGORIES,
  payload: data,
});

