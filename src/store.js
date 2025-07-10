import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Aquí el nombre es más corto y convencional

const store = configureStore({
  reducer: {
    cart: cartReducer, // Usa el nombre de la variable importada
  },
});

export default store;
