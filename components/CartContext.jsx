import { createContext, useState, useContext } from "react";
// Creamos el contexto
const CartContext = createContext();
// Función que nos permite ir añadiendo cartas al carrito
export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); 
  

  const addToCart = (title) => {
    setCart(prev => ({
      ...prev,
      [title]: (prev[title] || 0) + 1
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
