import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";
// import { ShippingAddress } from "./CartProvider";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
  /* methods */
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string | undefined;
  }>;
}

export const CartContext = createContext({} as ContextProps);
