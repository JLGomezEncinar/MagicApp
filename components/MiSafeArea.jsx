import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator, Platform, Text } from 'react-native';
import ImageCard from './ImageCard';

export default function MiSafeArea({ cards }) {

  const renderItem = ({ item }) => (
    <ImageCard
      image={item.image}
      title={item.title}
      description={item.description}
      backgroundColor={item.backgroundColor}
      onPress={() => alert('Card seleccionada ' + item.title)}
    />
  );

  if (!cards) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007bff" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
   if (cards.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, color: '#ff00ff' }}>No hay resultados </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 160 }}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal={Platform.OS !== 'android'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
