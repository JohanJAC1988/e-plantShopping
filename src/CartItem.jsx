import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// ¡ATENCIÓN! Ruta corregida para importar desde tu slice de Redux
import { removeItem, updateQuantity } from '../features/cart/cartSlice'; 
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Ahora también obtenemos totalItems y totalCost del store de Redux
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = useSelector(state => state.cart.totalItems); // Obtener totalItems del slice
  const totalCost = useSelector(state => state.cart.totalCost);   // Obtener totalCost del slice

  const dispatch = useDispatch();

  // --- Costo de todos los artículos en el carrito ---
  // Ahora que totalCost se mantiene en el slice, simplemente lo devolvemos.
  const calculateTotalAmount = () => {
    return totalCost;
  };

  // --- Continuar comprando ---
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // Llama a la función pasada desde el componente padre
  };

  // --- Función de Checkout (marcador de posición) ---
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // --- Incrementar y Decrementar Cantidad ---
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // Si la cantidad es 1 y se decreta, se elimina el ítem
      dispatch(removeItem(item.id));
    }
  };

  // --- Eliminar planta del carrito ---
  const handleRemove = (item) => { // Recibimos el objeto item, pero despachamos el ID
    dispatch(removeItem(item.id)); // Pasa el ID al reductor removeItem
  };

  // --- Subtotal del artículo ---
  const calculateTotalCost = (item) => {
    // Asumiendo que item.cost ya es un número (como lo convertimos en ProductList.jsx)
    return (item.quantity * item.cost);
  };

  // Puedes usar useEffect para efectos secundarios, por ejemplo, para depurar
  useEffect(() => {
    console.log("Cart updated:", cartItems);
    console.log("Total Items:", totalItems);
    console.log("Total Cost:", totalCost);
  }, [cartItems, totalItems, totalCost]);


  return (
    <div className="cart-container">
      {/* Muestra el costo total del carrito, formateado a 2 decimales */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      
      {/* Renderizado condicional: si el carrito está vacío, muestra un mensaje */}
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Tu carrito está vacío. ¡Empieza a añadir plantas!</p>
      ) : (
        <div>
          {cartItems.map(item => (
            // Usamos item.id como key para mayor robustez
            <div className="cart-item" key={item.id}> 
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                {/* Muestra el costo unitario del item, formateado */}
                <div className="cart-item-cost">${item.cost.toFixed(2)}</div> 
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                {/* Muestra el subtotal del item, formateado */}
                <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        {/* Este div parece que lo usabas para mostrar el total, pero ahora el h2 lo hace.
            Podrías eliminarlo o usarlo para otros detalles. */}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        {/* Asigné la función handleCheckoutShopping al botón de Checkout */}
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
