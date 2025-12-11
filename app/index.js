import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';
import MiLink from '../components/MiLink';


const Index = () => {


  // Iniciar la operación

  const router = useRouter();
  const { setParams } = useParams();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const URL = "https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/users.json";

  const [usuarios, setUsuarios] = useState([]);
  const { height } = useWindowDimensions();
// Cargamos los usuarios que tenemos en nuestro JSON de Github
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando JSON:", error);
      }
    };

    cargarDatos();
  }, []);
// Funciones que comprueban posibles errores a la hora de introducir datos
  const handleUser = (user) => {
    if (user.trim() === '') {
      setUserError('El usuario no puede estar vacío');
      return false;
    } else {
      setUserError('');
      return true;
    }
  };
  const handlePassword = (password) => {
    if (password.trim() === '') {
      setPasswordError('La contraseña no puede estar vacía');
      return false;
    } else if (password.length < 8) {
      setPasswordError('La contraseña tiene que tener al menos 8 caracteres');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/fondoIndex.jpg")}
        style={styles.background}
        resizeMode='cover'

      >
        // Ponemos un overlay para oscurecer el fondo
        <View style={styles.overlay} />
        <MiBox
          customStyles={{
            width: Platform.OS === 'web' ? '60%' : '70%',
            backgroundColor: '#C5A3FF',
            elevation: 5,
            opacity: 0.8, // Ponemos un poco de opacidad a la caja contenedora
            minHeight: Platform.OS === 'web' ? height * 0.4 : height * 0.5, // Ponemos altura en función de la plataforma
            gap: 16,
            zIndex: 2 //Necesario para que la box se muestre por encima del overlay


          }}
        >
          {/* 📧 Input de Correo */}
          <TextyTextInput
            label="Usuario"

            value={user}
            onChangeText={(user) => {
              setUser(user);
              handleUser(user); 
            }}
          />
          {userError ? <Text style={styles.errorText}>{userError}</Text> : null}
          {/* 🔑 Input de Contraseña */}
          <TextyTextInput
            label="Contraseña"
            secureTextEntry={true} // Oculta el texto 
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              handlePassword(password); 
            }}
          
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <MiBoton
            title="Iniciar Sesión"
            backgroundColor="#E41818"
            textColor="#2A1ECF"

            onPress={() => {
              const isUserValid = handleUser(user);
              const isPasswordValid = handlePassword(password);
              if (isUserValid && isPasswordValid) {
                // Si los campos introducidos son correctos comprueba si existe el usuario con esa contraseña
                const usuarioValido = usuarios.find(
                  u => u.user === user && u.password === password
                );

                if (usuarioValido) {
                  setParams({ user: user, isLogged: true });

                  router.push("/shop"); // Llama a la función de navegación
                } else {
                  // Lanza alerta si el usuario y/o la contraseña no son válidos
                  alert("Usuario y/o contraseña incorrectos");
                }
              };

            }}
          />
          <View style={{
            // Ponemos los campos en horizontal o vertical dependiendo de la plataforma
            flexDirection: Platform.OS === "android" ? "column" : "row",

          }}>

            <Text style={styles.text}>¿No tienes una cuenta?</Text>
            <MiLink to="/register" >      Regístrate</MiLink>
          </View>
        </MiBox>

      </ImageBackground >
    </SafeAreaView>

  );
};
// Estilos de los componentes
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',


  },
  container: {
    padding: 20,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Platform.OS == 'android' ? 18 : 24, // Ponemos un tamaño más grande en web que en móvil
    fontFamily: "MiFuente",
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10, // Espacio después del error
  },
  //Indicamos al overlay que ocupe todo el tamaño del imagebackground y le aplicamos oscuridad
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 1
  },

});

export default Index;