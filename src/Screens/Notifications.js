import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NotificationsA from "expo-notifications";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowWidth, windowHeight } from "../assets/constants";
import CustomButton from "../Components/CustomButton";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { useDispatch, useSelector } from "react-redux";
import CustomItem from "../Components/CustomItem";
import { ScrollView } from "react-native-gesture-handler";
import { resetNotifications } from "../Redux/Slices/NotificationsSlice";

const Notifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const notificationList = useSelector(
    (state) => state.notifications.notifications
  );
  const onSubmit = async () => {
    dispatch(resetNotifications())

  };

  if (false) {
    return <Loader />;
  } else {
    return (
        
          <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
            <ScrollView>
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
              NOTIFICATIONS
            </Text>
            <View
              style={{
                marginTop: 100,
                flex: 1,
                borderRadius: 20,
                height: windowHeight,
                marginHorizontal: 20,
              }}
            >
              {notificationList.map((item) => {
                return (
                  <CustomItem
                    icon={"bell"}
                    title={item.title}
                    subtitle={item.body}
                    color={colors.colorPositive}
                    iconColor={colors.colorPositive}
                  />
                );
              })}
            </View>

            <View style={{ marginTop: margins }}></View>
            </ScrollView>
            <View style={styles.clear}>
            <CustomButton
                  width={windowWidth - 40}
                  height={70}      
                  onPress={onSubmit}
                  text={"Clear"}
                  style={{ marginTop: margins,marginLeft:20, }}
                />
        </View>
  
          </SafeAreaView>
       
    );
  }
};
export default Notifications;
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
  clear: {
    position: "absolute",
    top: windowHeight - RFValue(180),
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
