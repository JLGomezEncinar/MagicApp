import React from 'react';
import { TextInput, StyleSheet, View, Text, Platform, useWindowDimensions } from 'react-native';

const TextyTextInput = ({
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  label, 
  error, 
  style,
  onBlur
}) => {

  const { width } = useWindowDimensions();
  const isMobile = width < 768; // todo dispositivo <768px se considera móvil


  return (
    <View style={[styles.container, isMobile ? styles.column : styles.row]}>
      {/* Etiqueta (Label) */}
      {label && (
        <Text
          style={[
            styles.label,
            !isMobile && styles.labelRight
          ]}
        >
          {label}
        </Text>
      )}

      {/* TextInput principal */}
      <TextInput
        style={[styles.input, style, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        testID="input"
      />

      {/* Mensaje de Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
// Parámetros de los estilos
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center', // centra verticalmente en web
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Platform.OS === 'web' ? 24: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'MiFuente',
    marginBottom: 5,
  },
  labelRight: {
    width: 150,         // ancho fijo para alinear labels en web
    textAlign: 'right', // alineado a la derecha
    marginRight: 10,    // espacio entre label e input
    marginBottom: 0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    width: 150,
    
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextyTextInput;
