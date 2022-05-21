import {
  ADD_PILE_TO_CART,
  REMOVE_ALL_PILE_FROM_CART,
  REMOVE_ONE_PILE_FROM_CART,
  ADD_ISOLATE_TO_CART,
  REMOVE_ISOLATE_FROM_CART,
  CLEAR_CART,
  SET_PAYMENT_METHOD,
  READ_ALL_PRODUCTS,
  READ_ALL_PAYMENT_METHODS,
  READ_ALL_CATEGORIES,
} from "../types";

export const initialState = {
  products: [],
  cart: [],
  payment_methods: [],
  categories: [],
  payment_method_selected: 0,
  total: 0,
};

export function shoppingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ISOLATE_TO_CART: {
      state = {
        ...state,
        cart: [...state.cart, {...action.payload, uid: Date.now()}],
      };
      break;
    }
    case REMOVE_ISOLATE_FROM_CART: {
      state = {
        ...state,
        cart: state.cart.filter((item) => item.uid !== action.payload),
      };
      break;
    }
    case ADD_PILE_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      state = itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
      break;
    }
    case REMOVE_ONE_PILE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      state =
        itemToDelete.quantity > 1
          ? {
              ...state,
              cart: state.cart.map((item) =>
                item.id === action.payload
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            }
          : {
              ...state,
              cart: state.cart.filter((item) => item.id !== action.payload),
            };
      break;
    }
    case REMOVE_ALL_PILE_FROM_CART:
      state = {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
      break;
    case CLEAR_CART:
      return {
        ...state,
        cart: initialState.cart,
        total: initialState.total,
      };
    case SET_PAYMENT_METHOD:
      // console.log(action.payload)
      return {
        ...state,
        payment_method_selected: action.payload,
      };
    case READ_ALL_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case READ_ALL_PAYMENT_METHODS:
      return {
        ...state,
        payment_methods: [...action.payload],
      };
    case READ_ALL_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };
    default: {
      return state;
    }
  }
  // Calculating Total amount when the app has operations over the cart
  if (
    [
      ADD_PILE_TO_CART,
      REMOVE_ONE_PILE_FROM_CART,
      REMOVE_ALL_PILE_FROM_CART,
      ADD_ISOLATE_TO_CART,
      REMOVE_ISOLATE_FROM_CART,
    ].includes(action.type)
  ) {
    const total = state.cart.reduce(
      (sum, val) => sum + Number(val.price) * Number(val.quantity),
      0
    );
    return {
      ...state,
      total: `${total.toFixed(1)}0`,
    };
  }
}
