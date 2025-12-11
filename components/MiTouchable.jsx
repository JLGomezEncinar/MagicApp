import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MiTouchable({ onPress, children }) {
  return (
    <TouchableOpacity 
      
      onPress={onPress}          
    >
      {children}
    </TouchableOpacity>
  );
}


