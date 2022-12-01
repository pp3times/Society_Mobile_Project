import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import BarScreen from "./BarScreen";
import TableScreen from "./TableScreen";
import TicketScreen from "./TicketScreen";
import SummaryScreen from "./SummaryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const LogoutHandler = async (navigation) => {
  await AsyncStorage.removeItem("accesstoken");
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
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bars" component={BarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tables" component={TableScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const UserScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="main" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="main" component={UserStack} />
    </Drawer.Navigator>
  );
};

export { UserScreen };
