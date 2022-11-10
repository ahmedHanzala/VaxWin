import { StyleSheet } from "react-native";
import Vaccinatify from "./Vaccinatify";
import { Provider } from "react-redux";
import store from './src/Redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Vaccinatify />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
