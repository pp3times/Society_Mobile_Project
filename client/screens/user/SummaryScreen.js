import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { BarsCards as Context } from "@/components/Context";
import UserLayout from "../../components/UserLayout";

const SummaryScreen = () => {
  const { setTicket } = useContext(Context);
  const route = useRoute();
  const navigation = useNavigation();
  const total = 10;
  console.log(route.params);
  console.log(total);
  const stripe = useStripe();
  const subscribe = async () => {
    const response = await fetch("http://localhost:8000/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: Math.floor(total * 100),
        // amount: Math.floor(total),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error);
    else {
      // occupied.push(...seats);
      setTicket({
        name: route.params.name,
        option: route.params.option,
        minSeat: route.params.minSeat,
        maxSeat: route.params.maxSeat,
        tableName: route.params.tableName,
        date: route.params.date,
        tableName: route.params.tableName,
        total: total,
        image: route.params.image,
        tableId: route.params.tableId,
      });
      navigation.navigate("Ticket", {
        name: route.params.name,
        option: route.params.option,
        minSeat: route.params.minSeat,
        maxSeat: route.params.maxSeat,
        tableName: route.params.tableName,
        date: route.params.date,
        tableName: route.params.tableName,
        total: total,
        image: route.params.image,
        tableId: route.params.tableId,
      });
    }
  };
  return (
    <UserLayout>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" style={{ marginLeft: 5 }} />
            <View style={{ marginLeft: 6 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>สรุปยอดจองโต๊ะ</Text>
              <Text
                style={{
                  marginTop: 2,
                  color: "gray",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                สำหรับการ{route.params.option}
              </Text>
              {/* <Text>{route.params.date}</Text> */}
            </View>
          </View>
          <AntDesign style={{ marginRight: 12 }} name="sharealt" size={24} color="black" />
        </View>
        <View style={{ alignItems: "flex-start", padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>ยืนยันการจองโต๊ะ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>{route.params.option}</Text>
          <Text style={{ color: "red", fontSize: 16 }}>{route.params.tableName}</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
          }}
        >
          ร้าน {route.params.name}
        </Text>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "black",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>DATE & TIME</Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>{route.params.date}</Text>
            {/* <Text>{moment(route.params.date).utc().format("MM/DD/YYYY")}</Text> */}
          </View>
          <Image
            source={{ uri: route.params.image }}
            style={{
              aspectRatio: 4 / 2,
              height: 60,
              borderRadius: 6,
              marginRight: 10,
            }}
          />
        </View>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "black",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>ค่าบริหารการจอง</Text>
          <Text style={{ fontSize: 16 }}>10 บาท</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
            color: "red",
            fontStyle: "italic",
          }}
        >
          * กรุณามาก่อนเวลาจอง 5-10 นาที
        </Text>
        <View style={{ marginVertical: 200 }} />
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: "green",
            marginHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Pressable onPress={subscribe}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>ชำระค่าจอง {total} บาท</Text>
          </Pressable>
        </View>

        {/* <Text>{route.params.date}</Text> */}
        {/* <Text>{route.params.minSeat}</Text> */}
        {/* <Text>{route.params.maxSeat}</Text> */}
        {/* <Text>{route.params.table}</Text> */}
        {/* <Text>{route.params.tableName}</Text> */}
        {/* <Text>{route.params.image}</Text> */}
      </SafeAreaView>
    </UserLayout>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
