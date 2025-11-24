import {View} from "react-native"
import {Slot} from "expo-router"
import { ParamsProvider } from "../components/ParamsProvider";

export default function Layout(){

    return (
        <View style={{ flex: 1}}>
            <ParamsProvider>
           <Slot />
           </ParamsProvider>
        </View>

    );
}
