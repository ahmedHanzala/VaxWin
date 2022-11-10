import {
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from "@expo-google-fonts/roboto";
  import { useFonts,loadAsync } from "expo-font";
  import {Platform} from 'react-native'
  import { RFValue } from "react-native-responsive-fontsize";

  const setFonts= async() =>
  {
    await loadAsync({
      Roboto_100Thin,
      Roboto_100Thin_Italic,
      Roboto_300Light,
      Roboto_300Light_Italic,
      Roboto_400Regular,
      Roboto_400Regular_Italic,
      Roboto_500Medium,
      Roboto_500Medium_Italic,
      Roboto_700Bold,
      Roboto_700Bold_Italic,
      Roboto_900Black,
      Roboto_900Black_Italic,
    })
    let [fontsLoaded]= useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
      });
      if (!fontsLoaded) {
        console.log("ERROR: Fonts not loaded.");
        return false
      }
      else
      {
        return true
      }
    
  }

  export default setFonts;

  export const fonts=
  {

    headingMain: {
        fontFamily: "Roboto_900Black",
        fontWeight: "600",
        lineHeight: 24,
        letterSpacing: Platform.OS === 'ios' ?  "0.38px":1,
        fontSize: RFValue(26),
      },
      h1:
      {
        fontFamily: "Roboto_500Medium",
        lineHeight: Platform.OS === 'ios' ? 'auto':45,
        letterSpacing: 0,
        fontSize: RFValue(24),
        textAlign: 'left',
      },
      h1x:
      {
        fontFamily: "Roboto_700Bold",
        lineHeight: Platform.OS === 'ios' ? '28.13px' : 35,
        letterSpacing: Platform.OS === 'ios' ? '10%' : 10,
        fontSize: 24,
        textAlign: 'left',
      },
      buttonFont:
      {
        fontFamily:'Roboto_700Bold',
        fontSize: 20,
        lineHeight: RFValue(24),
        letterSpacing:RFValue(0.38)
      },
      h2:
      {
        fontFamily: "Roboto_400Regular",  //prev ROBOTO_300Light
        lineHeight: Platform.OS === 'ios' ? 'auto' : 35,
        letterSpacing: 0,
        fontSize: RFValue(18),
        textAlign: 'left',
      },
      h2x:
      {
        fontFamily: "Roboto_500Medium",  //prev ROBOTO_300Light
        lineHeight: Platform.OS === 'ios' ? '21px':25,
        letterSpacing: 0,
        fontSize: 18,
        textAlign: 'left',
        color:'white'
      },
      p:
      {
        fontFamily: "Roboto_300Light",
        lineHeight: 24,
        letterSpacing: Platform.OS === 'ios' ? '0.38px' :1,
        fontSize: RFValue(14),
        textAlign: 'left',
      },
      pH:
      {
        fontFamily: "Roboto_500Medium",
        lineHeight: 24,
        letterSpacing: Platform.OS === 'ios' ? '0.38px' :2,
        fontSize: RFValue(14),
        textAlign: 'left',
      },
      smallText:
      {
        fontFamily: "Roboto_500Medium",
        lineHeight:Platform.OS === 'ios' ? '24px' :25,
        letterSpacing: 0,
        fontSize: RFValue(12),
        textAlign: 'left',
      }
    

  }