import React from "react";
import * as eva from "@eva-design/eva";
import {default as theme} from './assets/custom-theme.json'
import { ApplicationProvider, IconRegistry, Layout, Text } from "@ui-kitten/components";
import { FeatherIconsPack } from "./components/feather-icons.js";
import LoginScreen from "./pages/LoginScreen";
import UserScreen from "./pages/user/UserScreen";
import AdminScreen from "./pages/admin/AdminScreen";


export default App = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  return (
    <>
      <IconRegistry icons={FeatherIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        {isLogin ? (isAdmin ? <AdminScreen /> : <UserScreen />): <LoginScreen />}
      </ApplicationProvider>
    </>
  );
};
