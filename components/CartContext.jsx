import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); 
  // Ejemplo de estructura:
  // { "manzana": 2, "banana": 1 }

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
