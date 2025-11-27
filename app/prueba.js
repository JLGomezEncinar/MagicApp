import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TextyTextInput from '../components/TextyTextInput';
import MiTopBar from '../components/MiTopBar';
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';
import { Buffer } from 'buffer'; // Necesario para Base64 en React Native

// ⚠️ SOLO PARA PRUEBAS, NO EN PRODUCCIÓN
const GITHUB_TOKEN = "Tu Token";
const OWNER = "JLGomezEncinar";
const REPO = "FicheroJSON";
const FILE_PATH = "users.json";

// ---------------------------------------------------------
// 1. OBTENER CONTENIDO Y SHA ACTUAL DEL JSON
// ---------------------------------------------------------
async function getUsersAndSHA() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    const data = await response.json();

    // Decodificar Base64
    const jsonString = Buffer.from(data.content, "base64").toString("utf8");
    const users = JSON.parse(jsonString);

    return { users, sha: data.sha };

  } catch (err) {
    console.error("Error cargando JSON:", err);
    return null;
  }
}

// ---------------------------------------------------------
// 2. ACTUALIZAR JSON EN GITHUB
// ---------------------------------------------------------
async function updateUsersInGitHub(newUsers) {
  const fileInfo = await getUsersAndSHA();
  if (!fileInfo) return false;

  const { sha } = fileInfo;

  const jsonString = JSON.stringify(newUsers, null, 2);
  const contentBase64 = Buffer.from(jsonString).toString("base64");

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Nuevo usuario registrado desde React Native",
        content: contentBase64,
        sha: sha
      })
    });

    return response.ok;

  } catch (err) {
    console.error("Error subiendo JSON:", err);
    return false;
  }
}

// ---------------------------------------------------------
// COMPONENTE REGISTER
// ---------------------------------------------------------
const Register = () => {

  const router = useRouter();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // ERRORES
  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [repeatEmailError, setRepeatEmailError] = useState(null);

  // ---------------- VALIDACIONES ----------------

  const handleUser = (value) => {
    if (!value.trim()) return setUserError("El usuario no puede estar vacío"), false;
    setUserError(null);
    return true;
  };

  const handlePassword = (value) => {
    if (!value.trim()) return setPasswordError("La contraseña no puede estar vacía"), false;
    if (value.length < 8) return setPasswordError("Mínimo 8 caracteres"), false;
    setPasswordError(null);
    return true;
  };

  const handleRepeatPassword = (value) => {
    if (value !== password) return setRepeatPasswordError("Debe coincidir con la contraseña"), false;
    setRepeatPasswordError(null);
    return true;
  };

  const handleEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return setEmailError("Email no válido"), false;
    setEmailError(null);
    return true;
  };

  const handleRepeatEmail = (value) => {
    if (value !== email) return setRepeatEmailError("Debe coincidir con el email"), false;
    setRepeatEmailError(null);
    return true;
  };

  // ---------------------------------------------------------
  // BOTÓN REGISTRAR
  // ---------------------------------------------------------
  const handleRegister = async () => {
    const ok =
      handleUser(user) &&
      handlePassword(password) &&
      handleRepeatPassword(repeatPassword) &&
      handleEmail(email) &&
      handleRepeatEmail(repeatEmail);

    if (!ok) return;

    const fileInfo = await getUsersAndSHA();
    if (!fileInfo) {
      Alert.alert("Error", "No se pudo leer el JSON");
      return;
    }

    const { users } = fileInfo;

    // Evitar duplicados
    if (users.some(u => u.user === user)) {
      Alert.alert("Error", "Ese usuario ya existe");
      return;
    }

    const updatedUsers = [
      ...users,
      { user, password }
    ];

    const success = await updateUsersInGitHub(updatedUsers);

    if (success) {
      Alert.alert("Registro completado", "Usuario añadido correctamente");
      router.push("/");
    } else {
      Alert.alert("Error", "No se pudo actualizar el JSON");
    }
  };

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <View style={styles.container}>
      <MiTopBar linkText="INICIAR SESION" linkTo="/" />

      <MiBox customStyles={styles.box}>
        
        <TextyTextInput
          label="Usuario"
          value={user}
          onChangeText={(v) => { setUser(v); handleUser(v); }}
        />
        {userError && <Text style={styles.errorText}>{userError}</Text>}

        <TextyTextInput
          label="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(v) => { setPassword(v); handlePassword(v); }}
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <TextyTextInput
          label="Repetir contraseña"
          secureTextEntry
          value={repeatPassword}
          onChangeText={(v) => { setRepeatPassword(v); handleRepeatPassword(v); }}
        />
        {repeatPasswordError && <Text style={styles.errorText}>{repeatPasswordError}</Text>}

        <TextyTextInput
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(v) => { setEmail(v); handleEmail(v); }}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <TextyTextInput
          label="Repetir email"
          keyboardType="email-address"
          value={repeatEmail}
          onChangeText={(v) => { setRepeatEmail(v); handleRepeatEmail(v); }}
        />
        {repeatEmailError && <Text style={styles.errorText}>{repeatEmailError}</Text>}

        <MiBoton
          title="Registrarse"
          backgroundColor="#BCF0D1"
          textColor="#512E62"
          borderRadius={30}
          onPress={handleRegister}
        />
      </MiBox>

    </View>
  );
};

// ---------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#643F6F',
    
  },
  box: {
    width: '60%',
    backgroundColor: '#DCDCF6',
    elevation: 5
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10
  }
});

export default Register;
