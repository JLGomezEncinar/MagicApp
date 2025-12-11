import { render, fireEvent } from "@testing-library/react-native";
import TextyTextInput from "../components/TextyTextInput";

describe("TextyTextInput", () => {
  it("llama a onChangeText cuando se escribe en el TextInput", () => {
    const mockOnChangeText = jest.fn();

    const { getByTestId } = render(
      <TextyTextInput
        value=""
        onChangeText={mockOnChangeText}
        label="Nombre"
        testID="input" // Agregamos testID para seleccionarlo
      />
    );

    const input = getByTestId("input");

    fireEvent.changeText(input, "Hola Mundo");

    expect(mockOnChangeText).toHaveBeenCalledWith("Hola Mundo");
  });
});
