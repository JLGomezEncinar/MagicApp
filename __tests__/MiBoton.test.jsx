import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MiBoton from "../components/MiBoton";
import { Platform } from "react-native";

// 🟦 Mock de useRouter (por si se usa internamente)
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("MiBoton", () => {
  const defaultProps = {
    title: "Probando",
    onPress: jest.fn(),
    backgroundColor: "#123456",
    textColor: "#FFF000",
    borderRadius: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el texto correctamente", () => {
    const { getByText } = render(<MiBoton {...defaultProps} />);
    expect(getByText("Probando")).toBeTruthy();
  });

  it("ejecuta onPress al presionar", () => {
    const { getByText } = render(<MiBoton {...defaultProps} />);
    const button = getByText("Probando");

    fireEvent.press(button);

    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });



  it("aplica correctamente el color del texto", () => {
    const { getByText } = render(<MiBoton {...defaultProps} />);

    const text = getByText("Probando");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: "#FFF000",
        }),
      ])
    );
  });

  

});
