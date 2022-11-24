import React from "react";
import 'expo-dev-menu';
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeatherIconsPack } from "./components/feather-icons.js";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/user/UserScreen";
import AdminScreen from "./screens/admin/AdminScreen"
import CustomerRegisScreen from "./screens/register/CustomerRegisScreen";
import BarRegisScreen from "./screens/register/BarRegisScreen";
import ChooseRegisterScreen from "./screens/register/ChooseRegisterScreen";

const Stack = createNativeStackNavigator();

export default App = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(true);
  return (
    <>
      <IconRegistry icons={FeatherIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        {isLogin ? (
          isAdmin ? (
            <AdminScreen />
          ) : (
            <UserScreen />
          )
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={ChooseRegisterScreen} />
              <Stack.Screen name="CustomerRegis" component={CustomerRegisScreen} />
              <Stack.Screen name="BarRegis" component={BarRegisScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ApplicationProvider>
    </>
  );
};
