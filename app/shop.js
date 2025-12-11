import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import MiTopBar from '../components/MiTopBar';
import MiSafeArea from '../components/MiSafeArea';


const Shop = () => {

    const router = useRouter();
    const { params, setParams } = useParams();
    const localParams = useLocalSearchParams();




    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [initialSearchDone, setInitialSearchDone] = useState(false);
    // Constante que muestra un icono dependiendo de si estamos logueados o no
    const icon = params.user
        ? require('../assets/login.png')
        : require('../assets/sesion.png');
    // Función que hace logout
    const logOut = () => {
        setParams(prev => ({
            ...prev,
            user: undefined
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
        // Comprobar si hay parámetros de búsqueda que vienen de la página de registro
        const searchQuery = localParams.query || params?.query;

        if (data.length > 0 && searchQuery && !initialSearchDone) {

            buscar(searchQuery);
            setInitialSearchDone(true);
        }
    }, [data, localParams, params]);

    // Si no hay datos mostramos la data que existe
    const buscar = (query) => {
        if (!query) {
            setFiltered(data);
            return;
        }
        // Pasamos el texto de búsqueda en minúsculas y filtramos por los resultados que contengan ese texto
        const texto = query.toLowerCase();

        const resultados = data.filter(item =>
            item.title.toLowerCase().includes(texto)
        );

        setFiltered(resultados);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../assets/fondoRegister.jpg")}
                style={styles.background}
            >
                <View style={styles.overlay} pointerEvents='none'/>

                <MiTopBar style={styles.miTopBar}
                    // Colocamos el icono en móvil o el texto en la web dependiendo de si estamos logueados o no
                    rightIcon={icon}
                    linkText={params.user ? `CERRAR SESION ${params.user}` : `INICIAR SESIÓN`}
                    linkTo="/"
                    onPress={() => {
                        // Si estamos logueados hacemos log out y si no volvemos al login
                        if (params.user) {
                            logOut();
                        } else {
                            router.push("/");
                        }
                    }}




                    onSearch={buscar}
                    
                />

                <View style={styles.content}>
                    <MiSafeArea testID="ActivityIndicator" cards={filtered} />
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};
// Parámetros de los estilos
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    content: {
        flex: 1,
        zIndex: 2
    },
    background: {
        flex: 1,

        height: '100%',
        width: '100%',
    },
    content: {
        flex: 1
    },
    miTopBar: {
        zIndex: 2
    },
  //Indicamos al overlay que ocupe todo el tamaño del imagebackground y le aplicamos oscuridad
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.4,
    zIndex: 1
  },
})

export default Shop;