import { Card, Avatar } from "react-native-paper";

import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import { windowWidth } from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";

export default CustomItem = (props) => {
  const [extended, setExtended] = useState(false);
  const LeftContent = (x) => (
    <Avatar.Icon
      size={50}
      color={"gray"}
      style={{
        backgroundColor: props.iconColor
          ? props.iconColor
          : colors.colorPositive,
        marginTop: 10,
      }}
      icon={props.icon}
    />
  );
  return (
    <Card
      style={[
        styles.container,
        props.style,
        {
          backgroundColor: props.color,
          height: extended ? RFValue(90) : RFValue(70),
          flexDirection: "row",
        },
      ]}
      onPress={() => setExtended(!extended)}
    >
      <Card.Title
        title={props.title}
        subtitle={props.subtitle}
        left={LeftContent}
      />
      <Card.Content></Card.Content>
      <Card.Actions></Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 10,
    opacity: 0.6,
    width: windowWidth - 40,
  },
});
