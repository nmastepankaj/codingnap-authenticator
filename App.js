import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./components/Drawer";
import PlusBadge from "./components/PlusBadge";
import { createStackNavigator } from '@react-navigation/stack';
import QRCode from "./components/QRCode";
const RootStack = createStackNavigator();
import { TOTPContext,TOTPContextProvider  } from "./context/TOTPContext";



export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Chal rha!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <>
    <TOTPContextProvider>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </TOTPContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
