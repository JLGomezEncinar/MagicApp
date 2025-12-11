import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert, Platform, useWindowDimensions } from 'react-native';
import { useCart } from "../components/CartContext";


export default function ImageCard({
  image,
  title,
  backgroundColor,
  // Colocamos las card en horizontal en web
  isHorizontal = Platform.OS === 'web'
}) {
  const { width: screenWidth } = useWindowDimensions();
  const { addToCart } = useCart();

  // ----------------------------------------------------
  // Lógica de cálculo de ancho responsivo
  // ----------------------------------------------------
  let cardWidth;
  const margin = 12;

  if (isHorizontal) {
    // Ponemos un tamaño dependiendo de si estamos en web o móvil
    cardWidth = Platform.OS === 'web' ? Math.min(screenWidth * 0.25, 300) : screenWidth * 0.5;
  } else {
    // Por si acaso se usa en modo vertical simple (1 columna)
    cardWidth = screenWidth - (margin * 2);
  }

  // La altura se mantiene proporcional al nuevo ancho (proporción original ≈ 0.96:1)
  const cardHeight = cardWidth * 0.96;


  const dynamicStyles = StyleSheet.create({
    dynamicCard: {
      width: cardWidth,
      height: cardHeight,
      marginHorizontal: margin,
    },
    dynamicImage: {
      flex: 1,
      height: undefined,
    }
  });

  return (
    <View style={[styles.card, dynamicStyles.dynamicCard, { backgroundColor }]}>
      <Image source={{ uri: image }} style={[styles.image, dynamicStyles.dynamicImage]} />

      <View style={styles.content}>
        {/* Text con flex: 1 y numberOfLines para evitar desbordes */}
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        <Pressable
          onPress={() => {
            const message = `Vas a añadir un ${title} a tu carrito`;
            // Dependiendo del sistema mostramos un window confirm o un alert
            if (Platform.OS === 'web') {
              const confirmacion = window.confirm(message);
              if (confirmacion) {
                addToCart(title)
              }
            } else {
              Alert.alert(
                "Confirmación",
                message,
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Aceptar", onPress: () => addToCart(title) },
                ],
                { cancelable: true }
              );
            }
          }}
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
    
    backgroundColor: '#C4D9E7',
    borderRadius: 12,
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
    flex: 1,
    height: undefined,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Altura fija para la barra inferior, para que no varíe con el tamaño de fuente
    height: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});