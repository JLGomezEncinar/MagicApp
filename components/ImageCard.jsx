import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ImageCard({ image, title, description, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.desc}>{description}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
});
