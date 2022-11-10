import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowWidth, windowHeight } from "../assets/constants";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { useSelector } from "react-redux";

const Contact = ({ navigation }) => {
  const user = useSelector((state) => state.profile.profile);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const onSubmit = async () => {};

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
            onPressRight={() => navigation.navigate("Notifications")}
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
            CONTACT US
          </Text>
          <View
            style={{
              marginTop: 100,
              flex: 1,
              borderRadius: 20,
              height: windowHeight,
            }}
          ></View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    );
  }
};
export default Contact;
const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  input: {
    paddingBottom: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 0.7,

    elevation: 2,
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
