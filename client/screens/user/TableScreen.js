import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
	Alert,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { BarsCards } from "@/components/";
import { useStripe } from "@stripe/stripe-react-native";

const TableScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const navigation = useNavigation();
  const { seats, setSeats, occupied } = useContext(BarsCards);
  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };
	const displaySeats = [seats]
  const fee = 0;
  const noOfSeats = seats.length;
  const total = seats.length > 0 ? fee + noOfSeats * 10 : 0;
  console.log(total);
  console.log(seats, "seats selected");
  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text
            key={index}
            style={{ marginTop: 4, fontSize: 17, paddingRight: 10 }}
          >
            {seat}
          </Text>
        ))}
      </View>
    );
  };
	const stripe = useStripe();
	const subscribe = async () => {
		const response = await fetch("http://localhost:8000/payment", {
			method: "POST",
			body: JSON.stringify({
				amount: Math.floor(total * 100)
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		// console.log(data)
		if(!response.ok) return Alert.alert(data.message);
		const clientSecret = data.clientSecret;
		const initSheet = await stripe.initPaymentSheet({
			paymentIntentClientSecret: clientSecret
		});
		if(initSheet.error) return Alert.alert(initSheet.error.message);
		const presentSheet = await stripe.presentPaymentSheet({
			clientSecret
		});
		if(presentSheet.error) return Alert.alert(presentSheet.error);
		else {
			occupied.push(...seats);
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
				selectedSeats: displaySeats,
      });

			setSeats([]);
		}
	}
	// setSeats([]);
	console.log(route.params)
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
            style={{ marginLeft: 5 }}
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {route.params.name}
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: "gray",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {route.params.option}
            </Text>
            {/* <Text>{route.params.date}</Text> */}
          </View>
        </View>
        <AntDesign
          style={{ marginRight: 12 }}
          name="sharealt"
          size={24}
          color="black"
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {route.params.date}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          marginTop: 10,
          color: "gray",
        }}
      >
        {route.params.tableName}
      </Text>
      <View style={{ marginTop: 20 }} />
      <FlatList
        numColumns={7}
        data={route.params.table}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSeatSelect(item)}
            style={
              seats.includes(item)
                ? {
                    backgroundColor: "#FFC40C",
                    margin: 10,
                    borderColor: "gray",
                    borderWidth: 0.5,
                    padding: 8,
                    borderRadius: 5,
                    width: 35.5,
                    height: 35.5,
                  }
                : occupied.includes(item)
                ? {
                    backgroundColor: "#989898",
                    margin: 10,
                    borderColor: "gray",
                    borderWidth: 0.5,
                    padding: 8,
                    borderRadius: 5,
                    width: 35.5,
                    height: 35.5,
                  }
                : {
                    margin: 10,
                    borderColor: "gray",
                    borderWidth: 0.5,
                    padding: 8,
                    borderRadius: 5,
                    width: 35.5,
                    height: 35.5,
                  }
            }
          >
            <Text>{item}</Text>
            {/* {seats.includes(item) ? (
              <Text style={{ backgroundColor: "#FFC40C" }}>{item}</Text>
            ) : (
              <Text style={{}}>{item}</Text>
            )} */}
          </Pressable>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 20,
          backgroundColor: "#D8D8D8",
          paddingVertical: 10,
          paddingHorizontal: 40,
        }}
      >
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#FFC40C"
          />
          <Text>Selected</Text>
        </View>
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="white"
          />
          <Text>Vacant</Text>
        </View>
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#989898"
          />
          <Text>Occupied</Text>
        </View>
      </View>
      <View
        style={{
          // padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 4, fontSize: 15, fontWeight: "500" }}>
            ค่าจองโต๊ะละ 10 บาท{" "}
            {/* <Text style={{ color: "#CE0000" }}>( กรุณามาก่อนเวลา 20:00 น. )</Text> */}
          </Text>
          {seats.length > 0 ? (
            showSeats()
          ) : (
            <Text style={{ fontSize: 18 }}>No seats selected</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            marginTop: 10,
          }}
        >
          <Text style={{ width: 100, color: "#CE0000" }}>
            กรุณามาก่อนเวลา 20:00 น.
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#FFC40C",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        {seats.length > 0 ? (
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            จำนวนที่นั่ง {seats.length}{" "}
          </Text>
        ) : (
          <Text></Text>
        )}
        <Text></Text>
        <Pressable onPress={subscribe}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            ชำระค่าจอง {total} บาท
          </Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default TableScreen;

const styles = StyleSheet.create({});
