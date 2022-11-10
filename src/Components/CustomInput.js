import colors from "../assets/colors/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
const CustomInput = ({
  disabled,
  keyboardType,
  onChangeText,
  style,
  multiline,
  value,
  placeholder,
  icon,
  secureTextEntry,
  rightIcon,
  onPressRight,
  onPressIn,
  onPressOut,
}) => {
  return (
    <TextInput
    disabled={disabled}
      mode="flat"
      placeholder={placeholder}
      left={<TextInput.Icon icon={icon} color={colors.PrimaryColor} />}
      selectionColor={colors.textDefault}
      underlineColor="transparent"
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      right={<TextInput.Icon icon={rightIcon} color={colors.PrimaryColor} onPress={onPressRight}/>}
      theme={{ colors: { primary: colors.textDefault } }}
      style={[styles.input, style]}
      value={value}
      multiline={multiline}
      keyboardType={keyboardType}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    />
  );
};
export default CustomInput;
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 10,
    color: colors.textDefault,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: RFValue(300),
    
    
    shadowColor: 'rgba(230, 230, 230, 0.3)',
    shadowOffset: {
      width: 4,
      height: 16
    },
    shadowRadius: 5,
    shadowOpacity: 1,

  },
});
