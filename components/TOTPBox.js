import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getTOTP, getTOTPToken } from '../utils/string';


const TOTPBox = ({url}) => {

    const [totpParms, setTotpParms] = useState({})
    const [totpCode, setTotpCode] = useState('')
    const [totpCounter, setTotpCounter] = useState(0)

    useEffect(() => {
        setTotpParms(getTOTP(url));
        setTotpCode(getTOTPToken(url).otp);
        setTotpCounter(getTOTPToken(url).expires);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotpCode(getTOTPToken(url).otp);
            setTotpCounter(getTOTPToken(url).expires);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <View style={styles.container}>
        <View>
            <Text style={{fontSize: 24}}>{totpParms?.parameters?.issuer}</Text>
            <Text>{totpParms?.email}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 48, fontWeight: '700'}}>{totpCode}</Text>
                <View style={styles.circle}>
                    <Text style={{fontSize: 42}}>{totpCounter}</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 20,
      borderBlockColor: "black",
      borderBlockWidth: 2,
      marginBottom: 20,
    },
    circle: {
      height: 80,
      width: 80,
      borderRadius: 50,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default TOTPBox