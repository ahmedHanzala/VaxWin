import React, { useState, useEffect } from "react";
import { margins } from "../assets/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  StyleSheet,
  Image,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { windowHeight, windowWidth } from "../assets/constants";
import { useValidation } from "react-native-form-validator";
import { Auth } from "aws-amplify";
function containsAnyLetters(str) {
  return /[a-zA-Z]/.test(str);
}

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91-");
  const [showPassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { name, email, phone, password },
    });

  const _onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords did not match");
      return;
    }
    if(containsAnyLetters(phone))
    {
      setError("Please enter a valid phone number")
      return;
    }
    if(isFieldInError("phone") || isFieldInError("name") || isFieldInError("email") ||isFieldInError("password") )
    {
      setError("Invalid Fields!")
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const parsedPhone = phone.replace("-","")
      const response = await Auth.signUp({
        username: email,
        password: password,
        attributes: { phone_number: parsedPhone, name: name, email: email },
      });
      navigation.navigate("ConfirmEmailScreen", { email });
    } catch (error) {
      console.log("register log::", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1, marginBottom: 400 }}>
        <Image
          source={require("../assets/images/yellow-baby-with-hand.png")}
          style={styles.background}
          // resizeMode="auto"
        />
        
        {/* <Background/> */}
        <LinearGradient
          colors={[colors.gradientColorRed, colors.gradientColorPink]}
          style={styles.gradient}
        ></LinearGradient>
        {/* Background ends here below is main code*/}
        <View style={styles.topIcons}>
        <Ionicons
          name="chevron-back-outline"
          size={36}
          color={"white"}
          onPress={()=> navigation.goBack()}
        />    
        </View>
       
        <View style={styles.card}>
          
          <View>
            <View style={styles.textSection}>
              <Text style={[fonts.h1, { color: colors.textDefault }]}>
                REGISTER
              </Text>
              <Text style={[fonts.h2, { color: colors.textDefault }]}>
                Create Your New Account
              </Text>
            </View>

            <View style={styles.inputSection}>
              <CustomInput
                placeholder={"Full Name"}
                icon="account"
                value={name}
                onChangeText={(item) => {
                  setName(item);
                  validate({
                    name: { minlength: 3, maxlength: 15, required: true },
                  });
                }}
              />
              {isFieldInError("name") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("name")[0]}
                </Text>
              )}
              
             
              <CustomInput
                placeholder={"Email Address"}
                icon="email"
                value={email}
                onChangeText={(item) => {
                  setEmail(item);
                  validate({
                    email: {
                      require: true,
                      required: true,
                      email:true,
                    },
                  });
                }}
                style={styles.input}
              />
               {isFieldInError("email") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("email")[0]}
                </Text>
              )}

              <CustomInput
                placeholder={"Phone Number"}
                icon="phone"
                value={phone}
                onChangeText={(item) => {
                  setPhone(item);
                  validate({
                    phone: {
                      require: true,
                      required: true,
                      minlength: 13,
                      maxlength: 14,
                    },
                  });
                }}
                style={styles.input}
              />
              {isFieldInError("phone") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("phone")[0]}
                </Text>
              )}

              <CustomInput
                placeholder={"Password"}
                icon="lock"
                value={password}
                onChangeText={(item) => {
                  setPassword(item);
                  validate({
                    password: {
                      minlength: 8,
                      required: true,
                      hasNumber: true,
                    },
                  });
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
              <CustomInput
                placeholder={"Confirm Password"}
                icon="lock"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                rightIcon={showConfirmPassword ? "eye" : "eye-off"}
                onPressRight={(
                  pass = showConfirmPassword,
                  setPass = setShowConfirmPassword
                ) => {
                  setPass(!pass);
                }}
                style={styles.input}
              />

              <CustomButton
                text={loading ? "Loading..." : "Register"}
                onPress={_onRegister}
                width={RFValue(300)}
                disabled={loading}
                height={RFValue(56)}
                style={styles.input}
              />
              {error && (
                <Text
                  style={[
                    fonts.smallText,
                    { color: "red", textAlign: "center" },
                  ]}
                >
                  {error}
                </Text>
              )}
            </View>
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
              By signing up you've agree to our{" "}
              <Text style={[fonts.smallText, { color: colors.textDefault }]}>
                Our Terms of Use and Privacy Notice
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
    height: windowHeight * 2,
    top: windowHeight / 3.2,

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
    paddingTop: RFValue(30),
    paddingBottom: RFValue(16),
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

export default Register;
