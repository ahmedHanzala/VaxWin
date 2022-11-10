import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddChild from "../Screens/AddChild";
import Calender from "../Screens/Calender";
import { View,Keyboard, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import colors from "../assets/colors/colors";
const Tab = createBottomTabNavigator();
import PlusLogo from '../assets/images/plus-logo.svg'
import { useState } from "react";
import { useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";



export default function HomeTabNavigator() {

  const [keyboardShow,setKeyboardShow] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let sizeIcon=40;
            

            if (route.name === "HomeScreen") {
              iconName = focused ? "home" : "home-outline";
              
            } else if (route.name === "AddChild") {
              iconName = focused ? "add-circle" : "add-circle";
              sizeIcon=80
            } else if (route.name === "Calender") {
              iconName = focused ? "calendar" : "calendar-outline";
            }

            // You can return any component that you like here!
            if(route.name==="AddChild")
            {
              return(
                <PlusLogo/>
              )
            }else
            {
            return (
              <Ionicons name={iconName} size={sizeIcon} color={colors.PrimaryColor} />
            );}
          },
          tabBarActiveTintColor: colors.PrimaryColor,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarHideOnKeyboard:true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderRadius: 25,
            position:'absolute',
            shadowColor: "black",
            shadowOffset: {
              width: 16,
              height: 16,
            },
            shadowRadius: 5,
            shadowOpacity: 1,
            height: RFValue(65),
          },
        })}
      >
        <Tab.Screen name="HomeScreen" component={AppStack} />
        <Tab.Screen
         name="AddChild" 
         component={AddChild}
         options={{ 
          tabBarIconStyle:
          {
            marginTop: keyboardShow? '50%':-50,
          
            
            
            
          }

          }} />
        <Tab.Screen name="Calender" component={Calender} />
      </Tab.Navigator>
    
  );
}
