import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator, Platform } from 'react-native';
import ImageCard from './ImageCard';


export default function MiSafeArea() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/cards.json");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const renderItem = ({ item }) => (
    <ImageCard
      image={item.image}
      title={item.title}
      description={item.description}
      onPress={() => alert('Card seleccionada ' + item.title)}
    />
  );

  if (cards.length === 0) {
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f7', paddingTop: 160}}>
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
