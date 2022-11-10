import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import { margins, windowHeight } from "../assets/constants";
import HeaderTop from "../Components/HeaderTop";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import colors from "../assets/colors/colors";
import CardWithImg from "../Components/CardWithImg";
import { ScrollView } from "react-native-gesture-handler";
import { getBlogsAsync } from "../graphql/custom-queries";
import Loader from "../Components/Loader";


const BlogsScreen = ({ navigation }) => {
    const [blogList,setBlogList] = useState(null)
 const getBlogList = async() =>
 {
    const response = await getBlogsAsync(1000000)
    setBlogList(response)
 }
 useEffect(()=>{
    getBlogList();
    
 },[])
  if (blogList===null) {
    return <Loader />;
  } else {
    return (
        
          <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "top"]}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.ellipse}></View>
            <View style={styles.ellipse2}></View>
            <HeaderTop
              style={{ marginLeft: margins }}
              leftIcon={"chevron-back-outline"}
              rightIcon={"md-notifications"}
              onPressLeft={() => {
                navigation.goBack();
              }}
              onPressRight={() => navigation.navigate("Notifications")}
            />
            <Text
              style={[
                fonts.h1x,
                {
                  textAlign: "center",
                  marginTop: RFValue(45),
                  color: colors.PrimaryColor,
                },
              ]}
            >
              BLOGS
            </Text>
            <View
              style={{
                marginTop: 100,
                flex: 1,
                borderRadius: 20,
                height: windowHeight,
                marginHorizontal: 20,
              }}
            >
            {blogList.map((item)=>
            <CardWithImg
            description={item.description}
            title={item.title}
            image = {item.image}
            navigation={navigation}
            style={{ marginTop:RFValue(10),opacity:0.9 }}
            />)

            }
            </View>

            <View style={{ marginTop: margins }}></View>
            </ScrollView>
            <View style={styles.clear}>
            
        </View>
  
          </SafeAreaView>
       
    );
  }
};
export default BlogsScreen;
const styles = StyleSheet.create({
  ellipse: {
    ...StyleSheet.absoluteFillObject,
    left: RFValue(120),
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: 1000,
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  item: {
    height: 80,
  },
  clear: {
    position: "absolute",
    top: windowHeight - RFValue(180),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    borderRadius: RFValue(20),
  },
  ellipse2: {
    ...StyleSheet.absoluteFillObject,
    width: 450,
    height: 400,
    top: RFValue(windowHeight / 2.1),
    borderRadius: 1200,
    left: RFValue(66),
    backgroundColor: "rgba(252, 227, 231, 0.5)",
  },
  Text: {
    ...fonts.buttonFont,
    fontSize: 18,
    color: colors.PrimaryColor,
    alignSelf: "baseline",
  },
  card: {
    // paddingHorizontal: RFValue(25),
    // paddingTop: RFValue(40),
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,

    elevation: 2,
  },
});
