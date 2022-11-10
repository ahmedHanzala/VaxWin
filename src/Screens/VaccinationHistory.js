import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowWidth, windowHeight } from "../assets/constants";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import CustomItem from "../Components/CustomItem";
import { useEffect } from "react";
import { getLongDate } from "../Services/Parser";

const VaccinationHistory = ({ navigation }) => {
  const children = useSelector((state) => state.children.children);
  const [list, setList] = useState(false);
  const vaccinesTaken = () => {
    const list = children.map((child) => child.bookings);
    var merged = [].concat.apply([], list);
    merged = merged.filter((item) => item.status === "Completed");
    setList(merged);
  };
  useEffect(() => {
    vaccinesTaken();
  }, []);

  if (false) {
    return <Loader />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 ,marginBottom:0,}} edges={["right", "left", "top"]}>
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
          VACCINATION HISTORY
        </Text>
        <View style={{ flex: 1 ,marginLeft:10,marginTop:20,}}>
          <FlatList
          style={{ marginBottom:'20%' }}
            data={list}
            renderItem={(item) => (
              <CustomItem
                title={item.item.Vaccine.name}
                subtitle={getLongDate(item.item.date)}
                icon={"hospital"}
                color={colors.colorPositive}
                style={{ marginLeft:10, }}
                
                
              />
            )}
          />
        </View>
        <View style={{ marginTop: margins }}></View>
      </SafeAreaView>
    );
  }
};
export default VaccinationHistory;
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
