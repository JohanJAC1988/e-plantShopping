import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    // Añadimos aquí los estados para el total de artículos y el costo total,
    // que son esenciales para un carrito de compras completo.
    totalItems: 0,
    totalCost: 0
  },
  reducers: {
    // --- Reducer: addItem() ---
    // Agrega un nuevo artículo al carrito o incrementa su cantidad si ya existe.
    addItem: (state, action) => {
      const newItem = action.payload; // El 'payload' es el objeto de planta completo
      
      // Busca si el artículo ya existe en el carrito usando su 'id'.
      // Es crucial que cada planta tenga un 'id' único para que esto funcione correctamente.
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // Si el artículo ya está en el carrito, solo incrementa su cantidad.
        existingItem.quantity += 1;
      } else {
        // Si el artículo es nuevo, añádelo al carrito con una cantidad inicial de 1.
        state.items.push({ ...newItem, quantity: 1 });
      }
      
      // Actualiza el total de artículos y el costo total global del carrito.
      // Asegúrate de que newItem.cost sea un número (ya lo convertimos en ProductList.jsx).
      state.totalItems += 1; // Incrementa el contador total de ITEMS
      state.totalCost += newItem.cost; // Suma el costo del nuevo item
    },

    // --- Reducer: removeItem() ---
    // Elimina un artículo del carrito según su ID.
    // El 'payload' esperado para esta acción es el 'id' del artículo a eliminar.
    removeItem: (state, action) => {
      const idToRemove = action.payload; // El ID del artículo que se va a eliminar
      const itemToRemove = state.items.find(item => item.id === idToRemove); // Encuentra el item por ID

      if (itemToRemove) {
        // Filtra el arreglo 'items' para crear uno nuevo sin el artículo a eliminar.
        state.items = state.items.filter(item => item.id !== idToRemove);
        
        // Actualiza el total de artículos y el costo total global restando lo del item eliminado.
        state.totalItems -= itemToRemove.quantity; // Resta la cantidad completa del item
        state.totalCost -= (itemToRemove.cost * itemToRemove.quantity); // Resta el costo total del item
      }
    },

    // --- Reducer: updateQuantity() ---
    // Actualiza la cantidad de un artículo existente en el carrito.
    // El 'payload' debe contener el 'id' del artículo y la 'quantity' (nueva cantidad).
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload; // Destructura el ID y la nueva cantidad del payload
      
      // Busca el artículo en el carrito que coincida con el ID dado.
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        // Calcula la diferencia en cantidad para ajustar los totales globales.
        const oldQuantity = itemToUpdate.quantity;
        const quantityDifference = quantity - oldQuantity;

        // Actualiza la cantidad del artículo a la nueva cantidad proporcionada.
        itemToUpdate.quantity = quantity; 
        
        // Ajusta el total de artículos y el costo total global basándose en la diferencia.
        state.totalItems += quantityDifference; // Ajusta el contador total de artículos
        state.totalCost += (quantityDifference * itemToUpdate.cost); // Ajusta el costo total
      }
    },
  },
});

// Exporta los creadores de acciones para ser usados en tus componentes.
// addItem para ProductList.jsx.
// removeItem y updateQuantity para CartItem.jsx.
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exporta el reductor predeterminado para ser usado en tu store de Redux.
export default CartSlice.reducer;
