
import { render, screen } from "@testing-library/react-native";
import { CartProvider } from "../components/CartContext";

// Componente auxiliar para probar el contexto

import { Text } from "react-native";

describe("CartContext", () => {
  test("renderiza correctamente a los children", () => {
    render(
      <CartProvider>
        <Text testID="child">Hola</Text>
      </CartProvider>
    );

    expect(screen.getByTestId("child")).toBeTruthy();
  });

 


});
