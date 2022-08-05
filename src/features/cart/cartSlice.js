import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import cartItems from '../../cartItems';
import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

const url = 'MOCK_DATA.json';

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// });

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      console.log(thunkAPI);
      console.log(thunkAPI.getState());
      const res = await axios(url);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Something went wrong, try again!');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
    // [getCartItems.rejected]: (state, action) => {
    // console.log(action)
    //   state.isLoading = false;
    // },
  },
});

//Uncomment line below if you want to see the slice object in the console.
// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
