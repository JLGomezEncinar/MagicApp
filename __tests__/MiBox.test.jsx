import React from "react";
import { render } from "@testing-library/react-native";
import MiBox from "../components/MiBox";
import { Text } from "react-native";

describe("MiBox", () => {
  test("renderiza correctamente los hijos", () => {
    const { getByText } = render(
      <MiBox>
        <Text>Contenido interno</Text>
      </MiBox>
    );

    expect(getByText("Contenido interno")).toBeTruthy();
  });

});