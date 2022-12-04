import { StyleSheet } from "react-native";
import { useState } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";
const UserInfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const edit = () => {
    console.log("edit");
  };
  return (
    <AppLayout>
      <Layout style={styles.container}>
        <Layout style={styles.group}>
          <Text style={styles.head}>อัพเดตข้อมูลส่วนตัว</Text>
          <Input
            style={[styles.input, { backgroundColor: "white" }]}
            size="large"
            status="control"
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Input
            style={[styles.input, { backgroundColor: "white" }]}
            size="large"
            status="control"
            value={phone}
            onChangeText={(nextValue) => setPhone(nextValue)}
          />
          <Input
            style={[styles.input, { backgroundColor: "white" }]}
            size="large"
            status="control"
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
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
