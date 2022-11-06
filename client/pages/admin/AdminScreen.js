import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Tab, Text } from "@ui-kitten/components";
import { SettingIcon, BookIcon, UserIcon } from "../../components/GetIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ManageScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);
const UserInfo = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">UserInfo</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    style={styles.bottomNavigation}
    onSelect={(index) => {
      const screen = state.routeNames[index] == "Home" ? "Main" : "Booking";
      navigation.navigate(state.routeNames[index], { screen: screen, initial: false });
    }}
  >
    <BottomNavigationTab title="จัดการร้าน" icon={SettingIcon} />
    <BottomNavigationTab title="การจอง" icon={BookIcon} />
    <BottomNavigationTab title="ข้อมูลส่วนตัว" icon={UserIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Manger" component={ManageScreen} />
    <Screen name="Book" component={OrdersScreen} />
    <Screen name="UserInfo" component={UserInfo} />
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
        <Stack.Screen name="Main" component={ManageScreen} />
        <Stack.Screen name="BarDeatil" component={OrdersScreen} />
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
