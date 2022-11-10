import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import setFonts from "./src/assets/fonts/fonts";
import { Provider } from "react-native-paper";
import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications'
import AuthStack from "./src/Navigation/AuthNavigation";
import Amplify from "aws-amplify";
import config from './src/aws-exports'
import storage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import { useEffect } from "react";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});


Amplify.configure(config)
export default function Vaccinatify() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const getPermission = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Enable push notifications to use the app!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  }
  useEffect(()=>{
    console.log("CALLED IN ROOT")
    getPermission();
    

  },[])

  const LoadFonts = async () => {
    await setFonts();
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  } else
    return (
      <Provider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <AuthStack/>
        </SafeAreaProvider>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
