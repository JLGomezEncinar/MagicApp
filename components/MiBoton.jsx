import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// ... en tu componente
const router = useRouter();
const MiBoton = ({
  title = "Botón",
  onPress,
  backgroundColor = "#007AFF",
  textColor = "#fff",
  borderRadius = 0,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor,borderRadius },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default MiBoton;
