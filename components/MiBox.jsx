import React from 'react';
import { View, StyleSheet } from 'react-native';

const MiBox = ({ children, customStyles }) => {
  return (
    // Combina los estilos predeterminados (styles.base) 
    // con los estilos personalizados pasados por 'customStyles'
    <View style={[styles.base, customStyles]}>
      {/* La prop 'children' renderiza cualquier cosa 
        que coloques entre las etiquetas <CajaContenedora>...</CajaContenedora>
      */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    // Estilos que siempre tendrá la caja (el "look" por defecto)
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff', // Fondo blanco por defecto
    borderRadius: 8,
    alignItems: 'center',
    // Sombra/Elevación
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default MiBox;