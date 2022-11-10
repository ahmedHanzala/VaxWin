import React, { useEffect, useState } from "react";
import { fonts } from "../assets/fonts/fonts";
import { margins, windowHeight } from "../assets/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";
import { RFValue } from "react-native-responsive-fontsize";
import HeaderTop from "../Components/HeaderTop";
import { getVaccinationCenters } from "../graphql/custom-queries";
import Loader from "../Components/Loader";
import CustomItem from "../Components/CustomItem";
import { FlatList } from "react-native-gesture-handler";

const VaccinationCenterNearby = ({ navigation }) => {
  const [centerList,setCenterList] = useState([])

  const VaccinationCenters = async () => {
    const response = await getVaccinationCenters();
    setCenterList(response);
    if (!response) {
      alert("Network Error! could not get vaccination centers");
    }
  };
  useEffect(()=>{
    VaccinationCenters();
    console.log("CENTERLIST",centerList)

  },[])

  if (centerList.length<=1) {
    return <Loader />;
  } else {
    return (
      <SafeAreaView
        style={{ flex: 1, marginLeft: margins }}
        edges={["right", "left", "top"]}
      >
        <View style={styles.ellipse}></View>
        <View style={styles.ellipse2}></View>
        <HeaderTop
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
          VACCINATION CENTERS
        </Text>
        <View style={{ marginTop:margins+40 }}>
        <FlatList
        data={centerList}
        renderItem={(item) => 
        <CustomItem
          icon={"hospital-building"}
          title={item.item.name}
          subtitle={<Text>Address: {item.item.address} </Text>}
          color={colors.colorPositive}
        />}

        />
       
        </View>
      </SafeAreaView>
    );
  }
};
export default VaccinationCenterNearby;
const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  gradient: {
    opacity: 1,
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
