import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import { BarsCards } from "./Context";
import TicketComponent from "./TicketComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from "../apis/jsonPlaceholder";
import { Input, Button, Icon } from "@ui-kitten/components";

import * as SecureStore from "expo-secure-store";

const BarCards = () => {
  const navigation = useNavigation();
  const { ticket } = useContext(BarsCards);
  const [search, setSearch] = useState();

  const [ticketData, setTicketData] = useState("");
  async function getValue(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
  }
  const getFetch = async () => {
    const uid = await getValue("uid");
    axios
      .get(`http://localhost:8080/api/bar/reservation/waiting/${Number(uid)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data[0]);
        setTicketData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getFetch();
  }, []);
  // console.log(ticketData)

  const [bar, error, loading, axiosFetch] = useAxiosFunction();

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/api/bar/all",
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(ticket, 'is ticket')
    // console.log(typeof ticket)
  }, [ticket]);

  const handlerSearch = (input) => {
    const result = bar.data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
    setSearch(result);
  };

  return (
    <View style={{ backgroundColor: "#101010", paddingBottom: "20%" }}>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          autoCapitalize="none"
          onChangeText={(nextValue) => handlerSearch(nextValue)}
          status="control"
          placeholder="Search"
          style={{ width: "100%" }}
        />
      </View>
      {loading && <Text>กำลังดาวน์โหลดข้อมูล</Text>}
      {!loading && error && <Text>{error}</Text>}
      {!loading && !error && bar && (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={ticketData ? TicketComponent : Header}
          data={search || bar.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { barDetail: item })}
              style={{ margin: 10, marginHorizontal: 15 }}
            >
              <Image
                style={{
                  aspectRatio: 2 / 3,
                  height: 240,
                  borderRadius: 6,
                }}
                source={{ url: item.bannerImage }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  width: 170,
                  marginTop: 10,
                  color: "white",
                }}
              >
                ร้าน {item.name.substring(0.16) + ".."}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 15, color: "#f1f1f1" }}>
                เหลือโต๊ะว่าง {item.tableCount - Math.floor(Math.random() * 6)} โต๊ะ
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      {!loading && !error && !bar && <Text>ไม่มีร้านแสดงในตอนนี้</Text>}
    </View>
  );
};

export default BarCards;
