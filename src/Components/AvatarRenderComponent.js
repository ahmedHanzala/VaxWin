import React from "react";
import { Avatar } from "react-native-paper";
import { windowHeight, TOTAL_VACCINES } from "../assets/constants";
import { getImage } from "../Services/handleProfilePictures";
import { RFValue } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Platform ,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";
import { margins, windowWidth } from "../assets/constants";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addDays, compare, compareDates, parseDates } from "../Services/Parser";
import CacheImage from "../Services/CacheImage";

const AvatarRenderComponent = (props) => {
  //props.child.item
  const [image, setImage] = useState("");
  const [lastVaccinatedName, setLastVaccinatedName] = useState(undefined);
  const [lastVaccinatedDate, setLastVaccinatedDate] = useState(undefined);
  const [completedVaccines, setCompletedVaccines] = useState(0);
  const [overDue, setOverDue] = useState(false);
  const [dueDateInMM, setDueDateInMM] = useState();
  const [nextVaccineDueDate, setNextVaccineDueDate] = useState(null);
  const [nextDueVaccinesList, setNextDueVaccinesList] = useState(null);
  const [cacheKey,setCacheKey] = useState(null)

  const loadImage = async () => {
    if(props.child.item.image !=="")
    {
    setCacheKey(props.child.item.image)
    const ImageURI = await getImage(props.child.item.image);
    setImage(ImageURI);
    }
    else
    {
      setImage("");
    }
  
  };
  const getLastVaccinated = () => {
    const last = props.child.item.bookings.filter((item) => {
      return item.status === "Completed";
    });
    setCompletedVaccines(last.length);
    if(last.length!==0)
    {
      
    const dateArray = last.map((e) => new Date(e.date));
    let latest = new Date(Math.max(...dateArray));
    const newDate = parseDates(latest, false);
    const XXX = last.find((item) => item.date === newDate);
    setLastVaccinatedDate(parseDates(latest, true));
    setLastVaccinatedName(XXX.Vaccine.name);
    }
    else
    {
      setLastVaccinatedDate(null);
      setLastVaccinatedName("No Vaccines Given");
    }
  };

  const nextDueVaccine = async () => {
    setNextVaccineDueDate(parseDates(props.child.item.nextDueVaccine.date,true));
    setNextDueVaccinesList(props.child.item.nextDueVaccine.nextDueList);
  };
  useEffect(() => {
    nextDueVaccine();
    loadImage();
    getLastVaccinated();
  }, []);
  if (nextDueVaccinesList) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topView}>
          {(image !=="") ? (
            <CacheImage
            uri={image}
            nameOfImage={cacheKey}
            background={false}
            style={{
              borderWidth: 5,
              borderColor: colors.PrimaryColor,
              borderRadius: 60,
              backgroundColor: "gray",
              marginLeft: 20,
              width:RFValue(70),
              height:RFValue(70),
            }}
            />
          ) : (
            <Image
            source={require("../assets/images/baby.png")}
             
              style={{
                width: RFValue(70),
                borderWidth: 5,
                borderColor: colors.PrimaryColor,
                marginLeft: 20,
                height: RFValue(70),
                borderRadius: 60,
                backgroundColor: 'rgb(138, 168, 166)',
                
              }}
              
            />
          )}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                fonts.smallText,
                {
                  flex: 1,
                  marginVertical: margins,
                  paddingHorizontal: margins,
                  fontSize: RFValue(16),
                  color: colors.PrimaryColor,
                },
              ]}
            >
              {props.child.item.name}
            </Text>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              color={colors.PrimaryColor}
              style={{
                marginRight: margins,
                paddingVertical: margins,
              }}
            />
          </View>
        </View>

        <View style={styles.bottomCard}>
          <LinearGradient
            colors={["rgba(255, 154, 158, 1)", "rgba(250, 208, 196, 1)"]}
            style={styles.gradient}
          ></LinearGradient>
          <View style={styles.innerCard}>
            <Text style={[styles.primaryText]}>Last Vaccinated</Text>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.secondaryText}>{lastVaccinatedName}</Text>
              <Text style={styles.secondaryText}>{lastVaccinatedDate}</Text>
            </View>
            <Text style={[styles.primaryText, { marginTop: 30 }]}>
              Next Due Vaccine
            </Text>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View>
                {nextDueVaccinesList.map((item) => (
                  <Text style={styles.secondaryText}>{item.name}</Text>
                ))}
              </View>
              <Text style={styles.secondaryText}>{nextVaccineDueDate}</Text>
            </View>
            <Text style={[styles.primaryText, { marginTop: 30 }]}>
              Total Given
            </Text>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.secondaryText}>
                {completedVaccines}/{TOTAL_VACCINES}
              </Text>
              <Text style={styles.secondaryText}>
                {TOTAL_VACCINES - completedVaccines} Doses Due
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <CustomButton
                width={windowWidth - 80}
                height={60}
                onPress={() => {
                  props.navigation.navigate("Calender");
                }}
                text={"View Scedule"}
                style={{ marginTop: margins + 10 }}
              />
              <CustomButton
                width={windowWidth - 80}
                height={60}
                
                onPress={() => {
                  props.navigation.navigate("BookDate", {
                    child: props.child.item,
                    nextDueVaccinesList,
                    nextVaccineDueDate: props.child.item.nextDueVaccine.date,
                    overDue,
                  });
                }}
                text={"Book Date"}
                style={{ marginTop: margins }}
              />
            </View>
            
          </View>
        
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        }}
      >
        <ActivityIndicator color={colors.PrimaryColor} />
      </View>
    );
  }
};
export default AvatarRenderComponent;

const styles = StyleSheet.create({
  bottomCard: {
    flex: 1,
    borderRadius: RFValue(20),
    height: Platform.OS==='android'?windowHeight +120:windowHeight,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
    borderRadius: RFValue(20),
  },
  innerCard: {
    margin: margins,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: Platform.OS==='ios'? 120: '0%',
    padding: 10,
  },
  secondaryText: {
    ...fonts.h2,
    fontSize: 16,
    color: colors.textGray,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  primaryText: {
    ...fonts.buttonFont,
    fontSize: 18,
    color: colors.PrimaryColor,
  },
});
