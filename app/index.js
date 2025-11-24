import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';
import MiLink from '../components/MiLink';


const Index = () => {
  const router = useRouter();
  const { setParams } = useParams();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
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
    <View style={styles.container}>
      <MiBox
        customStyles={{
          width: '60%',
          backgroundColor: '#DCDCF6',
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
              setParams({ user: user });

              router.push("/shop"); // Llama a la función de navegación
            }
          }}
        />
        <Text>¿No tienes una cuenta?</Text>
        <MiLink to="/register">Regístrate</MiLink>
      </MiBox>
    </View >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10, // Espacio después del error
  },
});

export default Index;