import { render, fireEvent } from "@testing-library/react-native";
import MiTouchable from "../components/MiTouchable";
import { Text } from "react-native";

describe("MiTouchable", () => {


  test("llama a onPress al presionar el TouchableOpacity", () => {
    const mockOnPress = jest.fn();

    const { getByText } = render(
      <MiTouchable onPress={mockOnPress}>
        <Text>Presionar</Text>
      </MiTouchable>
    );

    const button = getByText("Presionar");
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
