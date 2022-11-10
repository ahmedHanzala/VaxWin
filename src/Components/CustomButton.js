import React from "react";
import { Button } from "react-native-paper";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import { Text } from "react-native";
const CustomButton = ({ onPress, text, width, height, style, circleTrue,disabled,fontsize}) => {
  return (
    <Button
      mode="contained"
      uppercase={false}
      disabled={disabled}
      contentStyle={{
        width: width,
        height: height,
        borderRadius: circleTrue ? 50 : 10,}}
      onPress={onPress}
      style={[
        {
          width: width,
          height: height,
          borderRadius: circleTrue ? 50 : 10,
          shadowColor: "rgba(230, 230, 230, 0.3)",
          shadowOffset: {
            width: 4,
            height: 16,
          },
          shadowRadius: 5,
          shadowOpacity: 1,
          backgroundColor: colors.PrimaryColor,
          alignItems: "center",
          justifyContent: "center",
        },
        style ]}
    >
      <Text style={[fonts.buttonFont,fontsize]}>{text}</Text>
    </Button>
  );
};
export default CustomButton;

//width: RFValue(300), height: RFValue(56)
