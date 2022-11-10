import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { margins, windowHeight, windowWidth } from "../assets/constants";
import { useValidation } from "react-native-form-validator";
import Background from "../assets/images/yellow-child.svg";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //move this func to Auth
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { email, password },
    });

  const _onSignIn = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);

      const response = await Auth.signIn(email, password);
      console.log("LOGIN RESPONSE::", response);
      // dispatch(setProfile(response.attributes.sub))
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1 , marginBottom: '50%'}}>
        <Image
          source={require("../assets/images/yellow-baby-with-hand.png")}
          style={styles.background}
      
        />
        {/* <Background/>  */}
        <LinearGradient
          colors={[colors.gradientColorRed, colors.gradientColorPink]}
          style={styles.gradient}
        ></LinearGradient>
        <View style={styles.topIcons}>
        <Ionicons
          name="chevron-back-outline"
          size={36}
          color={"white"}
          onPress={()=> navigation.goBack()}
        />    
        </View>
        {/* Background ends here below is main code*/}
        <View style={styles.footer}></View>

        <View style={styles.card}>
          <View>
            <View style={styles.textSection}>
              <Text
                style={[
                  fonts.h1,
                  { fontSize: RFValue(36), color: colors.textDefault },
                ]}
              >
                Hello,
              </Text>
              <Text
                style={[
                  fonts.h2,
                  { fontSize: RFValue(20), color: colors.textDefault },
                ]}
              >
                Welcome To vaxWin
              </Text>
            </View>
            <View style={styles.inputSection}>
              <CustomInput
                placeholder={"Email"}
                icon="email"
                value={email}
                onChangeText={(data) => {
                  setEmail(data);
                  validate({
                    email: {
                      require: true,
                    },
                  });
                }}
              />
              {isFieldInError("email") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("email")[0]}
                </Text>
              )}

              <CustomInput
                placeholder={"Password"}
                icon="lock"
                value={password}
                onChangeText={(data) => {
                  setPassword(data);
                  validate({ email: { required: true } });
                }}
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye" : "eye-off"}
                onPressRight={(
                  pass = showPassword,
                  setPass = setShowpassword
                ) => {
                  setPass(!pass);
                }}
                style={styles.input}
              />
              {isFieldInError("password") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("password")[0]}
                </Text>
              )}

              <CustomButton
                text={loading ? "Loading..." : "Log In"}
                onPress={_onSignIn}
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
              Forgot your password?{" "}
              <Text
                onPress={() => {
                  navigation.navigate("ForgotPasswordScreen");
                }}
                style={[fonts.smallText, { color: colors.textDefault }]}
              >
                Reset Password
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
  topIcons: {
    position:'absolute',
    top:'06%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: margins,
  },
});

export default Login;
