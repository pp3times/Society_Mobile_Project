import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";

const BookingScreen = ({ navigation }) => {
  const bookingOrders = [
    {
      order: [
        { id: 1, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
        { id: 2, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
      ],
      date: "30/10/2022",
    },
    {
      order: [
        { id: 3, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
        { id: 4, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
      ],
      date: "28/10/2022",
    },
    {
      order: [
        { id: 5, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
        { id: 6, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
      ],
      date: "27/10/2022",
    },
    {
      order: [
        { id: 7, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
        { id: 8, barName: "Me smile", dateBook: "1 มกราคม 2565", type: "โต๊ะขนาดกลาง", number: "4-6" },
      ],
      date: "26/10/2022",
    },
  ];

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        {bookingOrders.map((order) => {
          return (
            <Layout key={order.date} style={styles.view}>
              <Layout style={styles.titleBox}>
                <Text style={styles.title}>{order.date}</Text>
              </Layout>
              {order.order.map((books) => {
                return (
                  <Layout key={books.id} style={[styles.view, styles.card]}>
                    <Layout style={styles.cardBody}>
                      <Layout style={{ backgroundColor: "#303030" }}>
                        <Text>{books.barName}</Text>
                        <Text>วันที่จอง : {books.dateBook}</Text>
                        <Text>ประเภทโต๊ะ : {books.type}</Text>
                        <Text>จำนวนที่นั่ง : {books.number}</Text>
                      </Layout>
                      <Button
                        onPress={() => {
                          navigation.navigate("Qrcode", { detail: books });
                        }}
                        status="control"
                        size="small"
                      >
                        แสดง QR Code
                      </Button>
                    </Layout>
                  </Layout>
                );
              })}
            </Layout>
          );
        })}
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  cardBody: {
    width: "100%",
    backgroundColor: "#303030",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#303030",
    borderRadius: "15%",
    padding: 10,
    marginTop: 10,
  },
  view: {
    width: "100%",
    backgroundColor: "#101010",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "medium",
  },
  titleBox: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    backgroundColor: "black",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingBottom: "10%",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
});

export default BookingScreen;
