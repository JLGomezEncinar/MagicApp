import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ImageBackground, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
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
    <ImageBackground
      source={require("../assets/fondoIndex.jpg")}
      style={styles.background}
      resizeMode='cover'
    >

      <MiBox
        customStyles={{
          width: '60%',
          backgroundColor: '#C5A3FF',
          elevation: 5
        }}
      >
        {/* 📧 Input de Correo */}
        <TextyTextInput
          label="Usuario"

          value={user}
          onChangeText={(user) => {
            setUser(user);
            handleUser(user); // Limpia el error al escribir 
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
            handlePassword(password); // Limpia el error al escribir 
          }}
        //onBlur = {handlePassword}
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
              const usuarioValido = usuarios.find(
                u => u.user === user && u.password === password
              );

              if (usuarioValido) {
                setParams({ user: user });

                router.push("/shop"); // Llama a la función de navegación
              } else {
                console.log("Error en login");
                alert("Email o contraseña incorrectos");
              }
            };

          }}
        />
        <View style={{
          flexDirection: Platform.OS === "android" ? "column" : "row",

        }}>

          <Text>¿No tienes una cuenta?</Text>
          <MiLink to="/prueba">      Regístrate</MiLink>
        </View>
      </MiBox>
    </ImageBackground >

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
  container: {
    padding: 20,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10, // Espacio después del error
  },
});

export default Index;