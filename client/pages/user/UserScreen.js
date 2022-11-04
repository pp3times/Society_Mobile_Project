import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Text } from "@ui-kitten/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeIcon, BookIcon, UserIcon } from "../../components/GetIcon";
import UserInfoScreen from "./userinfo/UserInfoScreen";
import HomeScreen from "./home/HomeScreen";
import BookingScreen from "./booking/BookingScreen";
import QrcodeScreen from "./booking/QrcodeScreen";
import BarDetailScreen from "./home/BarDetailScreen";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="BarDeatil" component={BarDetailScreen} />
      {/* <Stack.Screen name="CustomerRegis" component={CustomerRegisScreen} />
      <Stack.Screen name="BarRegis" component={BarRegisScreen} /> */}
    </Stack.Navigator>
  );
};

const BookStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Booking"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Qrcode" component={QrcodeScreen} />
    </Stack.Navigator>
  );
};

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    style={[styles.bottomNavigation]}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="หน้าหลัก" icon={HomeIcon} />
    <BottomNavigationTab title="การจอง" icon={BookIcon} />
    <BottomNavigationTab title="ข้อมูลส่วนตัว" icon={UserIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={HomeStack} />
    <Screen name="Book" component={BookStack} />
    <Screen name="UserInfo" component={UserInfoScreen} />
  </Navigator>
);

export default UserScreen = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: "5%",
    backgroundColor: "black",
  },
});
