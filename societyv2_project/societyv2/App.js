import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BarContext } from "./Context";
import HomeScreen from "./screens/HomeScreen";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <>
      <BarContext>
        <StripeProvider publishableKey="pk_test_51M3dwME1vH1H0ffZQAG2WptnObD6NY86T24kRlf7eLitO6EvkV1YkAGDEiw7tI5qv0j4WNete7t8Jtotl9FjHZkr00upzaGewz">
          <StackNavigator />
          <StatusBar style="auto" />
        </StripeProvider>
      </BarContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
