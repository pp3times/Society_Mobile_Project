import { AppLayout, CloseIcon } from "@/components/";
import { Layout, Text, Button, Modal, Card } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const BookingScreen = ({ route, navigation }) => {
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

  return (
    <AppLayout>
      <Layout style={{ backgroundColor: "#101010", flexDirection: "column", width: "90%" }}>
        <Layout style={{ backgroundColor: "#101010", width: "100%", marginBottom: 20 }}>
          <Text style={{ fontSize: 40, fontWeight: "500", marginVertical: 20, textAlign: "center" }}>รายการจอง</Text>
        </Layout>
        <Button onPress={() => navigation.navigate("BookScan", { id: 1 })} status="control">
          แสกน QR Code ลูกค้า
        </Button>
        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>จำนวนโต๊ะที่เหลือ {TableLeft} โต๊ะ</Text>
        <Layout style={{ backgroundColor: "#101010", borderTopWidth: 1, borderTopColor: "white", marginTop: 10, paddingTop: 20 }}>
          <ScrollView style={{ height: '65%' }}>
            {orderBooking.map((books) => {
              return (
                <Layout
                  key={books.id}
                  style={{ backgroundColor: "#101010", borderWidth: 1, borderColor: "white", borderRadius: "10%", padding: 10, marginBottom: 10 }}
                >
                  <Text>
                    คุณ {books.nameCustomer} {books.type}
                  </Text>
                </Layout>
              );
            })}
          </ScrollView>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

export default BookingScreen;
