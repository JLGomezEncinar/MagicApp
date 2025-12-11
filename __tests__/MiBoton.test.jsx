
import { render, fireEvent } from "@testing-library/react-native";
import MiBoton from "../components/MiBoton";


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

 

 

  test("ejecuta onPress al presionar", () => {
    const { getByText } = render(<MiBoton {...defaultProps} />);
    const button = getByText("Probando");

    fireEvent.press(button);

    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });



 
  

});
