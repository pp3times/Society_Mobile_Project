import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Tab, Text } from "@ui-kitten/components";
import { SettingIcon, BookIcon, UserIcon } from "@/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./register/Register";
import ManageScreen from "./manageBar/ManageScreen";
import BookingScreen from "./booking/BookingScreen";

import barInfo from "./barInfo/barInfo";
import ScanScreen from "./booking/Scanner";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    style={styles.bottomNavigation}
    onSelect={(index) => {
      // const screen = state.routeNames[index] == "Home" ? "Main" : "Booking";
      // { screen: screen, initial: false }
      navigation.navigate(state.routeNames[index]);
    }}
  >
    <BottomNavigationTab title="จัดการร้าน" icon={SettingIcon} />
    <BottomNavigationTab title="การจอง" icon={BookIcon} />
    <BottomNavigationTab title="ข้อมูลส่วนตัว" icon={UserIcon} />
  </BottomNavigation>
);

const BookingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Booking"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="BookScan" component={ScanScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Manage" component={ManageScreen} />
    <Screen name="Book" component={BookingStack} />
    <Screen name="UserInfo" component={barInfo} />
  </Navigator>
);

export default AdminScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: "5%",
    backgroundColor: "black",
  },
});
