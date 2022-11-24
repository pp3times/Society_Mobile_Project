import { AppLayout, CloseIcon, Backbutton } from "@/components/";
import { Text, Button, Modal, Card, Layout } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanData, setScanData] = useState([]);
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
      setScanData([data, type]);
    } else {
      alert("scan is not successfully");
      setScanned(false);
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
        <Backbutton navigation={navigation} style={{ position: "absolute", zIndex: 99, top: "10%" }} />
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
          <Card disabled={true} style={{ backgroundColor: "#101010", width: "100%" }}>
            <Layout style={{ width: "100%", flexDirection: "column", alignItems: "center", backgroundColor: "transparent", marginTop: 10 }}>
              {scanData.map((item) => {
                return <Text>{item}</Text>;
              })}
            </Layout>
            <Layout style={{ width: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "transparent", marginTop: 10 }}>
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
