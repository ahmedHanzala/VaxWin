import React, { useCallback } from "react";
import {
  margins,
  TOTAL_VACCINES,
  windowHeight,
  windowWidth,
} from "../assets/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Platform, Alert,Image } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { getImage } from "../Services/handleProfilePictures";
import { useDispatch } from "react-redux";
import {
  completeBookingState,
  setRefresh,
} from "../Redux/Slices/ChildrenSlice";
import colors from "../assets/colors/colors";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import HeaderTop from "../Components/HeaderTop";
import { Avatar } from "react-native-paper";
import { fonts } from "../assets/fonts/fonts";
import CustomButton from "../Components/CustomButton";
import { useEffect } from "react";
import { List, Divider } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-native-paper";
import { calculateAge, getLongDate, parseDates } from "../Services/Parser";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../Components/Loader";
import CacheImage from "../Services/CacheImage";
import { completeBookingQuery } from "../graphql/custom-queries";
let rerender = false;
const Calender = (props) => {
  const refresh = useSelector((state) => state.children.refresh);
  const children = useSelector((state) => state.children.children);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [length, setLength] = useState(null);
  const [image, setImage] = useState("");
  const [cacheKey, setCacheKey] = useState(null);

  const setInfo = async () => {
    if (children.length >= 1) {
      setName(children[0].name);
      setAge(calculateAge(children[0].DOB));
      setLength(children[0].vaccinesTaken.length);
      if (children[0].image !== "") {
        const img = await getImage(children[0].image);
        setImage(img);
        setCacheKey(children[0].image);
      } else {
        setImage("");
      }
    } else {
      setName("No Children Added");
      setAge("0 Years");
      setLength(0);
    }
  };
  useEffect(() => {
    setInfo();
  }, []);
  const onSnap = async (index) => {
    if (children[index].image !== "") {
      const img = await getImage(children[index].image);
      setImage(img);
      setCacheKey(children[index].image);
    } else {
      setImage("");
    }
    setName(children[index].name);
    setAge(calculateAge(children[index].DOB));
    setLength(children[index].vaccinesTaken.length);
  };
  if (!children || name === null) {
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
          leftIcon={"md-menu"}
          rightIcon={"md-notifications"}
          onPressLeft={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          onPressRight={() => props.navigation.navigate("Notifications")}
        />

        <View style={{ flexDirection: "row", marginTop: "7%" }}>
          {image !== "" ? (
            <CacheImage
              uri={image}
              background={false}
              nameOfImage={cacheKey}
              key={cacheKey}
              style={{
                borderWidth: 3,
                borderColor: colors.PrimaryColor,
                borderRadius: 60,
                backgroundColor: "gray",
                marginLeft: 20,
                width: RFValue(70),
                height: RFValue(70),
              }}
            />
          ) : (
            <Image
            source={require("../assets/images/baby.png")}
              style={{
                borderWidth: 3,
                width:RFValue(70),
                height: RFValue(70),
                borderColor: colors.PrimaryColor,
                borderRadius: 60,
                backgroundColor: "rgb(138, 168, 166)",
                marginLeft: 20,
              }}
             
            />
          )}
          <View style={{ marginLeft: "5%", marginTop: "3%" }}>
            <Text
              style={[fonts.h1x, { color: colors.PrimaryColor, fontSize: 20 }]}
            >
              {name.length > 9
                ? name.substring(0, 7).toUpperCase() + "..."
                : name.toUpperCase()}
            </Text>
            <Text
              style={[
                fonts.p,
                {
                  letterSpacing: Platform.OS === "ios" ? "10%" : RFValue(18),
                  color: colors.PrimaryColor,
                },
              ]}
            >
              {age}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -20,
          }}
        >
          <ProgressBar
            style={{
              width: windowWidth - margins * 3,
              marginTop: 20,
              marginBottom: 10,
              height: 10,
              borderRadius: 20,
            }}
            progress={length / TOTAL_VACCINES}
            color={"#60D1CD"}
          />
        </View>
        <Carousel
          data={children}
          renderItem={(child) => (
            <RenderComponent
              props={child.item.bookings}
              DOB={child.item.DOB}
              childID={child.item.id}
            />
          )}
          onBeforeSnapToItem={onSnap}
          extraData={refresh}
          sliderWidth={windowWidth}
          itemWidth={windowWidth / 1}
          activeSlideAlignment="center"
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.6}
        />
      </SafeAreaView>
    );
  }
};

function RenderComponent(props) {
  const refresh = useSelector((state) => state.children.refresh);
  const [list, setList] = useState();
  const getPendingVaccines = () => {
    const PendingBookings = props.props.filter(
      (item) => item.status === "Pending"
    );
    setList(PendingBookings);
  };
  useEffect(() => {
    getPendingVaccines();
  }, [refresh]);
  return (
    <View
      style={[
        styles.card,
        { height: "77%", width: "82%", borderRadius: 20, marginTop: 20 },
      ]}
    >
      <LinearGradient
        start={[1, 0]}
        end={[1, 1]}
        colors={["#FF9A9E", "#FAD0C4"]}
        style={[styles.gradient, { flex: 1, borderRadius: 20 }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              fonts.h1x,
              { letterSpacing: 2, color: "white", marginTop: 20, fontSize: 24 },
            ]}
          >
            {getLongDate(props.DOB)}
          </Text>
          <Text
            style={[
              fonts.smallText,
              { fontSize: 16, color: "white", letterSpacing: 2, marginTop: 10 },
            ]}
          >
            AGE: {calculateAge(props.DOB)}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          extraData={refresh}
          renderItem={(item) => (
            <RenderListItem booking={item} childID={props.childID} />
          )}
        />
      </LinearGradient>
    </View>
  );
}
const RenderListItem = ({ booking, childID }) => {
  const refresh = useSelector((state) => state.children.refresh);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [address,setAddress] = useState(booking.item.location === "Vaccination Center"? booking.item.address: booking.item.location)

  const completeBooking = async () => {
    setLoading(true);
    const response = await completeBookingQuery(
      booking.item.id,
      booking.item.bookingVaccineId,
      childID
    );
    if (response !== false) {
      //update state
      dispatch(
        completeBookingState({
          childID,
          bookingID: booking.item.id,
          vaccineTaken: response.data.createVaccineChild,
        })
      );
      Alert.alert("Success", "Booking marked as completed Successfully");
      dispatch(setRefresh(!refresh));
      setShowConfirm(false);
    } else {
      Alert.alert("Oops", "Operation failed please try again later.");
    }
    setLoading(false);
  };
  if (loading === false) {
    return (
      <View style={{ marginLeft: RFValue(26) }}>
        <List.Item
          title={booking.item.Vaccine.name}
          titleStyle={[fonts.h2x]}
          onPress={() => setShowConfirm(!showConfirm)}
          description={"Due on " + parseDates(booking.item.date, true) + (showConfirm ? ("\n" + address):"") }
          descriptionStyle={[fonts.smallText, { color: "white" }]}
          left={(props) => (
            <List.Icon
              color={showConfirm ? "#60D1CD" : "white"}
              icon="square"
            />
          )}
       
        />
  
        {showConfirm ? (
          <View style={{}}>
            <CustomButton
              text={"Complete"}
              width={"60%"}
              style={styles.confirmButton}
              fontsize={{ fontSize: RFValue(14) }}
              onPress={() =>
                Alert.alert("Confirmation", "Mark this vaccine as completed?", [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: () => {
                      completeBooking();
                    },
                  },

                  {
                    text: "No",
                  },
                ])
              }
            />
          </View>
        ) : null}
      </View>
    );
  } else {
    return <Loader style={{ marginTop: 20 }} color={"white"} />;
  }
};
export default Calender;
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
  confirmButton: {
    marginLeft: "15%",
    backgroundColor: "rgba(96, 209, 205, 0.5)",
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
