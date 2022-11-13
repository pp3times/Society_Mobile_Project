import AppLayout from "../../components/AppLayout";
import Backbutton from "../../components/button/BackButton";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Logo from "../../components/Svg/Logo";

const InfoBarScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    console.log("register");
  };

  return (
    <AppLayout>
      <Backbutton navigation={navigation} />
      <Logo style={styles.logo} />
      <Layout style={styles.inputGroup}>
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="ชื่อร้าน"
          value={name}
          onChangeText={(nextValue) => setName(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="เบอร์โทร"
          value={phone}
          onChangeText={(nextValue) => setPhone(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="อีเมล"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="รหัสผ่าน"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChangeText={(nextValue) => setConfirmPassword(nextValue)}
        />
        <Button style={{ marginVertical: "10%", width: "100%" }} onPress={register} status="control">
          สมัครสมาชิก
        </Button>
      </Layout>
      <Text style={{ marginBottom: '10%' }}>Terms & conditions and privacy policy</Text>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    width: "80%",
    backgroundColor: "#101010",
    alignItems: "center",
  },
  input: {
    marginTop: "7%",
  },
});

export default InfoBarScreen;