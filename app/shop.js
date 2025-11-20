import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!
import MiTopBar from '../components/MiTopBar';
import MiBoton from '../components/MiBoton';
const Shop = () => {
    

    return (
        <View style={styles.container}>
            <MiTopBar></MiTopBar>
            
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#643F6F',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});

export default Shop;