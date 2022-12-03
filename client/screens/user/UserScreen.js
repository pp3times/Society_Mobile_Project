import React from "react";
import { StyleSheet } from "react-native";
import { HomeIcon, BookIcon, UserIcon } from "@/components/GetIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Text } from "@ui-kitten/components";
import HomeScreen from "./HomeScreen";
import BarScreen from "./BarScreen";
import TableScreen from "./TableScreen";
import TicketScreen from "./TicketScreen";
import SummaryScreen from "./SummaryScreen";
import UserInfoScreen from "./UserInfoScreen";
import * as SecureStore from "expo-secure-store";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import BarDetailScreen from "./BarDetailScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const { Navigator, Screen } = createBottomTabNavigator();

const LogoutHandler = async (navigation) => {
  await SecureStore.deleteItemAsync("accesstoken");
  await navigation.navigate("Login");
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList label="" {...props} />
      <DrawerItem label="ออกจากระบบ" onPress={() => LogoutHandler(props.navigation)} />
    </DrawerContentScrollView>
  );
}

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bars" component={BarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tables" component={TableScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={BarDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    style={[styles.bottomNavigation]}
    onSelect={(index) => {
      const screen = state.routeNames[index] == "s1" ? "Home" : "Booking";
      navigation.navigate(state.routeNames[index], { screen: screen, initial: false });
    }}
  >
    <BottomNavigationTab title="หน้าหลัก" icon={HomeIcon} />
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
    <Screen name="s1" component={UserStack} />
    <Screen name="User" component={UserInfoScreen} />
  </Navigator>
);
const UserScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="main" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="main" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export { UserScreen };

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: "5%",
    backgroundColor: "white",
  },
});
