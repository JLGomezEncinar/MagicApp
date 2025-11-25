import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import MiLink from '../components/MiLink';
import MiTopBar from '../components/MiTopBar';
import ImageCard from '../components/ImageCard';
import MiSafeArea from '../components/MiSafeArea';

const Shop = () => {
    const router = useRouter();

    const { params } = useParams();
    const [cards, setCards] = useState([]);



    return (
        <View style={styles.container}>
            <MiTopBar
                linkText={`CERRAR SESION ${params.user}`}
                linkTo='/'
                onPress={() => {
                    router.push("/"); // ⬅️ Aquí pasas la ruta
                }}
            ></MiTopBar>
            <View style={styles.content}>
                <MiSafeArea></MiSafeArea>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#643F6F',
    },
    content: {
        flex: 1,
    }

});

export default Shop;