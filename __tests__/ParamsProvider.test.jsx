import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ParamsProvider, useParams } from "../components/ParamsProvider";
import { Text, Button } from "react-native";

describe("ParamsContext", () => {
  // Componente auxiliar para probar el hook
  const TestComponent = () => {
    const { params, setParams } = useParams();
    return (
      <>
        <Text testID="params">{JSON.stringify(params)}</Text>
        <Button
          title="Actualizar"
          onPress={() => setParams({ user: "Juan" })}
        />
      </>
    );
  };

  it("renderiza correctamente a los children", () => {
    const { getByText } = render(
      <ParamsProvider>
        <Text>Hijo</Text>
      </ParamsProvider>
    );

    expect(getByText("Hijo")).toBeTruthy();
  });

  it("useParams devuelve el contexto y permite actualizarlo", () => {
    const { getByTestId, getByText } = render(
      <ParamsProvider>
        <TestComponent />
      </ParamsProvider>
    );

    // Valor inicial
    expect(getByTestId("params").props.children).toBe("{}");

    // Simular botón para actualizar params
    fireEvent.press(getByText("Actualizar"));

    // Valor actualizado
    expect(getByTestId("params").props.children).toBe(JSON.stringify({ user: "Juan" }));
  });
});
