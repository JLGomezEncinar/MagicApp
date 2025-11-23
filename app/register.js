import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!
import MiTopBar from '../components/MiTopBar';
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';
const router = useRouter();
const Register = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userError, setUserError] = useState();
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [repeatEmailError, setRepeatEmailError] = useState(null);
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

  const handleRepeatPassword = (repeatPassword) => {
    if (repeatPassword.trim() === '') {
      setRepeatPasswordError('Este campo no puede estar vacío');
      return false;
    } else if (repeatPassword != password) {
      setRepeatPasswordError('Este campo debe coincidir con la contraseña');
      return false;
    } else {
      setRepeatPasswordError('');
      return true;
    }
  };
  const handleEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email.trim() === '') {
      setEmailError('El email no puede estar vacío');
      return false;
    } else if (emailRegex.test(email)) {
      setEmailError('Debe introducir un email válido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  const handleRepeatEmail = (repeatEmail) => {
    if (repeatEmail.trim() === '') {
      setRepeatEmailError('Este campo no puede estar vacío');
      return false;
    } else if (repeatEmail != email) {
      setRepeatEmailError('Este campo debe coincidir con el email');
      return false;
    } else {
      setRepeatEmailError('');
      return true;
    }
  };


  return (
    <View style={styles.container}>
      <MiTopBar
        linkText='INICIAR SESION'
        linkTo='/'
        onPress={() => {
          router.push("/"); // ⬅️ Aquí pasas la ruta
        }}
      ></MiTopBar>
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
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TextyTextInput
          label="Repetir contraseña"
          secureTextEntry={true} // Oculta el texto 
          value={repeatPassword}
          onChangeText={(repeatPassword) => {
            setRepeatPassword(repeatPassword);
            handleRepeatPassword(repeatPassword); // Limpia el error al escribir 
          }}

        />
        {repeatPasswordError ? <Text style={styles.errorText}>{repeatPasswordError}</Text> : null}
        <TextyTextInput
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
            handleEmail(email);
          }}

        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextyTextInput
          label="Repetir email"
          keyboardType="email-address"
          value={repeatEmail}
          onChangeText={(repeatEmail) => {
            setRepeatEmail(repeatEmail);
            handleRepeatEmail(repeatEmail);
          }}

        />
        {repeatEmailError ? <Text style={styles.errorText}>{repeatEmailError}</Text> : null}
        <MiBoton
          title="Registrarse"
          backgroundColor="#BCF0D1"
          textColor="#512E62"
          borderRadius={30}
          onPress={() => {
            const isUserValid = handleUser(user);
            const isPasswordValid = handlePassword(password);
            const isRepeatPasswordValid = handleRepeatPassword(repeatPassword);
            const isEmailValid = handleEmail(email);
            const isRepeatEmailValid = handleRepeatEmail(repeatEmail);
            if (isUserValid && isPasswordValid && isRepeatPasswordValid && isEmailValid && isRepeatEmailValid) {
              router.push("/"); // Llama a la función de navegación
            }
          }}
        />
      </MiBox >
    </View >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#643F6F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10, // Espacio después del error
  },
});

export default Register;