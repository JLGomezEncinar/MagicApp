import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { View, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import MiLink from '../components/MiLink';
import MiTopBar from '../components/MiTopBar';
import ImageCard from '../components/ImageCard';
import MiSafeArea from '../components/MiSafeArea';

const Shop = () => {
   
    const router = useRouter();
    const { params } = useParams();

    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const buscar = (texto) => {
        const t = texto.toLowerCase();
        const f = data.filter(item =>
            item.title.toLowerCase().includes(t)
        );
        setFiltered(f);
    };

    useEffect(() => {
        if (params.text && data.length > 0) {
            buscar(params.text);
        }
    }, [params.text, data]);
    

    // cargar JSON solo una vez
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/cards.json")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setFiltered(json);
            })
            .catch(err => console.log("ERROR:", err));
    }, []);

    // función que MiTopBar llamará


    return (
        <ImageBackground
            source={require("../assets/fondoRegister.jpg")}
            style={styles.background}
        >
            <MiTopBar
           linkText={params.isLogged ? `CERRAR SESIÓN ${params.user}` : "INICIAR SESIÓN"}
            
            
                linkTo="/"
                onPress={() => router.push("/")}
                onSearch={buscar}   // ⬅️ SHOP recibe búsqueda aquí
            />

            <View style={styles.content}>
                <MiSafeArea cards={filtered} />   {/* ⬅️ Shop controla qué mostrar */}
            </View>

        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    content: {
        flex: 1
    }
})

export default Shop;