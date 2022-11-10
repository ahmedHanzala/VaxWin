import React from "react";
import { ImageBackground, View, StyleSheet, Text ,Platform} from "react-native";
import CacheImageBackground from "../Services/CacheBackgroundImage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/logo-injection.svg";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import { RFValue } from "react-native-responsive-fontsize";
import DuoToggleSwitch from "react-native-duo-toggle-switch";
import { windowWidth } from "../assets/constants";
export default class OnBoarding extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/images/background-mother-with-child.png")}
          style={styles.background}
        > 
        {/* <View style={styles.background}>
        <OnBoardingBackground width={windowWidth/1}/>
        </View> */}
          <LinearGradient
            colors={[colors.gradientColorRed, colors.gradientColorPink]}
            style={styles.gradient}
          ></LinearGradient>

          <SafeAreaView styles={styles.mainContainer}>
            <View style={styles.logoView}>
              <Logo />
              <Text
                style={[
                  fonts.headingMain,
                  { color: "#FFFF", paddingeTop: RFValue(13) },
                ]}
              >
                vaxWIN
              </Text>
            </View>
          </SafeAreaView>
          <View style={styles.empty}>
            
          </View>
          <View style={styles.footer}>
            <Text
              style={[
                fonts.headingMain,
                { color: "white", lineHeight: Platform.OS === 'ios' ?  "39.8px" : 30},
              ]}
            >
              GO & GET VACCINE !{" "}
            </Text>
            <Text style={[fonts.h1, { color: "white", fontSize: 18 }]}>
              EASY WAY TO FIND VACCINATION
            </Text>
            <DuoToggleSwitch
              primaryText="Login"
              secondaryText="Register"
              onPrimaryPress={() => {this.props.navigation.navigate('Login')}}
              onSecondaryPress={() => {this.props.navigation.navigate('Register')}}
              activeColor="#fff"
              activeTextColor="#646464"
              primaryButtonStyle={{ height:'100%',borderRadius:0, width:'50%',margin:0, }}
              secondaryButtonStyle={{ height:'100%',borderRadius:0, width:'50%',margin:0, }}
              style={{ 
                borderRadius:10,
                width: windowWidth-140,
                height:RFValue(70),

               }}
               inactiveColor="transparent"
               
              
            />
          </View>
         </ImageBackground> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
 flex:1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  mainContainer: { flex: 1, paddingTop: 30 },
  logoView: {
    alignItems: "center",
    paddingTop: RFValue(74),
  },
  empty: {
    flex: 1,
  },
  footer: {
    height: RFValue(230),
    alignItems: "center",
  },
  
});
