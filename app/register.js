import { useState } from 'react';
// Importamos ScrollView y useWindowDimensions para la responsividad
import { Text, View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextyTextInput from '../components/TextyTextInput';
import MiTopBar from '../components/MiTopBar';
import MiBoton from '../components/MiBoton';
import MiBox from '../components/MiBox';


const Register = () => {
  const router = useRouter();
  // Obtener las dimensiones de la ventana para la responsividad
  const { width } = useWindowDimensions();

  // Función que nos permite navegar desde register a shop si buscamos algo en la Top Bar
  const handleSearchAndNavigate = (searchText) => {
    router.push({
      pathname: '/shop',
      params: ({
        query: searchText
      })
    });

  };

  // Configuración del repositorio de GitHub
  const GITHUB_TOKEN = 'Tu TOKEN Aquí'; //Sólo para pruebas, es mala práctica compartirlo.
  const OWNER = 'JLGomezEncinar';
  const REPO = 'FicheroJSON';
  const FILE_PATH = 'users.json';

  // Parámetros del formulario
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Parámetros para los errores del formulario
  const [userError, setUserError] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [repeatEmailError, setRepeatEmailError] = useState(null);

  // Tamaño de la pantalla en función del dispositivo

  const getFormWidth = () => {
    if (width > 768) {
      // Web
      return Math.min(width * 0.6, 850);
    } else {
      // Móvil (Ocupa la mayor parte del ancho)
      return '90%';
    }
  };

  const formWidth = getFormWidth();

  // Comprobaciones de que introducimos los datos correctamente

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
    } else if (repeatPassword !== password) {
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
    } else if (repeatEmail !== email) {
      setRepeatEmailError('Este campo debe coincidir con el email');
      return false;
    } else {
      setRepeatEmailError('');
      return true;
    }
  };

  // Usaremos esto para actualizar el JSON

  const newUserData = [
    {
      user: user,
      password: password
    }
  ];
  // Con esta función obtenemos el SHA del JSON
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

      return data.sha;
    } catch (error) {
      console.error('Fallo en getFileSHA:', error.message);
      return null;
    }
  }
  // Función que actualiza el archivo JSON en Github
  async function updateGitHubFile() {

    const currentSHA = await getFileSHA();
    if (!currentSHA) {

      return;
    }
    const jsonString = JSON.stringify(newUserData, null, 2);
    let contentBase64;
    if (typeof Buffer !== 'undefined') {
      contentBase64 = Buffer.from(jsonString).toString('base64');
    } else {
      // Asegúrate de que btoa/encodeURIComponent existan en tu entorno
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

      } else {
        const errorData = await response.json();
        console.error(`❌ Error al actualizar el archivo: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Fallo en updateGitHubFile:', error.message);
    }
  }

  // Componentes básicos de la página
  return (
    <SafeAreaView style={styles.background}>
      <MiTopBar
        linkText='INICIAR SESION'
        linkTo='/'
        onPress={() => {
          router.push("/");
        }}
        onSearch={handleSearchAndNavigate}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          <MiBox
            customStyles={{

              width: formWidth,
              backgroundColor: '#DCDCF6',
              elevation: 5,
            }}
          >
            {/* 📧 Input de Usuario */}
            <TextyTextInput
              label="Usuario"
              value={user}
              onChangeText={(u) => {
                setUser(u);
                handleUser(u);
              }}
            />
            {userError ? <Text style={styles.errorText}>{userError}</Text> : null}

            {/* 🔑 Inputs de Contraseña */}
            <TextyTextInput
              label="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={(p) => {
                setPassword(p);
                handlePassword(p);
              }}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TextyTextInput
              label="Repetir contraseña"
              secureTextEntry={true}
              value={repeatPassword}
              onChangeText={(rp) => {
                setRepeatPassword(rp);
                handleRepeatPassword(rp);
              }}
            />
            {repeatPasswordError ? <Text style={styles.errorText}>{repeatPasswordError}</Text> : null}

            {/* 📧 Inputs de Email */}
            <TextyTextInput
              label="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(e) => {
                setEmail(e);
                handleEmail(e);
              }}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextyTextInput
              label="Repetir email"
              keyboardType="email-address"
              value={repeatEmail}
              onChangeText={(re) => {
                setRepeatEmail(re);
                handleRepeatEmail(re);
              }}
            />
            {repeatEmailError ? <Text style={styles.errorText}>{repeatEmailError}</Text> : null}

            {/* Botón de Registro */}
            <MiBoton
              title="Registrarse"
              backgroundColor="#BCF0D1"
              textColor="#512E62"
              borderRadius={30}
              onPress={() => {
                // Ejecutar todas las validaciones antes de proceder
                const valid = handleUser(user) &&
                  handlePassword(password) &&
                  handleRepeatPassword(repeatPassword) &&
                  handleEmail(email) &&
                  handleRepeatEmail(repeatEmail);
                // Si es válido actualizamos el JSON y navegamos al login
                if (valid) {
                  updateGitHubFile();
                  router.push("/");
                }
              }}
            />
          </MiBox >
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};
// Parámetros de los estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    // Asegura que el ScrollView pueda expandirse si el contenido es menor que la pantalla,
    // permitiendo el centrado vertical (gracias a justifyContent en .container).
    flexGrow: 1,
    backgroundColor: '#643F6F',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centra verticalmente el MiBox
    alignItems: 'center'    // Centra horizontalmente el MiBox
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Register;