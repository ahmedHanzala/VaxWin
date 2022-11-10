import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../assets/colors/colors";
import { margins } from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";
//type true for back false for menu
const HeaderTop = ({ leftIcon, onPressLeft, rightIcon, onPressRight,style }) => {
  return (
    <View style={styles.topIcons}>
      <TouchableOpacity 
      style={[{ borderRadius: 50 },style]}
        onPress={onPressLeft}>
        <Ionicons
          name={leftIcon}
          size={36}
          color={colors.PrimaryColor}
          
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 50 }}
      onPress= {onPressRight}>
        <Ionicons
          name={rightIcon}
          size={32}
          color={colors.PrimaryColor}
          
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderTop;
const styles = StyleSheet.create({
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: margins,
    borderRadius: 50,
  },
});
