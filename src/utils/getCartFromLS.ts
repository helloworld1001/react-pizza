import { CartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const cartItems = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(cartItems);

  return {
    cartItems: cartItems as CartItem[],
    totalPrice,
  };
};
