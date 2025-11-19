import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);

  const handleLogin = () => {
    if (!email.includes('@')) {
      setEmailError('El correo electrónico no es válido.');
      return;
    }
    // Lógica de inicio de sesión...
    console.log('Iniciando sesión con:', email, password);
  };

  return (
   <View style={styles.container}>
    <View style={styles.box}>
     {/* 📧 Input de Correo */}
       <TextyTextInput 
      label="Usuario" 
      keyboardType="email-address" 
      value={email} 
      onChangeText={(text) => { 
        setEmail(text); 
        setEmailError(null); // Limpia el error al escribir 
        }} 
        error={emailError} // Pasa el mensaje de error para activar el estilo 
        />
        {/* 🔑 Input de Contraseña */} 
        <TextyTextInput 
        label="Contraseña" 
        secureTextEntry={true} // Oculta el texto 
        value={password} 
        onChangeText={setPassword} // Puedes pasar un 'style' para personalizar un input específico si lo necesitas: 
        // // style={{ backgroundColor: '#f0f8ff' }} 
        /> 
        <TextyTextInput 
        label="Repetir contraseña" 
        secureTextEntry={true} // Oculta el texto 
        value={password} 
        onChangeText={setPassword} // Puedes pasar un 'style' para personalizar un input específico si lo necesitas: 
        // // style={{ backgroundColor: '#f0f8ff' }} 
        />
        <TextyTextInput 
      label="Email" 
      keyboardType="email-address" 
      value={email} 
      onChangeText={(text) => { 
        setEmail(text); 
        setEmailError(null); // Limpia el error al escribir 
        }} 
        error={emailError} // Pasa el mensaje de error para activar el estilo 
        />
        <TextyTextInput 
      label="Repetir email" 
      keyboardType="email-address" 
      value={email} 
      onChangeText={(text) => { 
        setEmail(text); 
        setEmailError(null); // Limpia el error al escribir 
        }} 
        error={emailError} // Pasa el mensaje de error para activar el estilo 
        /> 
        </View>
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
  },
  box: {
    width: '60%',
    backgroundColor: '#DCDCF6',    
    alignItems: 'center',
    elevation: 5
  }
});

export default Register;