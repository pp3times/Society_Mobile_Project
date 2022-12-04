import { Alert, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";
const UserInfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);

  const edit = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      let data = {
        name: name,
        email: email,
        phoneNumber: phone,
      };
      const res = await axios.patch(`${BACKEND_URL}/api/user/${uid}`, data);
      setStatus(true);
      setTimeout(() => {
        setStatus(false)
      }, 1000);
    } catch (error) {
      Alert.alert("อัพเดตข้อมูลไม่สำเร็จ", "มีชื่อ หรือ อีเมลล์แล้ว", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  const getUser = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const res = await axios.get(`${BACKEND_URL}/api/user/${uid}`);
      const user = res.data.data;
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStatus(false);
    getUser();
  }, []);
  return (
    <AppLayout>
      <Layout style={styles.container}>
        <Layout style={styles.group}>
          <Text style={styles.head}>อัพเดตข้อมูลส่วนตัว</Text>
          {status && <Text style={{ color: "green", marginTop: 10 }}>อัพเดตข้อมูลส่วนตัวสำเร็จ</Text>}
          <Input
            style={[styles.input]}
            size="large"
            status="control"
            autoCapitalize="false"
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Input style={[styles.input]} size="large" status="control" value={phone} onChangeText={(nextValue) => setPhone(nextValue)} />
          <Input style={[styles.input]} size="large" status="control" value={email} onChangeText={(nextValue) => setEmail(nextValue)} />
        </Layout>
        <Layout style={styles.group}>
          <Button status="control" style={{ marginTop: "5%", width: "100%" }} onPress={edit}>
            ยืนยันการแก้ไข
          </Button>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "5%",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "medium",
  },
  group: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
  input: {
    marginTop: "7%",
  },
});

export default UserInfoScreen;
