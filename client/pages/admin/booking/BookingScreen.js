import { AppLayout, CloseIcon } from "@/components/";
import { Layout, Text, Button, Modal, Card } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const BookingScreen = () => {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  let TableLeft = 0;
  const orderBooking = [
    {
      id: 1,
      nameCustomer: "loki",
      type: "โต๊ะหน้าเวที",
    },
    {
      id: 2,
      nameCustomer: "loki",
      type: "โต๊ะหน้าเวที",
    },
    {
      id: 3,
      nameCustomer: "loki",
      type: "โต๊ะหน้าเวที",
    },
  ];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleOpenBarCodeScan = () => {
    setVisible(true);
    setScanned(true);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setVisible(false);
    setScanned(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <AppLayout>
      <Layout style={{ backgroundColor: "#101010", flexDirection: "column", width: "80%" }}>
        <Layout style={{ backgroundColor: "#101010", width: "100%", marginBottom: 20 }}>
          <Text style={{ fontSize: 40, fontWeight: "500", marginVertical: 20, textAlign: "center" }}>รายการจอง</Text>
        </Layout>
        <Button onPress={handleOpenBarCodeScan} status="control">
          แสกน QR Code ลูกค้า
        </Button>
        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>จำนวนโต๊ะที่เหลือ {TableLeft} โต๊ะ</Text>
        <Layout style={{ backgroundColor: "#101010", borderTopWidth: 1, borderTopColor: "white", marginTop: 10, paddingTop: 20 }}>
          <ScrollView>
            {orderBooking.map((books) => {
              return (
                <Layout style={{ backgroundColor: "#101010", borderWidth: 1, borderColor: "white", borderRadius: "10%", padding: 10, marginBottom: 10 }}>
                  <Text>
                    คุณ {books.nameCustomer} {books.type}
                  </Text>
                </Layout>
              );
            })}
          </ScrollView>
        </Layout>
      </Layout>
      {/* modal */}
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{ backgroundColor: "#101010", width: "100%" }}>
          <Layout style={{ width: "100%", flexDirection: "column", backgroundColor: "transparent", marginLeft: -15 }}>
            <View style={{ height: 500, width: 500 }}>
              <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
            </View>
          </Layout>
          {scanned && (
            <Button
              onPress={() => {
                setScanned(false);
                setVisible(false);
              }}
            >
              close
            </Button>
          )}
        </Card>
      </Modal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  modal: {
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

export default BookingScreen;
