import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import TOTPContext from "../context/TOTPContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkIsTOTPURL } from "../utils/string";

const QRCode = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { totpURLs, setTotpURLs } = useContext(TOTPContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      navigation.setParams({ screen: undefined, params: undefined })
    })
    return unsubscribe
  }, [navigation])

  const handleBarCodeScanned = async ({ type, data }) => {
    if(checkIsTOTPURL(data) === false){
      if (!scanned) {
        setScanned(true);
        alert("Invalid QR Code");
      }
    }else{
      if (!scanned) {
        setScanned(true);
        // save data to the local storage
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        totpURLs.push(data);
        setTotpURLs(totpURLs);
        console.log("totpURLs QR", totpURLs);
        await AsyncStorage.setItem("totpURLs", JSON.stringify(totpURLs));
        navigation.navigate("Home2",{ initial: false });
      }}
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  

  return (
    <View style={styles.container}>
      <Pressable style={styles.cross} onPress={() => navigation.goBack()}>
        <Text style={styles.crossText}>x</Text>
      </Pressable>
      <View>
        <Camera
          style={styles.camera}
          type={type}
          // barCodeScannerSettings={{
          //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          // }}

          onBarCodeScanned={handleBarCodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  cross: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    top: 20,
    left: 10,
  },
  crossText: {
    fontSize: 30,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    flex: 1,
    width: 500,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default QRCode;
