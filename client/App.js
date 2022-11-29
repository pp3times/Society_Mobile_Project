import React from "react";
import "expo-dev-menu";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeatherIconsPack } from "./components/feather-icons.js";
import LoginScreen from "./screens/LoginScreen";
import { UserScreen } from "./screens/user/UserScreen";
import { AdminScreen } from "./screens/admin/AdminScreen.js";
import CustomerRegisScreen from "./screens/register/CustomerRegisScreen";
import BarRegisScreen from "./screens/register/BarRegisScreen";
import ChooseRegisterScreen from "./screens/register/ChooseRegisterScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import { BarContext } from "@/components/";
const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <>
      <IconRegistry icons={FeatherIconsPack} />
      <BarContext>
        <StripeProvider publishableKey="pk_test_51M3dwME1vH1H0ffZQAG2WptnObD6NY86T24kRlf7eLitO6EvkV1YkAGDEiw7tI5qv0j4WNete7t8Jtotl9FjHZkr00upzaGewz"></StripeProvider>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="user"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={ChooseRegisterScreen} />
              <Stack.Screen name="CustomerRegis" component={CustomerRegisScreen} />
              <Stack.Screen name="BarRegis" component={BarRegisScreen} />
              <Stack.Screen name="admin" component={AdminScreen} />
              <Stack.Screen name="user" component={UserScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </BarContext>
    </>
  );
};
