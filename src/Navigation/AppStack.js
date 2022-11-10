import { createStackNavigator } from "@react-navigation/stack";
import AddChild from "../Screens/AddChild";
import AskDoctor from "../Screens/AskDoctor";
import BookingScreen from "../Screens/BookingScreen";
import Calender from "../Screens/Calender";
import HomeScreen from "../Screens/HomeScreen";
import VaccinationCenterNearby from "../Screens/VaccinationCenterNearby";
import BookDate from "../Screens/BookDate";
import VaccinationHistory from "../Screens/VaccinationHistory";
import Settings from "../Screens/Settings";
import Contact from "../Screens/Contact";
import EditName from "../Screens/EditName";
import ChangePassword from "../Screens/ChangePassword";
import ChangeEmail from "../Screens/ChangeEmail";
import Notifications from "../Screens/Notifications";
import BlogsScreen from "../Screens/BlogsScreen";
import SingleBlog from "../Screens/SingleBlog";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="Calender" component={Calender} />
      <Stack.Screen name="AddChild" component={AddChild} />
      <Stack.Screen
        name="VaccinationCenterNearby"
        component={VaccinationCenterNearby}
      />
      <Stack.Screen name="AskDoctor" component={AskDoctor} />
      <Stack.Screen name="BookDate" component={BookDate} />
      <Stack.Screen name="VaccinationHistory" component={VaccinationHistory} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
      <Stack.Screen name="BlogScreen" component={BlogsScreen} />
      <Stack.Screen name="SingleBlog" component={SingleBlog} />
    </Stack.Navigator>
  );
}
