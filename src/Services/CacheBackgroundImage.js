import React from "react";
import {  ImageBackground } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

export default class CacheImageBackground extends React.Component {
  state = {
    source: null,
    nameOfImage: this.props.nameOfImage,
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const { nameOfImage } = this.props;
    console.log("NAME OF IMAGE", nameOfImage);
    const name = shorthash.unique(nameOfImage);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("read image from cache");
      this.setState({
        source: {
          uri: image.uri,
        },
      });
      return;
    }

    console.log("downloading image to cache");
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
  };

  render() {
    return <ImageBackground style={this.props.style} source={this.state.source} >{this.props.children}</ImageBackground>;
  }
}
