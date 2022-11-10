import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { windowHeight, windowWidth } from "../assets/constants";
import Background from "../assets/images/yellow-child.svg";
import { Auth } from "aws-amplify";

const ConfirmEmailScreen = ({ route, navigation }) => {
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { email } = route.params;
  const onConfirmPressed = async () => {
    if(loading)
    {
        return;
    }
    setLoading(true)
    try {
      const response = await Auth.confirmSignUp(email, code);
      Alert.alert("Success", "Account has been successfully created.")
      navigation.navigate("Login")
    } catch (e) {
      setError(e.message);
    }
    setLoading(false)
  };

  const onSignInPress = () => {};

  const onResendPress = async() => {
    try {
        const response = await Auth.resendSignUp(email);
        Alert.alert("Success", "Code was resent to your email")
      } catch (e) {
        setError(e.message);
      }

  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1, marginBottom: '50%' }}>
         <Image
          source={require("../assets/images/yellow-baby-with-hand.png")}
          style={styles.background}
          // resizeMode="auto"
        /> 
        {/* <Background /> */}
        <LinearGradient
          colors={[colors.gradientColorRed, colors.gradientColorPink]}
          style={styles.gradient}
        ></LinearGradient>
        {/* Background ends here below is main code*/}
        <View style={styles.footer}></View>

        <View style={styles.card}>
          <View>
            <View style={styles.textSection}>
              <Text
                style={[
                  fonts.h1,
                  { fontSize: RFValue(24), color: colors.textDefault },
                ]}
              >
                Confirm Your Email
              </Text>
              <Text
                style={[
                  fonts.h2,
                  {
                    fontSize: RFValue(14),
                    marginTop: 10,
                    color: colors.textDefault,
                  },
                ]}
              >
                Verification code has been sent to {JSON.stringify(email)}
              </Text>
            </View>
            <View style={styles.inputSection}>
              <CustomInput
                placeholder={"Enter Verification Code"}
                icon="lock"
                value={code}
                onChangeText={setCode}
              />
              <CustomButton
                text={loading ? "Loading..." : "Confirm"}
                onPress={onConfirmPressed}
                width={RFValue(300)}
                height={RFValue(56)}
                style={styles.input}
                disabled={loading}
              />
            </View>
            {error && (
              <Text
                style={[fonts.smallText, { color: "red", textAlign: "center" }]}
              >
                {error}
              </Text>
            )}
            <Text
              style={[
                fonts.smallText,
                styles.input,
                {
                  color: colors.textGray,
                  marginLeft: (windowWidth - RFValue(300)) / 1.8,
                },
              ]}
            >
              Didn't Recieve a code?{" "}
              <Text
                onPress={onResendPress}
                style={[fonts.smallText, { color: colors.textDefault }]}
              >
                Resend Code
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  background: {
    flex: 3,
  },
  footer: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF6F8",
    borderTopLeftRadius: RFValue(40),
    borderTopRightRadius: RFValue(40),
    position: "absolute",
    width: windowWidth,
    height: windowHeight / 1.5,
    top: windowHeight / 2.5,

    shadowColor: "rgba(230, 230, 230, 0.3)",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  inputSection: {
    alignItems: "center",
  },
  textSection: {
    marginLeft: (windowWidth - RFValue(300)) / 2,
    paddingTop: RFValue(40),
    paddingBottom: RFValue(30),
  },
  input: {
    marginTop: RFValue(16),
    color: colors.textGray,
  },
});

export default ConfirmEmailScreen;
