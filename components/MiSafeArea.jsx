import React from 'react';
// Ya no necesitamos useWindowDimensions
import { FlatList, ActivityIndicator, Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import ImageCard from './ImageCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MiSafeArea({ cards }) {
  const { width } = useWindowDimensions();

  // 1. Determinar el modo de visualización:
  // Por ejemplo, usar horizontal para anchos mayores a 768px (tabletas/web)
  const isHorizontalMode = width >= 768;
  // 1. Renderizar cada tarjeta
  const renderItem = ({ item }) => (
    // Los estilos de ImageCard ahora deberían enfocarse en tener un ancho fijo (o basado en la pantalla)
    // para que se vea bien en el carrusel horizontal.
    <ImageCard
      image={item.image}
      title={item.title}
      description={item.description}
      backgroundColor={item.backgroundColor}
      onPress={() => alert('Card seleccionada ' + item.title)}
    // Ya no es necesario pasar numColumns ni screenWidth para la responsividad de cuadrícula
    />
  );

  // --- Lógica de Carga y Sin Resultados (se mantiene igual) ---

  if (!cards) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.noResultsText}>No hay resultados</Text>
      </SafeAreaView>
    );
  }

  // --- Renderizado de la Lista Horizontal ---

  return (
    <SafeAreaView style={styles.listContainer}>
      {/* 2. El View envuelve el FlatList para gestionar la altura */}
      <View style={styles.horizontalWrapper}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          // 3. Clave para el scroll horizontal:
          horizontal={isHorizontalMode}
          // 4. Eliminar numColumns

          // Opcional: Para que no muestre la barra de scroll horizontal
          showsHorizontalScrollIndicator={false}

          contentContainerStyle={styles.listContentHorizontal}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 20,
    color: '#ff00ff'
  },
  listContainer: {
    flex: 1,
  },
  // Estilo que define el alto que ocupará el carrusel (ej: solo un tercio de la pantalla)
  horizontalWrapper: {
    // Ejemplo: Fija una altura si quieres que el carrusel solo ocupe una parte
    // O usa un porcentaje, ej: height: '30%'
    // Si quieres que ocupe todo el espacio vertical disponible, usa flex: 1
    flex: 1,
  },
  listContentHorizontal: {
    alignItems: 'center',
    paddingHorizontal: 10,
    // Alineación vertical de los items en el carrusel
    // flexGrow: 1, // Esto es útil si quieres centrar los items si no llenan la pantalla
    // justifyContent: 'center', // Útil si usas flexGrow: 1
  }
});