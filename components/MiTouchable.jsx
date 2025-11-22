import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MiTouchable({ texto, onPress, children }) {
  return (
    <TouchableOpacity 
      
      onPress={onPress}          // 👈 Simplemente lo asignas aquí
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 
  texto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
