import { FC, ReactNode, useCallback, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children?: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    // dispatch({ type: "[Cart] - Add product", payload: [...state.cart, product]});

    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in carts",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in carts",
        payload: [...state.cart, product],
      });

    /* acumular las cantidades */

    const updateProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      /* actualizar la cantidad */

      p.quantity += product.quantity;
      return p;
    });
    return dispatch({
      type: "[Cart] - Update products in carts",
      payload: updateProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        /* methods */
        addProductToCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
