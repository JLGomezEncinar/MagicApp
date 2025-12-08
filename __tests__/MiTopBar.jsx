import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MiTopBar from "../components/MiTopBar";

// Mock necesario porque el componente usa useCart()
jest.mock("../components/CartContext", () => ({
  useCart: () => ({
    cart: {}
  }),
}));

// Mock del router porque el componente usa useRouter()
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("MiTopBar", () => {
  it("llama a onSearch con el texto ingresado", () => {
    const mockOnSearch = jest.fn();

    const { getByRole, getByDisplayValue, getByTestId, getByPlaceholderText, getByText, getAllByRole } =
      render(<MiTopBar onSearch={mockOnSearch} />);

    // 1. Obtenemos el TextInput
    const input = getByTestId("search-input");

    // 2. Simulamos escribir texto
    fireEvent.changeText(input, "hola");

    // 3. Obtenemos el botón de búsqueda (primer TouchableOpacity)
    const searchButton = getByTestId("search-button");

    // 4. Simulamos pulsar el botón
    fireEvent.press(searchButton);

    // 5. Comprobamos que onSearch fue llamado con el texto correcto
    expect(mockOnSearch).toHaveBeenCalledWith("hola");
  });
});
