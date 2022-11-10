import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Card, Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";
import { getImage } from "../Services/handleProfilePictures";
import { useState } from "react";
import { useEffect } from "react";
import CacheImage from "../Services/CacheImage";
import { windowHeight, windowWidth } from "../assets/constants";
import { useDispatch } from "react-redux";
import { updateCurrentDueVaccine } from "../Redux/Slices/CurrentDueVaccine";
import { parseDates } from "../Services/Parser";
const CustomCard = (props) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [cacheKey, setCacheKey] = useState(false);
  const updateRow = () => {
    if(props.props.item.nextDueVaccine)
    {
    dispatch(
      updateCurrentDueVaccine({
        vaccineName: props.props.item.nextDueVaccine.nextDueList[0].name,
        date: props.props.item.nextDueVaccine.date,
        image: props.props.item.image,
        imageURI: image,
      })
      
    );
    }
  };
  const loadImage = async () => {
    if (props.props.item.image === "" || props.props.item.image === undefined ) {
      setImage("");

    } else {
      setCacheKey(props.props.item.image);
      const ImageURI = await getImage(props.props.item.image);
      setImage(ImageURI);
    }
  };
  useEffect(() => {
    loadImage();
  },[image]);

  const LeftContent = (props) =>
    image !== "" ? (
      <CacheImage
        uri={image}
        nameOfImage={cacheKey}
        background={false}
        style={{
          width: RFValue(70),
          height: RFValue(70),
          borderRadius: 60,
          backgroundColor: 'gray',
        }}
      />
    ) : (
      <Image
      source={require("../assets/images/baby.png")}
      style={{
        width: RFValue(70),
        height: RFValue(70),
        borderRadius: 60,
        backgroundColor: 'transparent',
      }}
    />
    );

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={updateRow}>
      <Card style={styles.card} elevation={5}>
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[colors.gradientColorRed, colors.gradientColorPink]}
            style={styles.gradient}
          ></LinearGradient>
          <View style={styles.leftContent}>
            <View style={styles.avatar}>
              <LeftContent />
            </View>
            <View style={styles.bottomText}>
              <Text
                style={[
                  fonts.smallText,
                  { textAlign: "center", color: "white" },
                ]}
              >
                {" "}
                {props.props.item.name}
              </Text>
            </View>
          </View>
          <View style={styles.cardInner}>
            <Card style={styles.pinkCard}>
              <Card.Title
                title="Vaccinations"
                titleStyle={[fonts.smallText, { fontSize: 16, color: "white" }]}
              ></Card.Title>
              <Card.Content style={{ position: "relative", top: RFValue(-15) }}>
                {props.props.item.name === "No Child Added" ? null : props.props
                    .item.vaccinesTaken.length > 0 ? (
                  <Text
                    style={[fonts.smallText, { color: "white", fontSize: 12 }]}
                  >
                    {"\u279C"} {props.props.item.vaccinesTaken[0].vaccine.name}
                  </Text>
                ) : null}
                {props.props.item.name === "No Child Added" ? null : props.props
                    .item.vaccinesTaken.length > 1 ? (
                  <Text
                    style={[fonts.smallText, { color: "white", fontSize: 12 }]}
                  >
                    {"\u279C"} {props.props.item.vaccinesTaken[1].vaccine.name}
                  </Text>
                ) : null}
                {props.props.item.name === "No Child Added" ? null : props.props
                    .item.vaccinesTaken.length > 2 ? (
                  <Text
                    style={[fonts.smallText, { color: "white", fontSize: 12 }]}
                  >
                    {"\u279C"} {props.props.item.vaccinesTaken[2].vaccine.name}
                  </Text>
                ) : null}
              </Card.Content>
            </Card>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Platform.OS === "ios" ? windowWidth / 1.45 : windowWidth / 1.45,
    height: "94%",
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    borderRadius: 10,
  },
  leftContent: {
    alignItems: "center",
    paddingLeft: 10,
    flex: 1.7,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
    paddingTop: 20,
  },
  bottomText: {
    flex: 1,
    width: 120,
  },
  cardInner: {
    flex: 4,
  },
  pinkCard: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "rgba(178, 73, 75, 0.3)",
    marginVertical: 30,
    marginLeft: 10,
    flex: 1,
    opacity: 0.8,
    shadowColor: "rgba(230, 230, 230, 0.3)",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
});
export default CustomCard;
