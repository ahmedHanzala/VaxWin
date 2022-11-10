import React from "react";
import colors from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";
import { View, TouchableOpacity, Text } from "react-native";
import { windowWidth } from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";

const CardButton = ({ title, subtitle, onPress,style }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[{
          padding: RFValue(10),
          width: (windowWidth - 60) / 2,
          height: RFValue(100),

          borderRadius: 10,
          backgroundColor: colors.cardColor,

          shadowColor: "rgba(130, 130, 130, 0.9)",
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.18,
          shadowRadius: 3,

          elevation: 2,
        },style]}
      >
        <View style={{ flex: 2 }}>
          <Text style={[fonts.smallText, { fontSize: 18, color: "white" }]}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[fonts.smallText, { color: "white" }]}>{subtitle}</Text>
          <Text style={{ fontSize: 18, color: "white" }}>{"\u279C"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardButton;
