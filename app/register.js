import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useParams } from '../components/ParamsProvider';
import TextyTextInput from '../components/TextyTextInput'; // ¡Importa tu nuevo componente!
import MiTopBar from '../components/MiTopBar';
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';
import { SafeAreaView } from 'react-native-safe-area-context';


const Register = () => {
  const router = useRouter();
  const { params } = useParams();
  const { setParams } = useParams();
  const handleSearchAndNavigate = (searchText) => {
    // 1. Navega a la pantalla de la tienda ('/shop')
    // Usamos el hook de router de Expo

    // 2. Incluimos el texto de búsqueda como parámetro de consulta (query parameter)
    router.push({
      pathname: '/shop', // Cambia esto por la ruta real de tu tienda
      params: ({
        query: searchText
      })
    });

    // La pantalla Shop debe leer este parámetro 'query' en su useEffect o useLayoutEffect
    // para ejecutar la búsqueda.

    console.log(`Navegando a /shop con búsqueda: ${searchText}`);
  };

  // --- CONFIGURACIÓN (Remplaza con tus datos) ---
  const GITHUB_TOKEN = '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'; // ¡Cuidado, NO lo subas a GitHub!
  const OWNER = 'JLGomezEncinar'; // Tu nombre de usuario de GitHub
  const REPO = 'FicheroJSON'; // El nombre del repositorio
  const FILE_PATH = 'users.json'; // La ruta del archivo a actualizar


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
  // --- NUEVOS DATOS (Los datos ficticios generados en tu app) ---
  const newUserData = [
    {
      user: user,
      password: password // Recordatorio: ¡Solo para pruebas!
    }
  ];


  // -----------------------------------------------------------

  /**
   * 1. Obtiene el SHA actual del archivo.
   */
  async function getFileSHA() {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener el SHA: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`SHA actual obtenido: ${data.sha}`);
      return data.sha; // Retorna el SHA para el siguiente paso
    } catch (error) {
      console.error('Fallo en getFileSHA:', error.message);
      return null;
    }
  }

  /**
   * 2. Actualiza el archivo en GitHub usando el SHA y el nuevo contenido.
   */
  async function updateGitHubFile() {
    const currentSHA = await getFileSHA();

    if (!currentSHA) {
      console.log("No se pudo proceder a la actualización sin el SHA.");
      return;
    }

    // Convertir el objeto JSON a una cadena de texto
    const jsonString = JSON.stringify(newUserData, null, 2);

    // 🚨 Codificar la cadena de texto a Base64
    // En Node.js, Buffer se usa para esto:
    let contentBase64;
    if (typeof Buffer !== 'undefined') {
      contentBase64 = Buffer.from(jsonString).toString('base64');
    } else {
      // Para entornos como React Native (navegador/web), puedes usar btoa()
      // Asegúrate de que esta función esté disponible o polyfill si es necesario.
      contentBase64 = btoa(unescape(encodeURIComponent(jsonString)));
    }


    const updateBody = {
      message: 'Actualización de datos desde React Native para prueba.',
      content: contentBase64,
      sha: currentSHA
    };

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBody)
      });

      if (response.ok) {
        console.log('✅ Archivo JSON actualizado con éxito en GitHub!');
      } else {
        const errorData = await response.json();
        console.error(`❌ Error al actualizar el archivo: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Fallo en updateGitHubFile:', error.message);
    }
  }
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
      setEmailError('El email no puede estar vacío');
      return false;
    } else if (!emailRegex.test(email)) {
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
    <SafeAreaView
      style={styles.background}

    >
      <MiTopBar
        linkText='INICIAR SESION'
        linkTo='/'
        onPress={() => {
          router.push("/"); // ⬅️ Aquí pasas la ruta
        }}
        onSearch={handleSearchAndNavigate}
      ></MiTopBar>
      <View style={styles.container}>
        <MiBox
          customStyles={{

            width: '60%',
            backgroundColor: '#DCDCF6',
            elevation: 5,

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
                updateGitHubFile();
                router.push("/"); // Llama a la función de navegación
              }
            }}
          />
        </MiBox >
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
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