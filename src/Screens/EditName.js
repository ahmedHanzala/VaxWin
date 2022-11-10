import React, { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowWidth, windowHeight } from "../assets/constants";
import CustomInput from "../Components/CustomInput";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import CustomButton from "../Components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../Redux/Slices/ProfileSlice";
import { updateUser } from "../graphql/mutations";
const EditName = ({ navigation }) => {
    const UserId = useSelector(state=>state.profile.profile.id)
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(false);
  const updateDB = async (name) => {
    
    try {
      const response = await API.graphql(
        graphqlOperation(updateUser, { input: { id: UserId,name: name } })
      );
    } catch (e) {
      console.log("ERROR UPDATING DATABASE", e);
    }
  };
  const onSubmit = async () => {
    setLoading(true);
    if (name.length < 5) {
      setError("Name is too short");
      setLoading(false);
      return;
    }
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (user.attributes.name === name) {
        alert(`${name} is already your current name`);
        setLoading(false);
        return;
      }
      try {
        let result = await Auth.updateUserAttributes(user, {
          name: name,
        });
        setLoading(false);
        alert("Name has been successfully changed!");
        dispatch(updateName(name));
        await updateDB(name);
        navigation.navigate("HomeScreen");
      } catch (e) {
        console.log("ERRORXX", e);
      }
    } catch (e) {}
  };

  if (false) {
    return <Loader />;
  } else {
    return (
      <KeyboardAvoidingWrapper>
        <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
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
            EDIT NAME
          </Text>
          <View style={{ marginTop: 100, flex: 1, borderRadius: 20 }}>
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
                alignItems: "center",
                height: windowHeight / 1.5,
              }}
            >
              <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                Enter New Name
              </Text>
              <CustomInput
                placeholder={"Name"}
                icon="pencil"
                disabled={loading}
                value={name}
                onChangeText={(data) => {
                  setName(data);
                }}
              />
              <CustomButton
                width={windowWidth - 100}
                height={60}
                onPress={onSubmit}
                disabled={loading}
                text={loading ? "Loading" : "Submit"}
                style={{ marginTop: margins }}
              />

              <View style={{ height: 100 }}></View>
            </View>
          </View>
          <View style={{ marginTop: margins }}></View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    );
  }
};
export default EditName;
const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  item: {
    height: 80,
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
