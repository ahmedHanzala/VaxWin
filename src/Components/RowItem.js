import React, { useEffect, useState } from "react";
import { StyleSheet,Image } from "react-native";
import { Text, TouchableOpacity, View} from "react-native";
import colors from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";
import { Avatar } from "react-native-paper";
import { windowWidth } from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";

import Loader from "./Loader";
import CacheImage from "../Services/CacheImage";
import { useDispatch, useSelector } from "react-redux";
import { getLongDate, parseDates } from "../Services/Parser";
const RowItem = () => {
const vaccine = useSelector(state=>state.currentDueVaccine)


  if (!vaccine) {
    return <Loader />;
  } else {
    return (
      <TouchableOpacity
        style={[styles.row]}
        activeOpacity={0.9}
   
      >
        <View style={{ flex: 1 }}>
          {vaccine.image === "" ? (
              <Image
              source={require("../assets/images/baby.png")}
              style={{
                backgroundColor: 'transparent',
                width: RFValue(50),
                height: RFValue(50),
                borderRadius: 60,

              }}
             
            />
          ) : (
            <CacheImage
              uri={vaccine.imageURI}
              nameOfImage={vaccine.image}
              background={false}
              key={vaccine.image}
              style={{
                width: RFValue(50),
                height: RFValue(50),
                borderRadius: 60,
                backgroundColor: "gray",
              }}
            />
          )}
        </View>
        <View style={{ flex: 3, paddingLeft: 20 }}>
          <Text style={[fonts.smallText, { color: "rgba(14, 132, 128, 1)" }]}>
            Next Due Vaccine
          </Text>
          <Text style={[fonts.h2, { color: "rgba(14, 132, 128, 1)" }]}>
            {vaccine.vaccineName}
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 18, color: "rgba(14, 132, 128, 1)" }}>
            {"\u279C"}
          </Text>
          <Text
            style={[
              fonts.smallText,
              {
                marginLeft: "-25%",
                textAlign: "left",
                paddingTop: RFValue(10),
                color: "rgba(14, 132, 128, 1)",
              },
            ]}
          >
            {vaccine.date.length<=3? null:getLongDate(vaccine.date)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};
export default RowItem;
const styles = StyleSheet.create({
  row: {
    width: windowWidth - 40,

    height: RFValue(75),
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.colorPositive,
  },
});
