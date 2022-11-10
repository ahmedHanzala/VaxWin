import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

const KeyboardAvoidingWrapper = ({ children,style }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding":"padding"} keyboardVerticalOffset={-500}
    style={[{ flex: 1 },style]}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingWrapper;
