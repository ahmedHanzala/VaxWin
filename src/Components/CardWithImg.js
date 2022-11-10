import React, { useEffect, useState } from "react";
import { fonts } from "../assets/fonts/fonts";
import {View,TouchableOpacity,Image,StyleSheet,Text} from 'react-native'
import { windowWidth } from "../assets/constants";
import CacheImage from "../Services/CacheImage";
import { getImage } from "../Services/handleProfilePictures";
import Loader from "./Loader";

const CardWithImg = ({index,title,description,image,style,navigation}) =>
{
  const [imageURI,setImageURI] = useState(null)

  const getURI = async() =>
  {
    const img = await getImage(image)
    setImageURI(img)
  }
  useEffect(()=>{
    getURI();
  },[])
  if(imageURI ===null)
  return <Loader/>
  else
  {
    return(
        <TouchableOpacity
        activeOpacity={0.8}
        style={[{
          flexDirection: "row",
          borderRadius: 10,
          width: windowWidth-40,
          height:150,
          backgroundColor: 'rgba(14, 132, 128, 0.6)',
          opacity: 0.9,
          shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 4,
          },
          shadowRadius: 3,
          shadowOpacity: 0.4,
          elevation: 5,
        },style]}
        onPress={()=>navigation.navigate("SingleBlog",{title,description})}
      >
        <View style={styles.imgSection}>
           <CacheImage
            uri={imageURI}
            nameOfImage={image}
            background={false}
            style={{
              flex: 1,
              borderColor: "white",
              margin: 10,
              width: 110,
              borderWidth: 3,
              borderRadius: 10,
            }}
            />
        </View>
        <View style={styles.contentSection}>
          <Text style={[fonts.smallText, { color: "white", fontSize: 12 }]}>
            {description.length>=120? description.substring(0, 120) + "  ...View More": description}
          </Text>
        </View>
      </TouchableOpacity>
    )}
}

export default CardWithImg

const styles= StyleSheet.create({
    imgSection: {
        flex: 2,
      },
      contentSection: {
        flex: 3,

            margin:10,
            marginLeft:0,
      },
});