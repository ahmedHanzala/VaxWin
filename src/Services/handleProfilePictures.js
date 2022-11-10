import { Storage, Auth } from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getImage = async (name) => {
  try {
    const url = await downloadImage(name);
    return url;
  } catch (error) {
    console.log("ERROR GETING IMAGE : ", error);
    return null;
  }
};
export const downloadImage = async (uri) => {
  try {
    const response = await Storage.get(uri, {
      expires: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const handleProfilePicture = async (imageUploaded) => {
  let uploadUrl = "";

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  const storeImageLocally = async (name, url) => {
    try {
      await AsyncStorage.setItem(name, url);
    } catch (error) {
      // Error saving data
    }
  };
  const uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      //level: "public",
      contentType: "image/jpeg",
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  try {
    if (imageUploaded.cancelled) {
      alert("Upload cancelled");
      return;
    } else {
      const img = await fetchImageFromUri(imageUploaded.uri);
      uploadUrl = await uploadImage(makeid(10) + ".jpg", img);
      return uploadUrl;
    }
  } catch (e) {
    console.log(e);
    alert("Upload failed");
  }
};
export default handleProfilePicture;
