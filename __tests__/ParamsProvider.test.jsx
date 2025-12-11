
import { render } from "@testing-library/react-native";
import { ParamsProvider } from "../components/ParamsProvider";
import { Text } from "react-native";

describe("ParamsContext", () => {
  // Componente auxiliar para probar el hook

  test("renderiza correctamente a los children", () => {
    const { getByText } = render(
      <ParamsProvider>
        <Text>Hijo</Text>
      </ParamsProvider>
    );

    expect(getByText("Hijo")).toBeTruthy();
  });


});
