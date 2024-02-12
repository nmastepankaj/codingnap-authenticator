import React, {useContext, useEffect} from "react";
import PlusBadge from "./PlusBadge";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import QRCode from "./QRCode";
const RootStack = createStackNavigator();
import TOTPContext from "../context/TOTPContext";
import { checkIsTOTPURL } from "../utils/string";
import TOTPBox from "./TOTPBox";
// import { ScrollView } from 'react-native-virtualized-view';

import { Dimensions } from "react-native";

const WINDOW_HEIGHT = Dimensions.get("window").height;

function HomeScreen({ navigation }) {

  const {totpURLs, setTotpURLs} = useContext(TOTPContext);

  useEffect(() => {
    console.log("totpURLs", totpURLs);
  }, [totpURLs, navigation]);

  const getDataFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem("totpURLs");
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("error while getting setTotpURLs");
      }
      return "[]";

    };


    

    useEffect(() => {
      console.log("useEffect HomeScreen");
      const asyncAction = async () => {
        try {
          let data = await getDataFromAsyncStorage();
          data = JSON.parse(data);
          setTotpURLs(data);
        } catch (e) {
          console.log("error while  getting setTotpURLs");
        }
      }
      asyncAction();
    }, [navigation]);


  
  return (
    <>
    <ScrollView>
    <View style={{ flex: 1, padding: 20, minHeight: WINDOW_HEIGHT- 100 }}>
      {/* <Text>Home Screen</Text> */}
      {/* <QRCode navigation={navigation}/> */}
      <Text>{totpURLs.length == 0 && 'No Data Found'}</Text>
      { totpURLs.map((url, index) => {
        if(checkIsTOTPURL(url))
        {
          return <TOTPBox key={index} url={url}/>
        }
      })}
    </View>
    </ScrollView>
      <PlusBadge navigation={navigation}/>
      </>
  );
}

function QRCodeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <QRCode navigation={navigation}/>
    </View>
  );
}

const Home = () => {
  

  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Group>
          <RootStack.Screen name="Home2" component={HomeScreen} />
          <RootStack.Screen name="QRCode" component={QRCodeScreen} />
        </RootStack.Group>
        {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="MyModal" component={QRCode} options={{
              headerShown: false,
              cardStyle: { height: 100, position: "fixed", zIndex:999999, top: 0, left: 0 },
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: "clamp",
                  }),
                },
              }),
            }}/>
        </RootStack.Group> */}
      </RootStack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

export default Home;
