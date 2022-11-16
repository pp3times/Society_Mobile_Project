import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BarScreen from "./screens/BarScreen";
import TableScreen from "./screens/TableScreen";
import TicketScreen from "./screens/TicketScreen";
import SummaryScreen from "./screens/SummaryScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bars"
          component={BarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tables"
          component={TableScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ticket"
          component={TicketScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
