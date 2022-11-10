import React, { useState } from "react";
import { addBooking, getVaccinationCenters } from "../graphql/custom-queries";
import { listVaccines } from "../graphql/queries";
import { compareDates } from "../Services/Parser";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../Components/CustomInput";
import { resetChildren, addChild } from "../Redux/Slices/ChildrenSlice";
import { LinearGradient } from "expo-linear-gradient";
import { getUser } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  ScrollView,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { updateCurrentDueVaccine } from "../Redux/Slices/CurrentDueVaccine";
import { listVaccineChildren, listBookings } from "../graphql/queries";
import Ionicons from "@expo/vector-icons/Ionicons";
import { compare } from "../Services/Parser";
import { RadioButton } from "react-native-paper";
import { margins, windowHeight, windowWidth } from "../assets/constants";
import { Checkbox } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import { Avatar } from "react-native-paper";
import colors from "../assets/colors/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../Components/CustomButton";
import { useEffect } from "react";
import { addDays, parseDates, getLongDate } from "../Services/Parser";
import { useDispatch, useSelector } from "react-redux";
import { schedulePushNotification } from "../Services/PushNotifications";
import { addNotification } from "../Redux/Slices/NotificationsSlice";
import GooglePlacesInput from "../Components/GooglePlacesAutocomplete";
var selectedVaccines = [];
const RenderItemVaccine = ({ vaccine }) => {
  const [checked, setChecked] = useState(false);

  const onPressResponse = (item) => {
    setChecked(!checked);
    console.log("SELECTION:: ", selectedVaccines);
    if (checked === false) {
      var found = false;
      if (selectedVaccines.length > 0) {
        if (!selectedVaccines.includes(vaccine)) {
          selectedVaccines.push(vaccine);
        }
      } else {
        selectedVaccines.push(vaccine);
      }
    } else {
      const index = selectedVaccines.indexOf(vaccine);
      if (index > -1) {
        selectedVaccines.splice(index, 1);
      }
    }
  };
  return (
    <Checkbox.Item
      label={vaccine.item.name}
      labelStyle={[fonts.smallText, { color: colors.textDefault }]}
      status={checked ? "checked" : "unchecked"}
      onPress={onPressResponse}
      style={{ borderRadius: 30, width: windowWidth / 1.3 }}
    />
  );
};

const BookDate = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("At Home");
  const [mode, setMode] = useState("date");
  const [formattedDate, setFormattedDate] = useState(null);
  const [show, setShow] = useState(Platform.OS === "ios");
  const [androidDevice, setAndroidDevice] = useState(Platform.OS === "android");
  const [minDate, setMinDate] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState(false);
  const [location, setLocation] = useState("");
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");

  const setMinandMaxDates = () => {
    if (props.route.params.overDue) {
      const min = new Date();
      setMinDate(min);
      const res = addDays(new Date(), 30);
      setMaxDate(res);
    } else {
      setMinDate(new Date(props.route.params.nextVaccineDueDate));
      const max = addDays(new Date(props.route.params.nextVaccineDueDate), 30);
      setMaxDate(max);
    }
  };
  const nextDueVaccine = async (bookings, DOB) => {
    const vaccinesNotTaken = await API.graphql({
      ...graphqlOperation(listVaccines),
      authMode: "API_KEY",
    });

    const notTaken = vaccinesNotTaken.data.listVaccines.items.filter((item) => {
      if (bookings.find((vaccine) => vaccine.Vaccine.id === item.id)) {
        return false;
      }
      return true;
    });

    let overDue = false;
    const nextVaccine = notTaken.sort(compare);
    let timing = nextVaccine[0].timingWeeks;
    const DueVaccines = nextVaccine.filter(
      (item) => item.timingWeeks === timing
    );
    //parse timing
    let date = addDays(DOB, timing * 7);
    if (compareDates(date, new Date()) === -1) {
      overDue = true;
    }
    date = parseDates(date, false);

    return {
      nextDueList: DueVaccines,
      overDue: overDue,
      date: date,
    };
  };

  const updateState = async (data) => {
    dispatch(resetChildren());
    data.forEach(async (child) => {
      const response = await API.graphql({
        ...graphqlOperation(listVaccineChildren, {
          filter: { childID: { eq: child.id } },
        }),
        authMode: "API_KEY",
      });
      const bookingResponse = await API.graphql({
        ...graphqlOperation(listBookings, {
          filter: { childID: { eq: child.id } },
        }),
        authMode: "API_KEY",
      });
      const nextDue = await nextDueVaccine(
        bookingResponse.data.listBookings.items,
        JSON.parse(child.DOB)
      );
      var parsedChild = {
        DOB: JSON.parse(child.DOB),
        id: child.id,
        image: child.image,
        parent: child.parent,
        name: child.name,
        vaccinesTaken: response.data.listVaccineChildren.items,
        bookings: bookingResponse.data.listBookings.items,
        nextDueVaccine: nextDue,
      };

      dispatch(addChild(parsedChild));
      if (index === 0) {
        let imageuri = "";
        if (child.image !== "") {
          imageuri = await getImage(child.image);
        }

        dispatch(
          updateCurrentDueVaccine({
            vaccineName: nextDue.nextDueList[0].name,
            date: nextDue.date,
            image: child.image,
            imageURI: imageuri,
          })
        );
      }
    });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log("CUREENT DATE:", currentDate);
    let tempDate = new Date(currentDate);
    console.log("TEMPDATE:", tempDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    console.log("FORMATTED DATE::", fDate);
    setFormattedDate(fDate);
  };
  const VaccinationCenters = async () => {
    const response = await getVaccinationCenters();
    setVaccinationCenters(response);
    if (!response) {
      alert("Network Error! could not get vaccination centers");
    }
  };
  useEffect(() => {
    setMinandMaxDates();
    VaccinationCenters();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );
    return () => {
      selectedVaccines = [];
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onSubmit = async () => {
    setLoading(true);
    if (selectedVaccines.length <= 0) {
      setError("No vaccines selected!");
      setLoading(false);
      return;
    } else if (!formattedDate) {
      setError("Please select a date!");
      setLoading(false);
      return;
    } else if (value === "At Home" && location.length < 1) {
      setError("Please enter your location");
      setLoading(false);
      return;
    } else if (value === "Vaccination Center" && selectedCenter.length < 1) {
      setError("Please select any vaccination center");
      setLoading(false);
      return;
    } else {
      const address =
        value === "Vaccination Center" ? selectedCenter : location;
      console.log("PARSEDD::", value, address);
      const addBookingAsync = async () => {
        try {
          selectedVaccines.forEach(async (vaccine) => {
            const booking = addBooking(
              props.route.params.child.id,
              formattedDate,
              vaccine.item.id,
              "Pending",
              value, //location
              address
            );


          });
          return true;
        } catch (e) {
          console.log("ERROR! ", e);
          alert("Failed to create new booking. Please try again later!");
          return false;
        }
      };
      const id = user.id;
      const response = await addBookingAsync();
      const user1 = await API.graphql(graphqlOperation(getUser, { id: id }));
      await updateState(user1.data.getUser.children.items);
      if (response) {
        setLoading(false);

        alert("Booking added successfully!");
        const notificDate3 = addDays(formattedDate, -3);
        const notificDate2 = addDays(formattedDate, -2);
        const notificDate1 = addDays(formattedDate, -1);
        schedulePushNotification(
          "VaxWin ",
          "New vaccine booking added",
          "Bookings",
          new Date(formattedDate),
          1,
          true
        );
        dispatch(
          addNotification({
            title: "New vaccine booking added",
            body: "Due on " + getLongDate(formattedDate),
          })
        );
        schedulePushNotification(
          "VaxWin!",
          "Only 3 days left for vaccination",
          "Reminder",
          notificDate3,
          notificDate3.getDay(),
          false
        );
        schedulePushNotification(
          "VaxWin!",
          "Only 2 days left for vacciantion",
          "Reminder",
          notificDate2,
          notificDate2.getDay(),
          false
        );
        schedulePushNotification(
          "VaxWin!",
          "Only 1 days left for vacciantion",
          "Reminder",
          notificDate1,
          notificDate1.getDay(),
          false
        );

        selectedVaccines = [];

        props.navigation.navigate("HomeScreen");
      } else {
        setLoading(false);

        alert("Booking not added. Try again later!");
        selectedVaccines = [];
        props.navigation.navigate("HomeScreen");
      }
    }
  };
  if (minDate !== false) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.ellipse}></View>
        <ScrollView keyboardShouldPersistTaps="always" >
          <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
            <View style={styles.topIcons}>
              <Ionicons
                name="chevron-back-outline"
                size={36}
                color={colors.PrimaryColor}
                onPress={() => props.navigation.goBack()}
              />
              <Ionicons
                name="md-notifications"
                size={32}
                color={colors.PrimaryColor}
                onPress={() => props.navigation.navigate("Notifications")}
              />
            </View>
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
              BOOK DATE
            </Text>
            <View
              style={{
                marginTop: 100,
                borderRadius: 20,
                height: windowHeight + RFValue(450),
        
              }}
            >
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
                  height: "30%",
                  alignItems: "center",
                }}
              >
                <View style={{ alignItem: "center", justifyContent: "center" }}>
                  <Text style={styles.Text}>
                    {props.route.params.child.name}
                  </Text>
                </View>
                <View style={{  width: windowWidth-60 }}>
                <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                  Booking Date
                </Text>
              
                <View
                  style={[
                    styles.calender,
                    {
                      
                      flexDirection: "row",
                      
                      marginTop: RFValue(16),
                    },
                  ]}
                >
                  <Avatar.Icon
                    icon={"calendar-range"}
                    size={40}
                    color={colors.PrimaryColor}
                    style={{
                      marginLeft: RFValue(10),
                      backgroundColor: "transparent",
                    }}
                  />
                  {androidDevice ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(232,232,232,1)",
                        borderRadius: 10,
                        flex: 1,
                        marginLeft: RFValue(10),

                        paddingTop: 10,
                      }}
                      onPress={() => showMode("date")}
                    >
                      <Text
                        style={{
                          color: colors.textGray,
                          fontSize: 16,
                          paddingHorizontal: 10,
                        }}
                      >
                        {parseDates(date, true)}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {show ? (
                    <DateTimePicker
                      style={{
                        width: RFValue(100),

                        marginTop: 3,
                        backgroundColor: "transparent",
                      }}
                      testID="datePicker"
                      value={date}
                      mode={mode}
                      minimumDate={minDate}
                      maximumDate={maxDate}
                      display="default"
                      onChange={onChange}
                    />
                  ) : null}
                </View>
                </View>
                <View style={{ width: windowWidth-60 }}>
                <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                  Vaccines
                </Text>
                </View>
                  
                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  style={{
                      marginLeft: RFValue(-15),
                      marginBottom: 0,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  <FlatList
                    style={{ }}
                    data={props.route.params.nextDueVaccinesList}
                    renderItem={(vaccine) => (
                      <RenderItemVaccine vaccine={vaccine} />
                    )}
                  />
                </ScrollView>
                <View style={{
                   width: windowWidth-60 }}>
                  <Text
                    style={[
                      styles.Text,
                      {
                        marginTop: RFValue(10),
                        
                      },
                    ]}
                  >
                    Vaccination Location
                  </Text>
                  </View>
                  {/* <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    style={{
                      marginLeft:10,
                      width:windowWidth-60,
                      height: keyboardShow? RFValue(250): RFValue(70), 
                      // marginBottom: 0,
                      // height: keyboardShow ? RFValue(200) : RFValue(0), //change this on KeyboardOpen
                      // marginLeft:
                      //   value === "Vaccination Center" ? RFValue(10) : 0,
                      // // height: keyBoardActive? RFValue(350) :0,
                    }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      width: windowWidth - 80,
                      marginLeft: RFValue(-20),
                    }}
                  >
                    <GooglePlacesInput
                      onPress={(data) => {
                        if (data.description) {
                          setLocation(data.description);
                        } else {
                          setLocation(data);
                        }
                        console.log("LOCATION UPDATED:", location);
                      }}
                    />
                  </ScrollView> */}


                  {true ? (
                    <View
                      style={{
                        width:windowWidth-60,
                        marginBottom:20,
                      
                        // marginRight: windowWidth / 3,
                        // marginLeft: value==="Vaccination Center"? RFValue(22):RFValue(15),
                        // height: RFValue(320), //change thiss also
                        // marginTop: value==="Vaccination Center"? RFValue(-15):RFValue(0), 
                        // flex: 1,
                      }}
                    >
                      <RadioButton.Group
                        onValueChange={(newValue) => setValue(newValue)}
                        value={value}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                        
                          }}
                          >
                          <View
                            style={{
                              backgroundColor: colors.colorPositive,
                              borderRadius: 30,
                              marginRight: 10,
                            }}
                          >
                            <RadioButton value="At Home" />
                            
                          </View>
                          <Text
                            style={[
                              fonts.smallText,
                              {
                                color: colors.textDefault,
                                marginTop: RFValue(3),
                                fontSize: RFValue(12.5),
                              },
                            ]}
                          >
                            At Home
                          </Text>
                        </View>
                        {value === "At Home"?
                              (<ScrollView
                              horizontal={true}
                              showsVerticalScrollIndicator={false}
                              keyboardShouldPersistTaps="always"
                              style={{
                                marginLeft:10,
                                width:windowWidth-60,
                                height: keyboardShow? RFValue(250): RFValue(70), 
                                // marginBottom: 0,
                                // height: keyboardShow ? RFValue(200) : RFValue(0), //change this on KeyboardOpen
                                // marginLeft:
                                //   value === "Vaccination Center" ? RFValue(10) : 0,
                                // // height: keyBoardActive? RFValue(350) :0,
                              }}
                              showsHorizontalScrollIndicator={false}
                              contentContainerStyle={{
                                width: windowWidth - 80,
                                marginLeft: RFValue(-20),
                              }}
                            >
                              <GooglePlacesInput
                                onPress={(data) => {
                                  if (data.description) {
                                    setLocation(data.description);
                                  } else {
                                    setLocation(data);
                                  }
                                  console.log("LOCATION UPDATED:", location);
                                }}
                              />
                            </ScrollView>)
          
                                :null}
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: colors.colorPositive,
                              borderRadius: 30,
                              marginTop: 10,
                              marginRight: 10,
                            }}
                            >
                            <RadioButton value="Vaccination Center" />
                          </View>
                          <Text
                            style={[
                              fonts.smallText,
                              {
                                color: colors.textDefault,
                                marginTop: RFValue(12.5),
                                fontSize: RFValue(12.5),
                              },
                            ]}
                          >
                            Nearby Vaccination Center
                          </Text>
                        </View>
                        {value === "Vaccination Center" ? (
                          keyboardShow ? null : (
                            < VaccinationCenterSelect
                              centersList={vaccinationCenters}
                              onChangeValue={(center) => {
                                setSelectedCenter(center);
                              }}
                              value={selectedCenter}
                            />
                          )
                        ) : null}
                      </RadioButton.Group>
                    </View>
                    
                  ) : null}
                  <CustomButton
                    width={windowWidth - 100}
                    height={60}
                    disabled={loading}
                    onPress={onSubmit}
                    text={loading ? "Loading..." : "Book Date"}
                    style={{
                      // marginTop:
                      //   value === "Vaccination Center" ? RFValue(160) : margins,
                      // // marginLeft:value === "Vaccination Center"? RFValue(19): RFValue(8),
                      // marginLeft: RFValue(8),
                      // position:
                      //   value === "Vaccination Center" ? "relative" : null,
                      // top: value === "Vaccination Center" ? RFValue(20) : 0,
                      // left: value === "Vaccination Center" ? RFValue(10) : 0,
                    }}
                  />


                  
                {/* <View
                  style={{
                    flex: 200,
                    marginRight: keyboardShow
                      ? RFValue(10.5)
                      : value === "Vaccination Center"
                      ? RFValue(10.5)
                      : 0,
                    position:
                      value === "Vaccination Center" && keyboardShow
                        ? "relative"
                        : null,
                    right:
                      value === "Vaccination Center" && keyboardShow
                        ? RFValue(8)
                        : 0,
                  }}
                >
               

                 

          
                  
                </View> */}

                {error && (
                  <Text
                    style={[
                      fonts.smallText,
                      {
                        color: "red",
                        textAlign: "center",
                        position:
                          value === "Vaccination Center" ? "relative" : null,
                        top: value === "Vaccination Center" ? RFValue(20) : 0,
                      },
                    ]}
                  >
                    {error}
                  </Text>
                )}
                <View
                  style={{ flex: value === "Vaccination Center" ? 65 : 200 }}
                ></View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
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

const VaccinationCenterSelect = ({ centersList, onChangeValue, value }) => {
  return (
    <RadioButton.Group onValueChange={onChangeValue} value={value}>
      {centersList.map((item) => (
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: RFValue(15),
          }}
        >
       
            <RadioButton value={item.address} />
          
          <View>
            <Text
              style={[
                fonts.smallText,
                {
                  color: colors.textDefault,

                  fontSize: RFValue(10),
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                fonts.smallText,
                {
                  color: colors.textDefault,

                  fontSize: RFValue(10),
                },
              ]}
            >
              {item.address}
            </Text>
          </View>
        </View>
      ))}
    </RadioButton.Group>
  );
};
export default BookDate;

const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: -100,
    width: 450,
    height: 400,
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: margins,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    borderRadius: RFValue(20),
  },
  input: { width: RFValue(280), marginVertical: 10 },
  Text: {
    ...fonts.buttonFont,
    fontSize: 18,
    color: colors.PrimaryColor,
  },
  calender: {
    backgroundColor: "white",
    height: RFValue(45),
    opacity: 0.8,
    borderRadius: 10,
    color: colors.textDefault,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: RFValue(290),

    shadowColor: "rgba(230, 230, 230, 0.3)",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
});
