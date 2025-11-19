import React from 'react';
import { TextInput, StyleSheet, View, Text, Platform } from 'react-native';

const TextyTextInput = ({
  value,
  onChangeText,  
  keyboardType = 'default',
  secureTextEntry = false,
  // Podemos añadir más props personalizadas o de estilo aquí
  label, // Etiqueta opcional
  error, // Mensaje de error opcional
  style
}) => {
  return (
    <View style={styles.container}>
      {/* Etiqueta (Label) */}
      {label && <Text style={styles.label}>{label}</Text>}
      
      {/* TextInput principal */}
      <TextInput
        style={[styles.input, style, error && styles.inputError]} // Aplica estilos y sobrescribe con 'style'
        value={value}
        onChangeText={onChangeText}        
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        
      />
      
      {/* Mensaje de Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginVertical: 10,
  },
  label: {
    fontSize: Platform.OS === 'android' ? 16 : 24,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
    fontFamily : 'Beleren_Bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red', // Estilo si hay un error
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextyTextInput;