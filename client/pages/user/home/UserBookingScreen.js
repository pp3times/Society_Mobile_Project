import { AppLayout } from "@/components/";
import { StyleSheet, Picker } from "react-native";
import { useState } from "react";
import { Layout, Text, Select, SelectItem, IndexPath, Button, Input } from "@ui-kitten/components";

const UserBookingScreen = ({ route, navigation }) => {
  const today = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [numChair, setNumChair] = useState(0);

  const barName = "โสดซิง";
  const barLocation = "ลาดกระบัง";

  const submit = () => {
    const detail = { barName: barName, dateBook: today, number: numChair };
    navigation.navigate("Confirm", { detail: detail });
  };
  return (
    <AppLayout>
      <Layout style={styles.container}>
        <Layout style={styles.box}>
          <Text style={styles.head}>จองโต๊ะ</Text>
          <Text style={styles.title}>
            ร้าน{barName} {barLocation}
          </Text>
          <Input status="control" style={styles.input} label="วันที่จอง" value={today} />
          <Input
            status="control"
            style={styles.input}
            label="จำนวนที่คน"
            placeholder="0"
            value={numChair}
            onChangeText={(nextValue) => setNumChair(nextValue)}
          />
        </Layout>
        <Layout style={styles.inputGroup}>
          <Button style={{ marginTop: "5%" }} onPress={submit} status="control">
            ดำเนินการต่อ
          </Button>
          <Button style={{ marginTop: "3%" }} status="basic" appearance="ghost" onPress={() => navigation.navigate("Main")}>
            ยกเลิก
          </Button>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingBottom: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
  select: {
    width: "100%",
  },
  input: {
    marginTop: "5%",
  },
  box: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
  },
  inputGroup: {
    width: "80%",
    marginTop: 2,
    rowGap: 20,
    backgroundColor: "#101010",
  },
  head: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "1%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UserBookingScreen;
