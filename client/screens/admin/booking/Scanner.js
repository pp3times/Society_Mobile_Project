import { AppLayout, CloseIcon, Backbutton } from "@/components/";
import { Text, Button, Modal, Card, Layout } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanData, setScanData] = useState({});
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data && type) {
      setVisible(true);
      getData(data);
      console.log(scanData);
    } else {
      alert("scan is not successfully");
      setScanned(false);
    }
  };

  const getData = async (code) => {
    try {
      const data = {
        passcode: `${code}`,
      };
      console.log(data);
      const res = await axios.post(`${BACKEND_URL}/api/bar/reservation/receive`, data);
      console.log(res.data.data);
      setScanData(res.data.data);
      setVisible(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <AppLayout>
        <Backbutton navigation={navigation} style={{ position: "absolute", zIndex: 99, marginTop: 10 }} />
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
          <Card disabled={true} style={{ backgroundColor: "#101010", width: "100%",paddingBottom:20 }}>
            <Layout style={{ width: "100%", flexDirection: "column", alignItems: "center", backgroundColor: "transparent", marginTop: 10 }}>
              <Text style={{ marginBottom: 20, fontSize:25 }}>ยืนยันการจองโต๊ะเรียบร้อย</Text>
              <Text style={{ fontSize:20 }}>วันที่:{Date(scanData?.orderDate).substring(0, 15)}</Text>
              <Text style={{ fontSize:20 }}>เวลา:{Date(scanData?.orderDate).substring(15, 21)}</Text>
              <Text style={{ fontSize:20 }}>โต๊ะ : {scanData?.tableSeat?.name}</Text>
            </Layout>
            <Layout style={{ width: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "transparent", marginTop: 20 }}>
              <Button
                status="control"
                size="large"
                onPress={() => {
                  setVisible(false);
                  setScanned(false);
                  navigation.navigate("Booking");
                }}
              >
                close
              </Button>
            </Layout>
          </Card>
        </Modal>
      </AppLayout>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "200px",
    backgroundColor: "#101010",
    marginBottom: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "100%",
    backgroundColor: "#101010",
  },
  img: {
    width: "100%",
    height: 250,
  },
  content: {
    marginTop: "5%",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: "5%",
    backgroundColor: "#101010",
  },
  box: {
    marginTop: "5%",
    paddingTop: "5%",
    borderTopWidth: 2,
    borderTopColor: "white",
    width: "100%",
    backgroundColor: "#101010",
  },
});

export default ScanScreen;
