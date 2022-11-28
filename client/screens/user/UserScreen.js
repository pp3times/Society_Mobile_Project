import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import BarScreen from "./BarScreen";
import TableScreen from "./TableScreen";
import TicketScreen from "./TicketScreen";
import SummaryScreen from "./SummaryScreen";

const Stack = createNativeStackNavigator();

const UserScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bars" component={BarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tables" component={TableScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export { UserScreen };
