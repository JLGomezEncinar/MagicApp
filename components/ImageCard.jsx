import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert, Platform } from 'react-native';

export default function ImageCard({ image, title, description, backgroundColor, onPress }) {
  return (
    <View style={[styles.card, { backgroundColor }]}>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          onPress={() => {
            const message = `Vas a añadir un ${title} a tu carrito`;

            if (Platform.OS === 'web') {
              const confirmacion = window.confirm(message);
              if (confirmacion) {
                console.log("Producto añadido:", title);
              }
            } else {
              Alert.alert(
                "Confirmación",
                message,
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Aceptar",
                    onPress: () => console.log("Producto añadido:", title),
                  },
                ],
                { cancelable: true }
              );
            }
          }
          }

        >
          <Image
            source={require("../assets/add.png")}
            style={styles.icon}

          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 250,
    width: 260,           // ⭐ Ajusta el tamaño como quieras
    backgroundColor: '#C4D9E7',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  icon: {
    width: 28,
    height: 28,
  },
});

