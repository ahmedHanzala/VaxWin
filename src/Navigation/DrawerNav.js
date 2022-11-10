import DrawerComponent from "../Components/DrawerComponent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabNavigator from "./HomeTabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Drawer1 = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationContainer>
      <Drawer1.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
        screenOptions={{ headerShown: false, }}
      >
        <Drawer1.Screen name="HomeStack" component={HomeTabNavigator} />
      </Drawer1.Navigator>
    </NavigationContainer>
  );
}
