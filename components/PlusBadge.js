import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import { Dimensions } from "react-native";
import QRCode from "./QRCode";

const WINDOW_HEIGHT = Dimensions.get("window").height;




const PlusBadge = ({ navigation}) => {
  const [isOpenPlusBadgeOption, setIsOpenPlusBadgeOption] = useState(false);
  const [isScanQRCode, setIsScanQRCode] = useState(false);

  return (
    <>
      <Pressable
        style={styles.plusBadge}
        // onPress={() => setIsOpenPlusBadgeOption(!isOpenPlusBadgeOption)}
        onPress={() => navigation.navigate("QRCode")}
      >
        <Text style={styles.plusSign}>+{isOpenPlusBadgeOption}</Text>
      </Pressable>
      {/* {isOpenPlusBadgeOption && (
        <View style={styles.plusBadgeOption}>
          <Pressable onPress={() => navigation.navigate("QRCode")}><Text style={styles.optionText}>Scan QR Code</Text></Pressable>
          <Text style={styles.optionText}>Set up manually</Text>
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  plusBadge: {
    height: 80,
    width: 80,
    backgroundColor: "#bad6ff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 50,
  },
  plusSign: {
    fontSize: 40,
  },
  // plusBadgeOption: {
  //   position: "absolute",
  //   right: 50,
  //   top: WINDOW_HEIGHT - 300,
  //   borderRadius: 50,
  // },
  // optionText: {
  //   fontSize: 20,
  //   marginBottom: 10,
  // },
});

export default PlusBadge;
