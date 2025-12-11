import React from 'react';
// Ya no necesitamos useWindowDimensions
import { FlatList, ActivityIndicator, Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import ImageCard from './ImageCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MiSafeArea({ cards }) {
  const { width } = useWindowDimensions();

 // Cambiamos de horizontal a vertical en función del ancho de la pantalla
  const isHorizontalMode = width >= 768;
  //  Renderizar cada tarjeta
  const renderItem = ({ item }) => (
    
    <ImageCard
      image={item.image}
      title={item.title}
      description={item.description}
      backgroundColor={item.backgroundColor}
      onPress={() => alert('Card seleccionada ' + item.title)}
  
    />
  );

  // Si no hay tarjetas cargadas nos sale el activity indicator

  if (!cards) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </SafeAreaView>
    );
  }
// Si la búsqueda no devuelve resultados nos aparece un mensaje
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
      {/*El View envuelve el FlatList para gestionar la altura */}
      <View style={styles.horizontalWrapper}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
         
          horizontal={isHorizontalMode}
         

          

          contentContainerStyle={styles.listContentHorizontal}
        />
      </View>
    </SafeAreaView>
  );
}
// Parámetros de los estilos
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
  // Estilo que define el alto que ocupará el carrusel
  horizontalWrapper: {
    
    flex: 1,
  },
  listContentHorizontal: {
    alignItems: 'center',
    paddingHorizontal: 10,
    
  }
});