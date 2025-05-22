import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import bookReducer from './slices/bookSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        books: bookReducer,
        orders: orderReducer
    }
}); 