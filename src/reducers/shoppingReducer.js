import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
  products: [
    {
      id: 1,
      name: "Molida especial",
      description: null,
      price: "38.50",
      barcode: "P0001",
      units: "kg",
      available: true,
      created: "2022-05-13T10:56:13.956503-04:00",
      updated: "2022-05-13T10:59:16.121696-04:00",
      category: 1,
    },
    {
      id: 2,
      name: "Mayonesa",
      description: null,
      price: "10.00",
      barcode: "12345678",
      units: "u",
      available: true,
      created: "2022-05-13T10:56:35.031707-04:00",
      updated: "2022-05-13T10:56:35.031735-04:00",
      category: 2,
    },
    {
      id: 3,
      name: "Chuleta (Al Vacio)",
      description: null,
      price: "40.00",
      barcode: "P00010080D94",
      units: "u",
      available: true,
      created: "2022-05-13T10:57:34.995673-04:00",
      updated: "2022-05-13T10:59:19.879405-04:00",
      category: 1,
    },
  ],
  cart: [],
  total: 0,
};

export function shoppingReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
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
    }
    case TYPES.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case TYPES.CLEAR_CART:
      return shoppingInitialState;
    case TYPES.TOTAL_AMOUNT:
      return shoppingInitialState;
    default: {
      return state;
    }
  }
}
