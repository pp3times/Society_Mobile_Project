import AppLayout from "../components/AppLayout";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Input, Layout, Button } from "@ui-kitten/components";
import { useState } from "react";
import Logo from "../components/Svg/Logo";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    console.log("login");
  };
  return (
    <AppLayout>
      <Logo style={styles.logo} />
      <Layout style={styles.inputGroup}>
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status='control'
          placeholder="Place your Email"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status='control'
          placeholder="Place your Password"
          value={password}
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
});

export default LoginScreen;
