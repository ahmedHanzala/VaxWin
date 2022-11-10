import { Auth, Hub } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import colors from "../assets/colors/colors";
import { parseDates, addDays, compare, compareDates } from "../Services/Parser";
import { View } from "react-native";
import { listVaccines } from "../graphql/queries";
import LoginStack from "./LoginStack";
import DrawerNav from "./DrawerNav";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import { getUser, listBookings, listVaccineChildren } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { resetProfile, setProfile } from "../Redux/Slices/ProfileSlice";
import { addChild, resetChildren,setLengthCloud } from "../Redux/Slices/ChildrenSlice";
import { windowHeight } from "../assets/constants";
import { getBlogsAsync } from "../graphql/custom-queries";
import { initializeBlogs } from "../Redux/Slices/BlogsSlice";
import { updateCurrentDueVaccine } from "../Redux/Slices/CurrentDueVaccine";
import { getImage } from "../Services/handleProfilePictures";
import Loader from "../Components/Loader";

export default function AuthStack() {
  const dispatch = useDispatch();
  const children = useSelector(state=>state.children)
  const [user, setUser] = useState(undefined);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const LoadBlogsAsync = async () => {
    const response = await getBlogsAsync(3);
    dispatch(initializeBlogs(response));
  };

  const nextDueVaccine = async (bookings, DOB) => {
    const vaccinesNotTaken = await API.graphql({
      ...graphqlOperation(listVaccines),
      authMode: "API_KEY",
    });

    const notTaken = vaccinesNotTaken.data.listVaccines.items.filter((item) => {
      if (bookings.find((vaccine) => vaccine.Vaccine.id === item.id)) {
        return false;
      }
      return true;
    });

    let overDue = false;
    const nextVaccine = notTaken.sort(compare);
    let timing = nextVaccine[0].timingWeeks;
    const DueVaccines = nextVaccine.filter(
      (item) => item.timingWeeks === timing
    );
    //parse timing
    let date = addDays(DOB, timing * 7);
    if (compareDates(date, new Date()) === -1) {
      overDue = true;
    }
    date = parseDates(date, false);

    return {
      nextDueList: DueVaccines,
      overDue: overDue,
      date: date,
    };
  };

  const setChildrenData = async (data) => {
    //parsing

    data.forEach(async (child, index) => {
      const response = await API.graphql({
        ...graphqlOperation(listVaccineChildren, {
          filter: { childID: { eq: child.id } },
        }),
        authMode: "API_KEY",
      });

      const bookingResponse = await API.graphql({
        ...graphqlOperation(listBookings, {
          filter: { childID: { eq: child.id } },
        }),
        authMode: "API_KEY",
      });
      //vaccine array
      const nextDue = await nextDueVaccine(
        bookingResponse.data.listBookings.items,
        JSON.parse(child.DOB)
      );
      var parsedChild = {
        DOB: JSON.parse(child.DOB),
        id: child.id,
        image: child.image,
        parent: child.parent,
        name: child.name,
        vaccinesTaken: response.data.listVaccineChildren.items,
        bookings: bookingResponse.data.listBookings.items,
        nextDueVaccine: nextDue,
      };
      dispatch(addChild(parsedChild));
      if (index === 0) {
        let imageuri = "";
        if (child.image !== "") {
          imageuri = await getImage(child.image);
        }

        dispatch(
          updateCurrentDueVaccine({
            vaccineName: nextDue.nextDueList[0].name,
            date: nextDue.date,
            image: child.image,
            imageURI: imageuri,
          })
        );
      }
    });
  };

  const updateUserData = async (userId) => {
    try {
      const user1 = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      var parsedUser = {
        name: user1.data.getUser.name,
        email: user1.data.getUser.email,
        id: user1.data.getUser.id,
        phone_number: user1.data.getUser.phone_number,
      };
      dispatch(setLengthCloud(user1.data.getUser.children.items.length))
      dispatch(setProfile(parsedUser));
      setChildrenData(user1.data.getUser.children.items)
  
    } catch (e) {
      console.log("ERROR Getting user data:", e);
    }
  };
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      LoadBlogsAsync();
      updateUserData(authUser.attributes.sub).then(() => {
        setUser(authUser);
        
      });

      //update children
    } catch (e) {
      console.log("ERROR", e);
      setUser(null);
    }
  };
  let cacheResources = async () => {
    const images = [
      require("../assets/images/background-mother-with-child.png"),
      require("../assets/images/yellow-baby-with-hand.png"),
      require("../assets/images/baby.png"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };
  const loadResources = async () => {
    await cacheResources();
    setAssetsLoaded(true);
  };

  useEffect(() => {
    checkUser();
    loadResources();
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);
  if (user === undefined) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: windowHeight / 2,
        }}
      >
        <ActivityIndicator color={colors.PrimaryColor} />
      </View>
    );
  }
  return user ? (((children.lengthCloud <= children.children.length) && assetsLoaded)? <DrawerNav />: <Loader/>) : assetsLoaded ? <LoginStack /> : <AppLoading />;
}
