import { StyleSheet } from "react-native";
import { useState } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";
const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <AppLayout>
      <Input
        style={[styles.input, { backgroundColor: "black" }]}
        size="large"
        status="control"
        placeholder="ค้าหาร้าน"
        value={search}
        onChangeText={(nextValue) => setSearch(nextValue)}
      />
      <Layout style={[styles.bar, { marginVertical: "10%" }]}>
        <Text style={styles.title}>ร้าน และบาร์ใกล้ฉัน</Text>
        <Text onPress={() => navigation.navigate("BarDeatil")}>เพิ่มเติม</Text>
      </Layout>
      <Layout></Layout>
      <Layout style={[styles.bar, { marginVertical: "10%" }]}>
        <Text style={styles.title}>ร้านยอดนิยม</Text>
      </Layout>
      
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "medium",
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  logo: {
    marginVertical: "20%",
  },
  buttonGroup: {
    flex: 1,
    width: "80%",
    marginTop: 2,
    rowGap: 20,
  },
  input: {
    marginTop: "7%",
  },
});

export default HomeScreen;
