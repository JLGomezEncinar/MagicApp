import { Link } from "expo-router";
import { Text, StyleSheet, Platform } from "react-native";

export default function MiLink({ to, children, style, onPress }) {
  return (
    <Link
      href={to}
      onPress={(e) => {        // <-- evita navegación también aquí
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
      onClick={(e) => {        // <-- y también en click (por compatibilidad)
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
      style={[styles.link, style]}
    >
      <Text style={styles.text}>{children}</Text>
    </Link>
  );
}


const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: Platform.OS == 'android' ? 18 : 24,
    fontFamily: "MiFuente",
  }
});
