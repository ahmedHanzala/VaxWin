import { listVaccines } from "../graphql/queries";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { listVaccineChildren } from "../graphql/queries";
import { schedulePushNotification } from "../Services/PushNotifications";
import { addNotification } from "../Redux/Slices/NotificationsSlice";
import { updateCurrentDueVaccine } from "../Redux/Slices/CurrentDueVaccine";
import handleProfilePicture, {
  getImage,
} from "../Services/handleProfilePictures";
import { StyleSheet, View, Text, Platform, Button } from "react-native";
import {
  resetAddChild,
  removeVaccinesGiven,
} from "../Redux/Slices/AddChildSlice";
import { addChild, resetChildren, setLengthCloud } from "../Redux/Slices/ChildrenSlice";
import { useValidation } from "react-native-form-validator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { margins, windowWidth } from "../assets/constants";
import CacheImage from "../Services/CacheImage";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import { Avatar } from "react-native-paper";
import colors from "../assets/colors/colors";
import CustomInput from "../Components/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native";
import CustomButton from "../Components/CustomButton";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { addDays, compare, compareDates, parseDates } from "../Services/Parser";
import { getUser } from "../graphql/queries";
import SelectVaccines from "../Components/SelectVaccines";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listBookings } from "../graphql/queries";
import { setInfo } from "../Redux/Slices/AddChildSlice";
import { setProfile } from "../Redux/Slices/ProfileSlice";
import {
  createChild,
  createVaccineChild,
  deleteChild,
} from "../graphql/mutations";
import { addBooking } from "../graphql/custom-queries";

const AvatarStatusIndicator = ({ status, image, nameOfImage }) => {
  if (status === "not_submitted") {
    return (
      <Avatar.Icon
        style={{
          width: RFValue(110),
          height: RFValue(110),
          borderWidth: 5,
          borderColor: "white",
          borderRadius: 80,
          backgroundColor: colors.PrimaryColor,
        }}
        icon="account-plus"
      />
    );
  } else if (status === "success") {
    return (
      <CacheImage
        uri={image}
        nameOfImage={nameOfImage}
        style={{
          width: RFValue(110),
          height: RFValue(110),
          borderColor: "white",
          borderRadius: 80,

          backgroundColor: colors.PrimaryColor,
        }}
      />
    );
  } else {
    return (
      <Avatar.Icon
        style={{
          width: RFValue(110),
          height: RFValue(110),
          borderWidth: 5,
          borderColor: "white",
          borderRadius: 80,
          backgroundColor: colors.PrimaryColor,
        }}
        icon="loading"
      />
    );
  }
};

const AddChild = ({ navigation }) => {
  const addChildState = useSelector((state) => state.AddChild);
  const dispatch = useDispatch();
  const childrenArray = useSelector((state) => state.children.children);
  const child = useSelector((state) => state.AddChild);
  const parent = useSelector((state) => state.profile.profile);
  const [image, setImage] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("Next");
  const [showSelectVaccines, setShowSelectVaccines] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(Platform.OS === "ios");
  const [androidDevice, setAndroidDevice] = useState(Platform.OS === "android");
  const [imageName, setImageName] = useState("");
  const [formattedDate, setFormattedDate] = useState(
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
  );
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [imageUploaded, setImageUploaded] = useState("not_submitted");
  const [error, setError] = useState(null);
  const updateUserData = async (userId) => {
    try {
      console.log("add child update called");

      const user1 = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      var parsedUser = {
        name: user1.data.getUser.name,
        email: user1.data.getUser.email,
        id: user1.data.getUser.id,
        phone_number: user1.data.getUser.phone_number,
      };
      dispatch(setLengthCloud(user1.data.getUser.children.items.length))
      dispatch(setProfile(parsedUser));

      AddChildtoState(user1.data.getUser.children.items);
    } catch (e) {
      console.log("Error in updating user in Child", e);
    }
  };
  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { name, DOB },
    });
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

  const AddChildtoState = async (data) => {
    //parsing
    console.log("DATA IN ADD CHILD TO STATE", data);
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

  const addChildAsync = async (inputItem) => {
    let found = false;
    if (
      inputItem.name.lenght != "" &&
      inputItem.DOB != "" &&
      inputItem.parent != ""
    ) {
      try {
        const addChild = await API.graphql(
          graphqlOperation(createChild, { input: inputItem })
        );
        childrenArray.forEach((child) => {
          if (addChild.data.createChild.name === child.name) {
            found = true;
          }
        });
        if (found === true) {
          alert("Child already exists");
          await API.graphql(
            graphqlOperation(deleteChild, {
              input: { id: addChild.data.createChild.id },
            })
          );
          dispatch(resetAddChild());
          found = false;
          navigation.navigate("HomeScreen");
          return;
        }
        var today1 = new Date();
        var dd = String(today1.getDate()).padStart(2, "0");
        var mm = String(today1.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today1.getFullYear();

        today1 = mm + "/" + dd + "/" + yyyy;

        child.vaccinesGiven.forEach(async (item) => {
          try {
            const addVaccinesTaken = await API.graphql({
              ...graphqlOperation(createVaccineChild, {
                input: {
                  vaccineID: item.id,
                  childID: addChild.data.createChild.id,
                },
              }),
              authMode: "API_KEY",
            });
            console.log("ADD VACCINES TAKEN", addVaccinesTaken);
            // create Bookings of selected vaccines
            dispatch(removeVaccinesGiven());
          } catch (e) {
            console.log("ERROR IN ADD VACCINES TO CHILDREN:", e);
          }
        });

        const addBookingAsync = async () => {
          child.vaccinesGiven.forEach(async (vaccine) => {
            const booking = await addBooking(
              addChild.data.createChild.id,
              today1,
              vaccine.id,
              "Completed",
              "Pre Given",
              "Pre Given"
            );
          });
        };
        const response = addBookingAsync();
        console.log("RESPONSE::", response);
        response.then(await updateUserData(parent.id));
        schedulePushNotification("VaxWin!","Congrats on adding a new child","New Child Added", new Date(),"Sunday",true)
        dispatch(addNotification({
          title: "New Child Added",
          body: name +" was added"  ,
        }))
        alert("Success! Child added successfully");
        setLoading(false);
        setButtonTitle("Add Child");
        dispatch(resetAddChild());
        navigation.navigate("HomeScreen");
      } catch (e) {
        console.log("ERIR FAUKED", e);
        alert("Failed! could not add child");
        dispatch(resetAddChild());
        navigation.navigate("HomeScreen");
      }
    } else {
      setLoading(false);
      setButtonTitle("Add Child");
      alert("Could not add child. Try again later");
    }
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
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onSubmit = async () => {
    if (!loading) {
      setLoading(true);
      setButtonTitle("Loading...");
      if (isFieldInError("name")) {
        setError(getErrorsInField("name")[0]);
        setLoading(false);
        setButtonTitle("Next");
        return;
      }
      if(name.length ===0 || name.length<=2)
      {
        setError("Please enter a valid name");
        setLoading(false);
        setButtonTitle("Next");
        return;
      }
      if (!showSelectVaccines) {
        setLoading(true);
        setButtonTitle("Add Child");
        setShowSelectVaccines(true);
        setError(null);
      } else {
        setLoading(true);
        setButtonTitle("Loading...");
        dispatch(
          setInfo({
            name: name,
            DOB: JSON.stringify(date),
            image: imageName,
          })
        );
        const queryInput = {
          name: name,
          DOB: JSON.stringify(date),
          image: imageName,
          parent: parent.id,
        };
        console.log("QUERY INPUT:", queryInput);
        await addChildAsync(queryInput);
      }
      setLoading(false);
      console.log("REACHED!");
    }
  };
  const openGallery = async () => {
    setImageUploaded("loading");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      maxHeight: RFValue(70),
      maxWidth: RFValue(70),
    });
    if (result.cancelled) {
      setImageUploaded("not_submitted");
    }
    if (!result.cancelled) {
      setImageUploaded("loading"); //result.uri
      const name = await handleProfilePicture(result);
      setImageName(name);
      const response = await getImage(name);
      setImage(response);

      console.log("SUCCESS! Image uploaded");
      setImageUploaded("success");
    } else {
      alert("Error while uploading image");
    }
    if (!result) {
      alert("Error while uploading image");
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetAddChild());
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.ellipse}></View>
      <KeyboardAvoidingWrapper>
        <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
          <View style={styles.topIcons}>
            <Ionicons
              name="chevron-back-outline"
              size={36}
              color={colors.PrimaryColor}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="md-notifications"
              size={32}
              color={colors.PrimaryColor}
              onPress={() => navigation.navigate("Notifications")}
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
            ADD YOUR CHILD
          </Text>
          <View style={{ marginTop: 100, flex: 1, borderRadius: 20 }}>
            <LinearGradient
              colors={["rgba(255, 154, 158, 1)", "rgba(250, 208, 196, 1)"]}
              style={styles.gradient}
            ></LinearGradient>

            <TouchableOpacity
              style={{
                borderWidth: 0,
                flex: 1,
                alignItems: "center",
                position: "relative",
                marginTop: -60,
              }}
              onPress={openGallery}
            >
              <AvatarStatusIndicator
                status={imageUploaded}
                image={image}
                nameOfImage={imageName}
              />
            </TouchableOpacity>

            <View
              style={{
                margin: margins,
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                padding: margins,
                alignItems: "center",
              }}
            >
              <Text style={styles.Text}>Name Of Child</Text>
              <CustomInput
                placeholder={"Child's Name"}
                onChangeText={(item) => {
                  setName(item);
                  validate({
                    name: { minlength: 3, maxlength: 15, required: true },
                  });
                }}
                icon="account"
                style={styles.input}
              />
              {isFieldInError("name") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("name")[0]}
                </Text>
              )}

              <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                Date Of Birth
              </Text>
              <View
                style={[
                  styles.calender,
                  {
                    flex: 1,
                    flexDirection: "row",
                    marginHorizontal: margins,
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
                      flex:1,
                      marginLeft:RFValue(10),
                     
                      paddingTop:10,
                     
                    }}
                    onPress={() => showMode("date")}
                  >
                    <Text style={{ color:colors.textGray,fontSize:16,paddingHorizontal:10 }}>{parseDates(date,true)}</Text>
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
                    display="default"
                    onChange={onChange}
                  />
                ) : null}
              </View>
              {showSelectVaccines ? (
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.Text,
                      { marginTop: RFValue(16), marginBottom: RFValue(5) },
                    ]}
                  >
                    Select Vaccines Given
                  </Text>

                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <SelectVaccines date={formattedDate} />
                  </ScrollView>
                </View>
              ) : null}
              <CustomButton
                width={windowWidth - 100}
                height={60}
                onPress={onSubmit}
                disabled={loading}
                text={buttonTitle}
                style={{ marginTop: margins }}
              />
              {error && (
                <Text
                  style={[
                    fonts.smallText,
                    { color: "red", textAlign: "center" },
                  ]}
                >
                  {error}
                </Text>
              )}
              <View style={{ height: 100 }}></View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    </View>
  );
};

export default AddChild;

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
  input: { width: RFValue(280) },
  Text: {
    ...fonts.buttonFont,
    fontSize: 18,
    color: colors.PrimaryColor,
    alignSelf: "baseline",
  },
  calender: {
    backgroundColor: "white",
    height: RFValue(45),
    alignItems: Platform.OS === "ios" ? "left" : "baseline",
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
