import { View, Text, Image, TextInput, Platform, TouchableOpacity, StyleSheet } from "react-native";

const MiTopBar = () => {
  return (
    <View style={styles.container}>
        <TextInput></TextInput>
      
      {/* Icono izquierdo */}
      <TouchableOpacity>
       <Image 
          source={require("../assets/search.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      

      {/* Icono derecho */}
      <TouchableOpacity>
        <Image 
          source={require("../assets/shop.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <TouchableOpacity>
        <Image
          source={require('../assets/sesion.png')}
          style={styles.icon}
        />
        </TouchableOpacity>
      ) : Platform.OS === 'web' ? (
        <Text style={styles.webText}>INICIAR SESIÓN</Text>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#BCF0D1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10, // margen para status bar (opcional)
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
   icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default MiTopBar;
