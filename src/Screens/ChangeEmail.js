import React, { useState } from "react";
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
import { useValidation } from "react-native-form-validator";
import { Auth,API,graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../Redux/Slices/ProfileSlice";
const ChangeEmail = ({ navigation }) => {
    const UserId = useSelector(state=> state.profile.profile.id)
    const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState(null);
  const [disableInput, setDisableInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { newEmail, confirmEmail },
    });
    const updateDB = async (email) => {
        try {
          const response = await API.graphql(
            graphqlOperation(updateUser, { input: { id: UserId,email: email } })
          );
        } catch (e) {
          console.log("ERROR UPDATING DATABASE", e);
        }
      };
  const onSubmit = async () => {
    setLoading(true);
    if(confirmEmail!== newEmail || confirmEmail===null || newEmail===null)
    {
        setError("Fields are empty")
        setLoading(false)
        return;

    }
    if (!showVerificationCode) {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes.email === newEmail) {
          alert(`${newEmail} is already your email address`);
          setLoading(false);
          return;
        }

        try {
          let result = await Auth.updateUserAttributes(user, {
            email: newEmail,
          });
          setLoading(false);
          setShowVerificationCode(true);
          setDisableInput(true);
        } catch (e) {
            setError(e.message)
          console.log("ERROR", e);
        }
      } catch (e) {
        setError(e.message)
        console.log("ERROR:", e);
      }
    } else {
      try {
        let result = await Auth.verifyCurrentUserAttributeSubmit(
          "email",
          verificationCode
        );
        console.log("SUCCESS", result);
        setLoading(false);
        alert("Email changed successfully!");
        dispatch(updateEmail(newEmail));
        await updateDB(newEmail);
        navigation.navigate("HomeScreen");
      } catch (e) {
        console.log("ERROR CODE:", e);
      }
    }

    setLoading(false);
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
            CHANGE EMAIL
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
                New Email
              </Text>
              <CustomInput
                placeholder={"New Email"}
                icon="email"
                value={newEmail}
                disabled={disableInput}
                onChangeText={(data) => {
                  setNewEmail(data);
                  validate({
                    NewEmail: { required: true },
                  });
                }}
              />
              {isFieldInError("newEmail") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("newEmail")[0]}
                </Text>
              )}

              <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                Confirm New Email
              </Text>
              <CustomInput
                placeholder={"Confirm Email"}
                icon="email"
                value={confirmEmail}
                disabled={disableInput}
                onChangeText={(data) => {
                  setConfirmEmail(data);
                  validate({
                    NewEmail: { required: true },
                  });
                }}
                style={styles.input}
              />
              {isFieldInError("confirmEmail") && (
                <Text style={[fonts.smallText, { color: "red" }]}>
                  {getErrorsInField("confirmEmail")[0]}
                </Text>
              )}
              
              {showVerificationCode ? (
                <View>
                  <Text style={[styles.Text, { marginTop: RFValue(16) }]}>
                    Verification Code
                  </Text>
                  <CustomInput
                    placeholder={"Verification Code"}
                    icon="lock"
                    value={verificationCode}
                    onChangeText={(data) => {
                      setVerificationCode(data);
                    }}
                  />
                </View>
              ) : null}
              <CustomButton
                width={windowWidth - 100}
                height={60}
                onPress={onSubmit}
                disabled={loading}
                text={loading ? "Loading..." : "Submit"}
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
          <View style={{ marginTop: margins }}></View>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    );
  }
};
export default ChangeEmail;
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
