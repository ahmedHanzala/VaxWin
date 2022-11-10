import * as React from "react";
import { Drawer, Avatar } from "react-native-paper";
import { Text, View ,Platform, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { fonts } from "../assets/fonts/fonts";
import { windowHeight } from "../assets/constants";
import colors from "../assets/colors/colors";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile } from "../Redux/Slices/ProfileSlice";
import { resetChildren } from "../Redux/Slices/ChildrenSlice";
import Loader from "./Loader";
import { resetNotifications } from "../Redux/Slices/NotificationsSlice";
import { resetBlogs } from "../Redux/Slices/BlogsSlice";

const DrawerComponent = ({ navigation }) => {
  const user = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const [active, setActive] = React.useState("");

  const signOut = async () => {
    dispatch(resetProfile());
    dispatch(resetChildren());
    dispatch(resetNotifications());
    dispatch(resetBlogs());
    Auth.signOut();
  };
  if (user.name) {
    return (
      <SafeAreaView
        style={{
          marginHorizontal: 16,
          justifyContent: "space-between",
          marginTop: "10%",
        }}
      >
        <Drawer.Section style={{ flexDirection: "row", marginLeft: 5 }}>
          <Avatar.Icon
            size={RFValue(70)}
            icon="account"
            style={{
              borderRadius: 100,
              backgroundColor: 'rgb(138, 168, 166)',
            }}
            color="#D3D3D3"
          />
          <Text
            style={[
              fonts.smallText,
              {
                flex: 1,
                paddingLeft: "10%",
                fontSize: 20,
                paddingTop: "15%",
                color: colors.textDefault,
              },
            ]}
          >
            {user.name.length > 9
              ? user.name.substring(0, 7) + "..."
              : user.name}
          </Text>
        </Drawer.Section>

        <Drawer.Section style={{ marginTop: "15%" }}>
          <Drawer.Item
            label={
              <Text
                style={[
                  fonts.smallText,
                  { color: colors.PrimaryColor, fontSize: 18 },
                ]}
              >
                History
              </Text>
            }
            icon={"hospital-box"}
            active={active === "History"}
            onPress={() => {
              navigation.navigate("VaccinationHistory");
            }}
          />

          <Drawer.Item
            label={
              <Text
                style={[
                  fonts.smallText,
                  { color: colors.PrimaryColor, fontSize: 18 },
                ]}
              >
                Contact
              </Text>
            }
            icon={"phone"}
            active={active === "Contact"}
            onPress={() => {
              navigation.navigate("Contact");
            }}
          />
          <Drawer.Item
            label={
              <Text
                style={[
                  fonts.smallText,
                  { color: colors.PrimaryColor, fontSize: 18 },
                ]}
              >
                Settings
              </Text>
            }
            icon={"cog"}
            active={active === "Settings"}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        </Drawer.Section>
        <View style={{ height:RFValue(windowHeight/2.4 )}}></View>
        <Drawer.Section style={styles.logout}>
          <Drawer.Item
            icon={"logout"}
            label={
              <Text
                style={[
                  fonts.smallText,
                  { color: colors.PrimaryColor, fontSize: 18 },
                ]}
              >
                Logout
              </Text>
            }
            active={active === "Logout"}
            onPress={() => {
              setActive("Logout");
              signOut();
            }}
          />
        </Drawer.Section>
      </SafeAreaView>
    );
  } else {
    <Loader />;
  }
};
const styles= StyleSheet.create({
 
})
export default DrawerComponent;
