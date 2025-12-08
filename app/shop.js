import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ActivityIndicator } from 'react-native';
import { View, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import MiLink from '../components/MiLink';
import MiTopBar from '../components/MiTopBar';
import ImageCard from '../components/ImageCard';
import MiSafeArea from '../components/MiSafeArea';
import { setParams } from 'expo-router/build/global-state/routing';

const Shop = () => {
   
    const router = useRouter();
    const { params, setParams } = useParams();
    const localParams = useLocalSearchParams();
    

    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [initialSearchDone, setInitialSearchDone] = useState(false);
    const logOut = () => {
        setParams(prev => ({
            ...prev,
            user: undefined // o null
        }));

    };

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
    useEffect(() => {
        // Comprobar si hay parámetros de búsqueda en la URL
        const searchQuery = localParams.query || params?.query;

        if (data.length > 0 && searchQuery && !initialSearchDone) {
            console.log(`Ejecutando búsqueda inicial por: ${searchQuery}`);
            buscar(searchQuery);
            setInitialSearchDone(true);
        }
    }, [data, localParams, params]);

    // función que MiTopBar llamará


    return (
        <ImageBackground
            source={require("../assets/fondoRegister.jpg")}
            style={styles.background}
        >
            <MiTopBar

                linkText={params.user ? `CERRAR SESION ${params.user}` : `INICIAR SESIÓN`}
                linkTo="/"
                onPress={() => {
                    if (params.user) {
                        logOut();       // ✔️ se ejecuta correctamente
                    } else {
                        router.push("/"); // ✔️ vuelve al inicio
                    }
                }}




                onSearch={buscar}   // ⬅️ SHOP recibe búsqueda aquí
            />

            <View style={styles.content}>
                <MiSafeArea testID="ActivityIndicator" cards={filtered} />   {/* ⬅️ Shop controla qué mostrar */}
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