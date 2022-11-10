import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowWidth, windowHeight } from "../assets/constants";
import CustomInput from "../Components/CustomInput";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import CustomButton from "../Components/CustomButton";
import { Auth } from "aws-amplify";
const ChangePassword = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    if (oldPassword === "" || newPassword === null || newPassword.length < 5) {
      setError("Password must be longer");
      setLoading(false);
      return;
    }

    try {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then((data) => {
          console.log("SUCCES", data);
          alert("Password changed successfully!");
          setLoading(false);
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);
          setError(err.message)
          return;
        });
    } catch (e) {}
  };

  if (false) {
    return <Loader />;
  } else {
    return (
      <KeyboardAvoidingWrapper>
        <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
          <View style={styles.ellipse}></View>
          <View style={styles.ellipse2}></View>
          <HeaderTop
            style={{ marginLeft: margins }}
            leftIcon={"chevron-back-outline"}
            rightIcon={"md-notifications"}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={()=> navigation.navigate("Notifications")}
          />
          <Text
            style={[
              fonts.h1x,
              {
                textAlign: "center",
                marginTop: RFValue(45),
                color: colors.PrimaryColor,
              },
            ]}
          >
            CHANGE PASSWORD
          </Text>
          <View style={{ marginTop: 100, flex: 1, borderRadius: 20 }}>
            <LinearGradient
              colors={["rgba(255, 154, 158, 1)", "rgba(250, 208, 196, 1)"]}
              style={styles.gradient}
            ></LinearGradient>

            <View
              style={{
                margin: margins,
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                padding: margins,
                alignItems: "center",
                height: windowHeight / 1.5,
              }}
            >
              <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                Old Password
              </Text>
              <CustomInput
                placeholder={"Password"}
                icon="lock"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye" : "eye-off"}
                onPressRight={(
                  pass = showPassword,
                  setPass = setShowpassword
                ) => {
                  setPass(!pass);
                }}
                value={oldPassword}
                onChangeText={(data) => {
                  setOldPassword(data);
                }}
              />
              <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                New Password
              </Text>
              <CustomInput
                placeholder={"New Password"}
                icon="lock"
                value={newPassword}
                secureTextEntry={!showNewPassword}
                rightIcon={showNewPassword ? "eye" : "eye-off"}
                onPressRight={(
                  pass = showNewPassword,
                  setPass = setShowNewPassword
                ) => {
                  setPass(!pass);
                }}
                onChangeText={(data) => {
                  setNewPassword(data);
                }}
              />
              <CustomButton
                width={windowWidth - 100}
                height={60}
                onPress={onSubmit}
                disabled={loading}
                text={loading ? "Loading..." : "Submit"}
                style={{ marginTop: margins }}
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
              <View style={{ height: 100 }}></View>
            </View>
          </View>
          <View style={{ marginTop: margins }}></View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    );
  }
};
export default ChangePassword;
const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  item: {
    height: 80,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    borderRadius: RFValue(20),
  },
  ellipse2: {
    ...StyleSheet.absoluteFillObject,
    width: 450,
    height: 400,
    top: RFValue(windowHeight / 2.1),
    borderRadius: 1200,
    left: RFValue(66),
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  Text: {
    ...fonts.buttonFont,
    fontSize: 18,
    color: colors.PrimaryColor,
    alignSelf: "baseline",
  },
  card: {
    // paddingHorizontal: RFValue(25),
    // paddingTop: RFValue(40),
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,

    elevation: 2,
  },
});
