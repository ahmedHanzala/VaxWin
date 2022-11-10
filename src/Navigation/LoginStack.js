import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConfirmEmailScreen from '../Screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import Login from '../Screens/Login';
import OnBoarding from '../Screens/OnBoarding.js';
import Register from '../Screens/Register';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}
    
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
