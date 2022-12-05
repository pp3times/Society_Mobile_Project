import AppLayout from "../components/AppLayout";
import { StyleSheet, Alert, View, Text } from "react-native";
import { Input, Layout, Button, Icon } from "@ui-kitten/components";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import Logo from "@/components/Svg/Logo";
import * as SecureStore from "expo-secure-store";
import { BackIcon } from "../components/GetIcon";
const LoginScreen = ({ navigation }) => {
  const [chooseLogin, setChooseLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const login = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const res = await axios.post(`${BACKEND_URL}/api/auth/${chooseLogin == "user" ? "login" : "barlog"}`, data);
      const token = res.data.data.accessToken;
      const uid = res.data.data.id;
      const name = res.data.data.name;
      await SecureStore.setItemAsync("accesstoken", token);
      await SecureStore.setItemAsync("uid", `${uid}`);
      await SecureStore.setItemAsync("name", `${name}`);
      if (chooseLogin == "admin") {
        await navigation.navigate("admin");
      } else {
        await navigation.navigate("user");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("การเข้าสู่ระบบผิดพลาด", error?.response.data.msg, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <Text appearance="ghost" status="control" onPress={toggleSecureEntry} style={{ alignItems: "center" }}>
      <Icon onPress={toggleSecureEntry} {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </Text>
  );
  return (
    <AppLayout>
      {chooseLogin && (
        <Layout style={styles.nav}>
          <Button
            appearance="ghost"
            onPress={() => {
              setChooseLogin("");
              setEmail("");
              setPassword("");
            }}
          >
            <BackIcon />
          </Button>
        </Layout>
      )}

      <Logo style={styles.logo} />
      {!chooseLogin && (
        <Layout
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
            width: "80%",
            backgroundColor: "#101010",
          }}
        >
          <Button
            onPress={() => {
              setChooseLogin("user");
            }}
            status="control"
          >
            สำหรับลูกค้า
          </Button>
          <Button
            style={{ marginTop: 10, backgroundColor: "black" }}
            appearance="outline"
            status="control"
            onPress={() => {
              setChooseLogin("admin");
            }}
          >
            สำหรับร้านค้า
          </Button>
        </Layout>
      )}
      <Layout style={[styles.inputGroup, { display: !chooseLogin ? "none" : "flex" }]}>
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="กรุณากรอกอีเมล"
          value={email}
          autoCapitalize="none"
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="กรุณากรอกรหัสผ่าน"
          accessoryRight={renderIcon}
          value={password}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />
        <Button style={{ marginTop: "5%" }} onPress={login} status="control">
          เข้าสู่ระบบ
        </Button>
        <Button style={{ marginTop: "3%" }} status="basic" appearance="ghost" onPress={() => navigation.navigate("Register")}>
          สมัครสมาชิก
        </Button>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginVertical: "20%",
  },
  invisible: {
    display: "none",
  },
  visible: {
    display: "flex",
  },
  inputGroup: {
    flex: 1,
    width: "80%",
    marginTop: 2,
    rowGap: 20,
    backgroundColor: "#101010",
  },
  input: {
    marginTop: "7%",
  },
  nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    backgroundColor: "transparent",
    marginLeft: 10,
  },
});

export default LoginScreen;
