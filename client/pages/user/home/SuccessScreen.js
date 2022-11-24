import { AppLayout, SuccessImg } from "@/components/";
import { StyleSheet, Image } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";

const SuccessScreen = ({ navigation }) => {
  return (
    <AppLayout>
      <Layout style={styles.container}>
        <Layout style={styles.box}>
          <SuccessImg />
          <Text style={styles.head}>ทำรายการสำเร็จ</Text>
          <Text style={styles.title}>เราดำเนินการส่งรายการจองของคุณไปยังร้านแล้ว</Text>
          <Text style={styles.title}>โปรดรอการยืนยันจากร้านสำหรับการจองของคุณ</Text>
          <Text style={styles.subTitle}>รหัสอ้างอิง: RV-100010001</Text>
        </Layout>
        <Button
          style={{ marginTop: "5%", width: "80%" }}
          onPress={() => {
            navigation.navigate("Main");
          }}
          status="control"
        >
          เสร็จสิ้น
        </Button>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "5%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: "1%",
  },
  subTitle: {
    marginTop: "8%",
    fontSize: 15,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingBottom: "10%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
  box: {
    flex: 1,
    width: "100%",
    paddingBottom: "10%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
});

export default SuccessScreen;
