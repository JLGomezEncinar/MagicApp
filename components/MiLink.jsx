import { Link } from "expo-router";
import { Text, StyleSheet } from "react-native";

export default function MiLink({ to, children, style }) {
  return (
    <Link href={to} style={[styles.link, style]}>
      <Text style={styles.text}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 18,
    fontFamily: "Beleren Bold",
  }
});
