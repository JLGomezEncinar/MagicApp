import { View, Image, TextInput, Platform, TouchableOpacity, StyleSheet, Modal, Text, Button } from "react-native";
import MiLink from "./MiLink";
import MiTouchable from "./MiTouchable";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";



const MiTopBar = ({ linkText, linkTo, onPress, onSearch = () => { } }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const { cart } = useCart();

  const buscar = () => {
    onSearch(text); //
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        testID="search-input"
        style={styles.textInput}

      />



      {/* Icono izquierdo */}
      <TouchableOpacity
        onPress={buscar}
        testID="search-button">
        <Image
          source={require("../assets/search.png")}
          style={styles.icon}

        />
      </TouchableOpacity>



      {/* Icono derecho */}
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Image
          source={require("../assets/shop.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={{ fontSize: 20 }}>Carrito:</Text>

          {Object.keys(cart).map(item => (
            <Text key={item}>
              {item}: {cart[item]} unidades
            </Text>
          ))}

          <Button title="Cerrar" onPress={() => setOpen(false)} />
        </View>
      </Modal>
      {Platform.OS === 'android' ? (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/sesion.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : Platform.OS === 'web' ? (
        <MiLink to="/" onPress={onPress}>
          {linkText}
        </MiLink>
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
  textInput: {
    backgroundColor: "#ffffff",
    width: "20%"
  }
});

export default MiTopBar;
