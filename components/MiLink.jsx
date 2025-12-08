import { Link } from "expo-router";
import { Text, StyleSheet, Platform } from "react-native";

export default function MiLink({ to, children, style }) {
  return (
    <Link href={to}
      onClick={(e) => {
        if (onPress) {
          e.preventDefault();   // evita navegación automática
          onPress();
        }
      }} style={[styles.link, style]}>
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
