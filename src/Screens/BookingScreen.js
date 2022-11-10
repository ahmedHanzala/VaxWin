import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { fonts } from "../assets/fonts/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, PanResponder } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { windowHeight, windowWidth, margins } from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/colors/colors";
import AvatarRenderComponent from "../Components/AvatarRenderComponent";
import { useSelector } from "react-redux";

const BookingScreen = ({navigation}) => {
  const children = useSelector(state=> state.children.children)

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.ellipse}></View>
      <View style={styles.topIcons}>
        <Ionicons
          name="chevron-back-outline"
          size={36}
          color={colors.PrimaryColor}
          onPress={()=> navigation.goBack()}
        />
        <Ionicons
          name="md-notifications"
          size={32}
          color={colors.PrimaryColor}
          onPress={()=> navigation.navigate("Notifications")}
        />
      </View>
      <View style={{ marginHorizontal:margins,marginTop:RFValue(60),marginBottom:RFValue(20)}}>
        <Text style= {[fonts.smallText,{fontSize:RFValue(20),color:colors.PrimaryColor}]}>
            BOOK VACCINATION
        </Text>
      </View>
      <View style={{flex:1, }}>
        <Carousel
          data={children}
          renderItem={(child) => <AvatarRenderComponent child={child} navigation={navigation}/>}
          sliderWidth={windowWidth / 1}
          itemWidth={windowWidth / 1}
          onSnapToItem={console.log("MISA")}
          activeSlideAlignment="start"
          removeClippedSubviews={false}
          inactiveSlideOpacity={1}
         
          inactiveSlideScale={0.6}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default BookingScreen;

const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: margins,
  },
});

