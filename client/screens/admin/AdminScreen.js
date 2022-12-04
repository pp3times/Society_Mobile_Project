import React, { useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Tab, Text } from "@ui-kitten/components";
import { SettingIcon, BookIcon, UserIcon } from "@/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageScreen from "./manageBar/ManageScreen";
import BookingScreen from "./booking/BookingScreen";
import * as SecureStore from "expo-secure-store";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

import barInfo from "./barInfo/barInfo";
import ScanScreen from "./booking/Scanner";

const Drawer = createDrawerNavigator();
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

const AdminTabs = () => {
  return (
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
};

const LogoutHandler = async (navigation) => {
  await SecureStore.deleteItemAsync("accesstoken");
  await navigation.navigate("Login");
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="ออกจากระบบ" onPress={() => LogoutHandler(props.navigation)} />
    </DrawerContentScrollView>
  );
}

const AdminScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#101010" },
        headerTintColor: "white",
        drawerLabelStyle: {
          color: "white",
        },
        drawerActiveBackgroundColor: "black",
        drawerInactiveTintColor: "black",
      }}
    >
      <Drawer.Screen name="Home" component={AdminTabs} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: "5%",
    backgroundColor: "black",
  },
});

export { AdminScreen };
