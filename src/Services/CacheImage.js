import React from "react";
import { Image, ImageBackground } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

export default class CacheImage extends React.Component {
  state = {
    source: null,
    nameOfImage: this.props.nameOfImage,
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const { nameOfImage } = this.props;
    const name = shorthash.unique(nameOfImage);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
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
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
