import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
//If you want to see what's inside the store, console.log the slice name in its own file
//and then import the whole file here (aka, delete 'cartSlice from') You will be able to see in the console what's in there.
import modalSlice from './features/modal/modalSlice';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
});
