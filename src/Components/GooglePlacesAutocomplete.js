import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { margins, windowWidth } from "../assets/constants";
import { Avatar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const GooglePlacesInput = ({style,onPress}) => {
  return (
    <View
      style={[
        styles.calender,
        ,
        {
  
          flexDirection: "row",
          width:windowWidth-60,
          marginTop: RFValue(10),
          marginLeft:15,
        }, style
      ]}
    >
      <Avatar.Icon
        icon={"map-marker"}
        size={40}
        color={colors.PrimaryColor}
        style={{
      
          backgroundColor: "transparent",
        }}
      />
      <View style={{  width: windowWidth-100,height:RFValue(200)}} >
        <GooglePlacesAutocomplete
          placeholder="Location"
          listViewDisplayed={false}
          onPress={onPress}
          
          enablePoweredByContainer={false}	
          textInputProps={{
            onChangeText: onPress
        }}
          query={{
            key: "AIzaSyD8gUjOiR4xYDHIdxlyIuHk14-mOmwdMVM",
            language: "en",
          }}
          style={{
            width: windowWidth-100,
         
            height:RFValue(200),
         
            position:'relative',
            left:RFValue(-30),
            top:0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      </View>
    </View>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
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
