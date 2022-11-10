import React from 'react'
import {View,ActivityIndicator} from 'react-native'
import { windowHeight } from '../assets/constants'
import colors from '../assets/colors/colors'
const Loader = ({color,style}) =>
{
    return(<View
        style={[{
          justifyContent: "center",
          alignItems: "center",
          flex:1,

        },style]}
      >
        <ActivityIndicator color={color? color:colors.PrimaryColor} />
      </View>)
}
export default Loader;