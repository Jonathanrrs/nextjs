import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Update products in carts"; payload: ICartProduct[] }
  | { type: "[Cart] - Change cart quantity"; payload: ICartProduct }
  | { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Update products in carts":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter((product) => {
          const idProduct = product._id + product.size;
          const idProductRemove = action.payload._id + action.payload.size;

          return idProduct !== idProductRemove;
        }),
      };
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
