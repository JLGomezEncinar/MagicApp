import {View} from "react-native"
import {Slot} from "expo-router"
import { ParamsProvider } from "../components/ParamsProvider";
import { CartProvider } from "../components/CartContext";

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // 1. Usamos el hook useFonts
  const [fontsLoaded, fontError] = useFonts({
    // Indicamos la ruta de la fuente a usar
    'MiFuente': require('../assets/fonts/Beleren_Bold.ttf'),
    
  
    
  });

  // 2. Ocultamos la pantalla de inicio (splash screen) cuando las fuentes estén listas
  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Oculta la splash screen tan pronto como las fuentes se cargan o hay un error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // 3. Renderizado condicional
  if (!fontsLoaded && !fontError) {
    // Mientras las fuentes se están cargando, se mantiene visible la splash screen
    return null; 
  }

    return (
        <View style={{ flex: 1}}>
          <CartProvider>
            <ParamsProvider>
           <Slot />
           </ParamsProvider>
           </CartProvider>
        </View>

    );
}
