import { AppLayout } from "@/components/";
import { StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

const ConfirmScreen = ({ route, navigation }) => {
  const { detail } = route.params;
  const submit = () => {
    console.log("submit");
    navigation.navigate("Success")
  };
  return (
    <AppLayout>
      <Layout style={styles.container}>
        <Layout style={styles.box}>
          <Text style={styles.head}>ยืนยันการจอง</Text>
          <Layout style={styles.dataGroup}>
            <Text>ร้าน</Text>
            <Text>{detail.barName}</Text>
          </Layout>
          <Layout style={styles.dataGroup}>
            <Text>วันที่จอง</Text>
            <Text>{detail.dateBook}</Text>
          </Layout>
          <Layout style={styles.dataGroup}>
            <Text>จำนวนที่นั่ง</Text>
            <Text>{detail.number}</Text>
          </Layout>
        </Layout>
        <Layout style={styles.inputGroup}>
          <Button style={{ marginTop: "5%" }} onPress={submit} status="control">
            ดำเนินการต่อ
          </Button>
          <Button style={{ marginTop: "3%" }} status="basic" appearance="ghost" onPress={() => navigation.navigate("UserBooking")}>
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
  head: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "10%",
  },
  qrcode: {
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#101010",
  },
  dataGroup: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#101010",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
  },
  inputGroup: {
    width: "90%",
    marginTop: 2,
    rowGap: 20,
    backgroundColor: "#101010",
  },
});

export default ConfirmScreen;
