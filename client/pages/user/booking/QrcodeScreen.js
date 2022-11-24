import { AppLayout } from "@/components/";
import { StyleSheet } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import QRCode from "react-native-qrcode-svg";
import { Backbutton } from "../../../components";

const QrcodeScreen = ({ route, navigation }) => {
  const { detail } = route.params;
  const data = [{ data: detail.data }];
  return (
    <AppLayout>
      <Backbutton navigation={navigation} />
      <Layout style={styles.qrcode}>
        <QRCode size={250} value={data} />
      </Layout>
      <Layout style={styles.container}>
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
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: "10%",
    backgroundColor: "#101010",
    paddingHorizontal: "20%",
  },
  qrcode: {
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#101010",
  },
  dataGroup: {
    marginTop: 20,
    backgroundColor: "#101010",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default QrcodeScreen;
