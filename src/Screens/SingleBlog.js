import React, { useEffect, useState } from "react";
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
import { List } from "react-native-paper";
import { color } from "react-native-reanimated";
const SingleBlog = ({route,navigation}) => {


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
            onPressRight={() => console.log("PRESSED")}
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
            {route.params.title.toUpperCase()}
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
              }}
            >
              <Text  style={[fonts.smallText, { color: colors.textGray, fontSize: RFValue(12) }]}>
                {route.params.description}


              </Text>
              
              <View style={{ height: windowHeight/1.5 }}></View>
            </View>
          </View>
          <View style={{ marginTop: margins }}></View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    );
  }
};
export default SingleBlog;
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


