import React from "react";
import { render, screen, act } from "@testing-library/react-native";
import { CartProvider, useCart } from "../components/CartContext";

// Componente auxiliar para probar el contexto
function TestComponent() {
  const { cart, addToCart } = useCart();

  return (
    <>
      <Text testID="cart-state">
        {JSON.stringify(cart)}
      </Text>
      <Button title="add" onPress={() => addToCart("Producto")} />
    </>
  );
}

import { Text, Button } from "react-native";

describe("CartContext", () => {
  it("renderiza correctamente a los children", () => {
    render(
      <CartProvider>
        <Text testID="child">Hola</Text>
      </CartProvider>
    );

    expect(screen.getByTestId("child")).toBeTruthy();
  });

 

  it("useCart devuelve el contexto", () => {
    let contextValue;

    function CaptureContext() {
      contextValue = useCart();
      return null;
    }

    render(
      <CartProvider>
        <CaptureContext />
      </CartProvider>
    );

    expect(contextValue).toHaveProperty("cart");
    expect(contextValue).toHaveProperty("addToCart");
  });
});
