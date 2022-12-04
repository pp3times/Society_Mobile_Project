import { ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const BookingScreen = ({ navigation }) => {
  const [bookingOrders, setBookingOrder] = useState([]);
  const getReserve = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const res = await axios.get(`${BACKEND_URL}/api/user/reservation/${uid}`);
      console.log(res.data.data);
      setBookingOrder(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getReserve();
  }, []);

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        {bookingOrders.length != 0 ? (
          bookingOrders.map((order) => {
            let reserve = order.tableSeat;
            return (
              <Layout key={order.date} style={styles.view}>
                <Layout style={[styles.view, styles.card]}>
                  <Layout style={styles.cardBody}>
                    <Layout style={{ backgroundColor: "#303030" }}>
                      <Text>{reserve.bar.name}</Text>
                      <Text>วันที่จอง : {Date(order.orderDate)}</Text>
                      <Text>ประเถทโต๊ะ : {reserve.name}</Text>
                    </Layout>
                  </Layout>
                </Layout>
              </Layout>
            );
          })
        ) : (
          <Layout style={styles.view}>
            <Text style={[styles.title, { textAlign: "center" }]}>ยังไม่มีรายการที่จองไว้</Text>
          </Layout>
        )}
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
    backgroundColor: "#101010",
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
