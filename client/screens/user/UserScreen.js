import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import BarScreen from "./BarScreen";
import TableScreen from "./TableScreen";
import TicketScreen from "./TicketScreen";
import SummaryScreen from "./SummaryScreen";
import { BarContext } from "@/components/";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bars" component={BarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tables" component={TableScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Ticket" component={TicketScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserScreen = () => {
  return (
    <BarContext>
      <StripeProvider publishableKey="pk_test_51M3dwME1vH1H0ffZQAG2WptnObD6NY86T24kRlf7eLitO6EvkV1YkAGDEiw7tI5qv0j4WNete7t8Jtotl9FjHZkr00upzaGewz">
        <StackNavigator />
        <StatusBar style="auto" />
      </StripeProvider>
    </BarContext>
  );
};
