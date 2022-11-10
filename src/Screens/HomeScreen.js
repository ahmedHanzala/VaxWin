import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import CardWithImg from "../Components/CardWithImg";
import { margins, windowHeight, windowWidth } from "../assets/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import CustomCard from "../Components/CustomCard";
import colors from "../assets/colors/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import RowItem from "../Components/RowItem";
import CardButton from "../Components/CardButton";
import { useSelector } from "react-redux";
import HeaderTop from "../Components/HeaderTop";
import { parseDates } from "../Services/Parser";
import AppLoading from "expo-app-loading";
import { getImage } from "../Services/handleProfilePictures";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.profile.profile);
  const children = useSelector((state) => state.children.children);
  const blogs = useSelector((state) => state.blogs.blogs);

  // const updateRowItem = async (index) => {
  //   setVaccineName(children[index].nextDueVaccine.nextDueList[0].name);
  //   setDate(parseDates(children[index].nextDueVaccine.date, true));
  //   setCacheKey(children[index].image);
  //   if (children[index].image !== "") {
  //     const img = await getImage(image);
  //     setImage(img);
  //   } else {
  //     setImage("");
  //   }
  // };

  if (user.name && children && blogs) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginLeft: margins,
          marginBottom: Platform.OS === "ios" ? 80 : 0,
        }}
        edges={["right", "left", "top"]}
      >
        <View style={styles.ellipse}></View>
        <View style={styles.ellipse2}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderTop
            leftIcon={"md-menu"}
            rightIcon={"md-notifications"}
            onPressLeft={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            onPressRight={() => navigation.navigate("Notifications")}
          />
          <View style={styles.headingSection}>
            <Text style={[fonts.h1, { color: colors.PrimaryColor }]}>
              Hello{" "}
              {user.name.length > 9
                ? user.name.substring(0, 8) + ","
                : user.name + ","}
            </Text>
            <Text
              style={[
                fonts.h2,
                {
                  color: colors.PrimaryColor,
                  paddingTop: margins,
                  paddingBottom: 12,
                },
              ]}
            >
              VACCINATION HISTORY
            </Text>
          </View>
          <View style={{ height: 190 }}>
           {children.length === 0 ? (
              <Carousel
                data={[{ name: "No Child Added" }]}
                renderItem={(child) => <CustomCard props={child} />}
                sliderWidth={windowWidth}
                key={"rerender"}
                itemWidth={windowWidth / 1.5}
                activeSlideAlignment="start"
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.6}
              />
            ) : ( 
              <Carousel
                data={children}
                renderItem={(child) => <CustomCard props={child} />}
                sliderWidth={windowWidth}
                itemWidth={windowWidth / 1.5}
                activeSlideAlignment="start"
                inactiveSlideOpacity={1}
                // ListEmptyComponent={() => <CustomCard props={{ name: "No Child Added" }}/>}
                inactiveSlideScale={0.6}

              />
            )} 
          </View>
          {children.length >= 1 ? <RowItem /> : null}
          <View style={styles.buttonSection}>
            <CardButton
              title={"Book Vaccination"}
              subtitle={"Book Now"}
              onPress={() => {
                navigation.navigate("BookingScreen");
              }}
            />
            <CardButton
              title={"Add Child"}
              subtitle={"Add"}
              onPress={() => {
                navigation.navigate("AddChild");
              }}
            />
          </View>
          <View style={styles.buttonSection}>
            <CardButton
              title={"Vaccination Center Nearby"}
              subtitle={"Check"}
              onPress={() => {
                navigation.navigate("VaccinationCenterNearby");
              }}
            />
            <CardButton
              title={"Ask Doctor"}
              subtitle={"Connect"}
              onPress={() => {
                navigation.navigate("AskDoctor");
              }}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("BlogScreen")}>
              <Text
                style={[
                  fonts.smallText,
                  {
                    color: colors.PrimaryColor,
                    textAlign: "right",
                    marginRight: 20,
                    marginTop: margins,
                  },
                ]}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 0,
              marginTop: 5,
              paddingBottom: Platform.OS === "ios" ? 0 : RFValue(80),
            }}
          >
            <Carousel
              data={blogs}

              renderItem={(item) => (
                <CardWithImg
                  title={item.item.title}
                  image={item.item.image}
                  description={item.item.description}
                  navigation={navigation}
                />
              )}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              activeSlideAlignment="center"
              inactiveSlideScale={0.6}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    // <Loader/>
    return <AppLoading />;
  }
};
const styles = StyleSheet.create({
  headingSection: {
    paddingTop: RFValue(30),
  },
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: -100,
    width: 450,
    height: 400,
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
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
  buttonSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
});
export default HomeScreen;

//https://github.com/meliorence/react-native-snap-carousel
